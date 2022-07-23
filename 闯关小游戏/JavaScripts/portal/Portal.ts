/*
 * @Author: your name
 * @Date: 2022-04-18 15:54:02
 * @LastEditTime: 2022-04-27 11:12:53
 * @LastEditors: Please set LastEditors
 * @Description: 传送门特效及触发器
 * @FilePath: \JavaScripts\interface.ts
 */

import { EffectManager, ModuleManager } from "odin";
import { RoleModuleS } from "../role/RoleModule";
import { DyObjUtil } from "../tool/DyObjUtil";
import { gameTag, obj } from "../tool/Util";

export class Portal {
    private _locaiton: Type.Vector;

    private _targetLoc: Type.Vector;

    private _trigger: GamePlay.BoxTrigger;

    private _portalIndex = 0;

    constructor(index: number, location: Type.Vector, targetLoc: Type.Vector) {
        this._portalIndex = index;

        this._locaiton = location

        this._targetLoc = targetLoc;

        this.creatGo();
    }

    creatGo() {
        this._trigger = DyObjUtil.Ins.createGo(obj.BOX_TRI) as GamePlay.BoxTrigger;
        this._trigger.location = this._locaiton;
        this._trigger.scale = new Type.Vector(2, 2, 2);

        EffectManager.instance.playEffectInGameObject(obj.PORTAL_EFF, this._trigger, 0, new Type.Vector(0, 0, -40));

        this._trigger.SetTag(gameTag.SCENE_TRIGGER);

        this._trigger.OnEnter.Add(this.onTriggerIn.bind(this));
    }

    getId() {
        return this._trigger.GetGuid();
    }

    getGo() {
        return this._trigger;
    }

    protected onTriggerIn(go: MWCore.GameObject): void {

        if (GamePlay.IsCharacter(go)) {
            let cha = go as GamePlay.Character;

            let transform = cha.GetTransform();
            transform.SetLocation(this._targetLoc);
            ModuleManager.instance.getModule(RoleModuleS).changePortal(cha.Player, this._portalIndex + 1);
            cha.SetTransform(transform);
        }
    }
}