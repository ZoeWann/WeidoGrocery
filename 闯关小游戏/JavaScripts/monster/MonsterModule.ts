/*
 * @Author: your name
 * @Date: 2022-04-18 15:54:02
 * @LastEditTime: 2022-04-29 16:37:59
 * @LastEditors: Please set LastEditors
 * @Description: 怪物模块管理通信类
 * @FilePath: \JavaScripts\interface.ts
 */

import { ModuleC, ModuleS, oTrace } from "odin";
import { GameConfig } from "../config/GameConfig";
import { BattleRole } from "../interface/BattleRole";
import { DyObjUtil } from "../tool/DyObjUtil";
import { c2cEvents, configId, gameTag, obj } from "../tool/Util";
import { Blade } from "./Blade";
import { Monster } from "./Monster";

export class MonsterModuleC extends ModuleC<MonsterModuleS, null> {
    aimed(str: string) {
        this.server.net_ReqMonHp(str);
    }

    net_RspMonHp(hp: string) {
        Events.DispatchLocal(c2cEvents.MON_HP, hp);
    }

    net_RspMonTag(id: string) {
        MWCore.GameObject.AsyncFind(id).then((value: MWCore.GameObject) => {
            oTrace("找到了！！！！");
            let go: MWCore.GameObject = value;
            go.SetTag(gameTag.MON);
        })
    }

    net_RspBulletEff(loc: Type.Vector) {
        let eff = DyObjUtil.Ins.createGo(obj.BULLET_EFF) as GamePlay.EffectSystem;
        if (eff) {
            oTrace("创建子弹爆炸特效！");
            eff.scale = new Type.Vector(0.2, 0.2, 0.2);
            eff.location = loc;
            eff.SetLoop(false);
            eff.Play();
            setTimeout(() => {
                DyObjUtil.Ins.destoryGo(eff);
            }, 2000);

        }
    }

    net_SetBladeTag(id: string) {
        MWCore.GameObject.AsyncFind(id).then((value: MWCore.GameObject) => {
            oTrace("客户端设置blade Tag", id);
            value.SetTag(gameTag.MON);
        })
    }
}

export class MonsterModuleS extends ModuleS<MonsterModuleC, null> {
    private _monMap = new Map<string, BattleRole>();

    onAwake(): void {
        let ele = GameConfig.Monster.getElement(configId.MONSTER_ID);
        for (let index = 0; index < ele.Pos.length; index++) {
            let monster = new Monster(ele.ModleId, new Type.Vector(ele.Pos[index][0], ele.Pos[index][1], ele.Pos[index][2]));
            this._monMap.set(monster.getId(), monster);
        }

        ele = GameConfig.Monster.getElement(configId.BLADE_ID);
        for (let index = 0; index < ele.Pos.length; index++) {
            let blade = new Blade(ele.ModleId, new Type.Vector(ele.Pos[index][0], ele.Pos[index][1], ele.Pos[index][2]));
            this._monMap.set(blade.getId(), blade);
        }
    }

    delMonHp(str: string) {
        if (this._monMap.has(str)) {
            let mon = this._monMap.get(str);
            mon.delHP(100);
        }
    }

    monsterReborn(oldNum: string, newNum: string) {
        if (this._monMap.has(oldNum)) {
            oTrace("删掉旧的id：", oldNum);
            let mon = this._monMap.get(oldNum);
            this._monMap.set(newNum, mon);
            this._monMap.delete(oldNum);
        }
    }

    rspMonsterTag(player: GamePlay.Player) {
        let itr = this._monMap.values();
        for (let i = 0; i < this._monMap.size; i++) {
            let batRole = itr.next().value;

            this.callClientFun(player, this.client.net_RspMonTag(batRole.getId()));
        }
    }

    rspBulletEff(player: GamePlay.Player, loc: Type.Vector) {
        this.callClientFun(player, this.client.net_RspBulletEff(loc));
    }

    setBladeTag(player: GamePlay.Player, id: string) {
        this.callClientFun(player, this.client.net_SetBladeTag(id));
    }

    net_ReqMonHp(str: string, player?: GamePlay.Player) {
        if (this._monMap.has(str)) {
            let mon = this._monMap.get(str);
            let hp = mon.getHP();
            this.callClientFun(player, this.client.net_RspMonHp(hp));
        }
    }
}
