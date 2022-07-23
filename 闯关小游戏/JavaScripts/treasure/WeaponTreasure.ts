/*
 * @Author: your name
 * @Date: 2022-04-18 15:54:02
 * @LastEditTime: 2022-04-27 10:59:20
 * @LastEditors: Please set LastEditors
 * @Description: 武器宝箱
 * @FilePath: \JavaScripts\interface.ts
 */

import { EffectManager } from "odin";
import { DyObjUtil } from "../tool/DyObjUtil";
import { c2cEvents, gameTag, obj } from "../tool/Util";

export class WeaponTreasure {
    private _locaiton: Type.Vector;

    private _go: MWCore.GameObject;

    private _trigger: GamePlay.BoxTrigger;

    constructor(location: Type.Vector) {
        this._locaiton = location

        this.creatGo();
    }

    creatGo() {
        this._go = DyObjUtil.Ins.createGo(obj.TREASURE_BOX);
        this._go.location = this._locaiton;
        this._go.rotation = new Type.Rotation(0, 0, -90);

        EffectManager.instance.playEffectInGameObject(obj.TREASURE_EFF, this._go, 0, new Type.Vector(0, 0, 50));

        this._trigger = DyObjUtil.Ins.createGo(obj.BOX_TRI) as GamePlay.BoxTrigger;
        this._trigger.location = this._locaiton;
        this._trigger.scale = new Type.Vector(2, 2, 2);

        this._trigger.SetTag(gameTag.SCENE_TRIGGER);

        this._trigger.OnEnter.Add(this.onTriggerIn.bind(this));
    }

    getId() {
        return this._trigger.GetGuid();
    }

    protected onTriggerIn(go: MWCore.GameObject): void {
        let player = GamePlay.GetCurrentPlayer();
        if (go == player.Character) {
            Events.DispatchLocal(c2cEvents.GET_WEAPON);
        }
    }
}