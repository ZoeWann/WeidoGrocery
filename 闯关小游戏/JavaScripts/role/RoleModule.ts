/*
 * @Author: Zoe Wang
 * @Date: 2022-04-18 15:54:02
 * @LastEditTime: 2022-07-22 15:41:18
 * @LastEditors: Please set LastEditors
 * @Description: 玩家模块管理通信类
 * @FilePath: \JavaScripts\interface.ts
 */

import { ModuleC, ModuleManager, ModuleS, oTrace, SoundManager } from "odin";
import { Bullet } from "../bullet/Bullet";
import { GameModuleS } from "../game/GameModule";
import { c2cEvents, obj, sound, util } from "../tool/Util";
import { RoleDataHelper } from "./RoleDataHelper";

//客户端逻辑
export class RoleModuleC extends ModuleC<RoleModuleS, RoleDataHelper> {
    bInWater: boolean = false;

    onAwake(): void {

    }
    //-----------------------通用功能-----------------------
    loginSuccess() {
        oTrace(GamePlay.GetCurrentPlayer().Character.CharacterName + "ReqCanMove!");

        GamePlay.GetCurrentPlayer().Character.CanMove = true;
    }

    getData(): RoleDataHelper {
        return this.data;
    }

    net_HpChange(/*playerData: RoleInfo*/) {
        Events.DispatchLocal(c2cEvents.HP_CHANGE/*, playerData*/);
    }

    //-----------------------关卡1-----------------------
    //攻击，发射飞镖
    fire(pos: Type.Vector) {
        let uipos = util.getTargetPos(pos); //是将uiPos转换为世界坐标
        oTrace("目标位置！", uipos.toString());
        GamePlay.GetCurrentPlayer().Character.PlayAnimation(obj.FIRE_ANIM);
        SoundManager.instance.playSound(sound.SOUND_FIREID, 1);
        this.server.net_FireABullet(uipos);
        // setTimeout(() => {

        //     SoundManager.instance.playSound(sound.SOUND_FIRE, 1);

        //     this.server.net_FireABullet(uipos);
        // }, 200);
    }

    //-----------------------关卡3-----------------------
    //上楼梯的中毒
    net_GasTrapIn() {
        let player = GamePlay.GetCurrentPlayer();
        player.Character.SetCloth(GamePlay.BodyPartType.E_Body, obj.BEAR_DOLL);

        Events.DispatchLocal(c2cEvents.TIPS, "中毒！陷入沉睡3S！");
    }

    //跳跃增强
    net_JumpAreaIn() {
        let player = GamePlay.GetCurrentPlayer();
        player.Character.SetCloth(GamePlay.BodyPartType.E_Body, obj.ART_TEACHER);
        player.Character.MaxJumpHeight = 1000;
        Events.DispatchLocal(c2cEvents.GET_JUMP);
    }
}
//服务端运行的代码会同步给所有客户端
export class RoleModuleS extends ModuleS<RoleModuleC, RoleDataHelper> {

    //-----------------------通用功能-----------------------
    //改变传送点
    changePortal(player: GamePlay.Player, portal: number) {
        let playerData = this.getPlayerData(player);
        playerData.dataInfo.indexPortal = portal;
        playerData.saveData(true);
    }

    //掉血
    delHP(player: GamePlay.Player, dur: number) {
        let playerData = this.getPlayerData(player);

        //无敌buff
        if (playerData.dataInfo.buff) return;

        let hp = playerData.dataInfo.hp - dur;
        if (!playerData.dataInfo.isDead) {
            playerData.dataInfo.hp = hp;
            playerData.saveData(true); //在服务端保存数据

            /**
             * 这个setData里面 是设置了hp判断，小于0就设置为死亡，然后重生
             */
            ModuleManager.instance.getModule(GameModuleS).setData(player, playerData.dataInfo);

            //调用对应客户端的血条控制
            // 存储自动同步案例
            this.callClientFun(player, this.client.net_HpChange(/*playerData.dataInfo*/));
        }
    }
    //-----------------------关卡1-----------------------
    //落水死亡
    playerInWater(player?: GamePlay.Player) {
        this.delHP(player, 100);
    }

    //从玩家坐标指向ui点击的坐标，发射飞镖
    net_FireABullet(pos: Type.Vector, player?: GamePlay.Player) {
        let oriLoc = player.Character.location;
        let dir = player.Character.GetForwardVector().Multiply(100)
        dir.z = 40

        oriLoc = oriLoc.Addition(dir);

        new Bullet(oriLoc, pos);
    }

    //-----------------------关卡2-----------------------
    //添加无敌buff
    addBuff(player: GamePlay.Player) {
        let playerData = this.getPlayerData(player);
        playerData.dataInfo.buff = true;
    }
    //删除无敌buff
    delBuff(player: GamePlay.Player) {
        let playerData = this.getPlayerData(player);
        playerData.dataInfo.buff = false;
    }

    //-----------------------关卡3-----------------------
    //中毒
    gasTrapIn(player: GamePlay.Player) {
        this.callClientFun(player, this.client.net_GasTrapIn());
    }
    //跳跃增强
    jumpAreaIn(player: GamePlay.Player) {
        this.callClientFun(player, this.client.net_JumpAreaIn());
    }


}
