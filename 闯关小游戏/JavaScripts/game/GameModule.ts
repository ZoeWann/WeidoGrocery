/*
 * @Author: your name
 * @Date: 2022-04-18 15:54:02
 * @LastEditTime: 2022-07-22 17:32:11
 * @LastEditors: Please set LastEditors
 * @Description: 游戏模块基础数据，登录玩家也在此管理
 * @FilePath: \JavaScripts\interface.ts
 */

import { DataCenterS, EffectManager, ModuleC, ModuleManager, ModuleS, oTrace, UI } from "odin";
import { MonsterModuleS } from "../monster/MonsterModule";
import { RoleDataHelper, RoleInfo } from "../role/RoleDataHelper";
import { RoleModuleC } from "../role/RoleModule";
import { c2cEvents, obj } from "../tool/Util";
import InitUI from "../ui/InitUI";

export class GameModuleC extends ModuleC<GameModuleS, null>{
    private _player: GamePlay.Player;

    async onStart() {
        UI.instance.openPanel(InitUI);
        GamePlay.AsyncGetCurrentPlayer().then((player) => {
            this._player = player;
            // 关闭角色的名称
            this._player.Character.CharacterName = "";
        })

        let res = await this.server.net_Login();
        oTrace("登录返回C端 ", res);
    }

    /**进入场景后执行 */
    onEnterScene(sceneType: number): void {
        Events.DispatchLocal(c2cEvents.LOGIN, ModuleManager.instance.getModule(RoleModuleC).getData());
    }

    //设置布娃娃状态
    net_RagDollTrue() {
        let player = GamePlay.GetCurrentPlayer();
        player.Character.Ragdoll(true);
    }

    /**
     * 重生时调用，此时若身处陷阱中，使陷阱的设置失效
     */
    net_RagDollFalse(playerData?: RoleInfo) {
        let player = GamePlay.GetCurrentPlayer();
        player.Character.Ragdoll(false);
        ModuleManager.instance.getModule(RoleModuleC).bInWater = false;

        if (playerData)
            Events.DispatchLocal(c2cEvents.HP_CHANGE, playerData);
    }
}

export class GameModuleS extends ModuleS<GameModuleC, null>{
    private _arrPlayers: Array<GamePlay.Player> = new Array<GamePlay.Player>();
    private _effMap = new Map<number, number>();

    onStart(): void {
        DataCenterS.instance.onPlayerJoined.add(this.onPlayerJoinGame, this);
        DataCenterS.instance.onPlayerLeft.add(this.onPlayerLeftGame, this);
    }

    //把玩家从玩家数组中删掉
    private onPlayerLeftGame(player: GamePlay.Player): void {
        //当为true时,返回index的第一个元素，否则返回-1
        let index = this._arrPlayers.findIndex(p => p.GetPlayerID() === player.GetPlayerID());
        if (index >= 0) {
            oTrace("left game index ", index)
            this._arrPlayers.splice(index, 1);
        }
    }

    //将玩家push进玩家数组
    private onPlayerJoinGame(player: GamePlay.Player): void {
        this._arrPlayers.push(player);
    }

    net_Login(player?: GamePlay.Player) {
        oTrace("net_Login this.playerDataMap size ", this._arrPlayers.length);
        ModuleManager.instance.getModule(MonsterModuleS).rspMonsterTag(player);
        return player;
    }

    /**
     * 设置数据，这里只有判断是否死亡，死亡后重生
     */
    setData(player: GamePlay.Player, data: RoleInfo) {
        if (data.hp <= 0) {
            data.isDead = true;
            this.ragDollTrue(player);

            setTimeout(() => {
                this.reBorn(player);
            }, 3000);
        }
    }

    /**
     *  重生 回到对应关卡的重生点
     */
    reBorn(player: GamePlay.Player) {
        let pdata = DataCenterS.instance.getPlayerData(player).getModuleData(RoleDataHelper);
        switch (pdata.dataInfo.indexPortal) {
            case 0:
                player.Character.location = new Type.Vector(-13006.133, -10572.19, 268.807);
                break;
            case 1:
                player.Character.location = new Type.Vector(-5610, -6213, 120.32);
                break
            case 2:
                player.Character.location = new Type.Vector(-9475.878, 1537.402, 160.531);
                break;
            default:
                break;
        }
        pdata.dataInfo.hp = pdata.dataInfo.maxHp;
        pdata.dataInfo.isDead = false;
        pdata.saveData(true);
        this.ragDollFalse(player, pdata.dataInfo); //重生，要回传给客户端
    }

    getPlayers() {
        return this._arrPlayers;
    }

    ragDollTrue(player: GamePlay.Player) {
        this.callClientFun(player, this.client.net_RagDollTrue());
    }

    ragDollFalse(player: GamePlay.Player, pdata?: RoleInfo) {
        this.callClientFun(player, this.client.net_RagDollFalse(pdata));
    }

    //关卡3的buff光环特效
    addBuffEff(player: GamePlay.Player) {
        let effId = EffectManager.instance.playEffectInGameObject(obj.BUFF_EFF, player.Character, 0, new Type.Vector(0, 0, -100));
        this._effMap.set(player.GetPlayerID(), effId);
    }

    delBuffEff(player: GamePlay.Player) {
        let pid = player.GetPlayerID();
        if (this._effMap.has(pid)) {
            EffectManager.instance.stopEffect(this._effMap.get(pid));
            this._effMap.delete(pid);
        }
    }
}
