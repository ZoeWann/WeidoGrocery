/*
 * @Author: your name
 * @Date: 2022-04-18 17:24:29
 * @LastEditTime: 2022-07-22 18:41:59
 * @LastEditors: Please set LastEditors
 * @Description: 水面触发器
 * @FilePath: \JavaScripts\trigger\WaterTrigger.ts
 */
import { ModuleManager } from "odin";
import { RoleModuleS } from "../role/RoleModule";
import { DyObjUtil } from "../tool/DyObjUtil";
import { gameTag, obj } from "../tool/Util";

export class WaterTrigger {
    private _locaiton: Type.Vector;

    private _trigger: GamePlay.BoxTrigger;

    constructor(location: Type.Vector) {
        this._locaiton = location

        this.creatGo();
    }

    creatGo() {
        this._trigger = DyObjUtil.Ins.createGo(obj.BOX_TRI) as GamePlay.BoxTrigger;
        this._trigger.location = this._locaiton;
        this._trigger.scale = new Type.Vector(115, 30, 1);

        this._trigger.SetTag(gameTag.SCENE_TRIGGER);

        this._trigger.OnEnter.Add(this.onTriggerIn.bind(this));
    }

    getId() {
        return this._trigger.GetGuid();
    }

    protected onTriggerIn(go: MWCore.GameObject): void {
        if (GamePlay.IsCharacter(go)) {
            let cha = go as GamePlay.Character;
            ModuleManager.instance.getModule(RoleModuleS).playerInWater(cha.Player);
        }
    }
}