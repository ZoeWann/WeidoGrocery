/*
 * @Author: your name
 * @Date: 2022-04-18 17:24:29
 * @LastEditTime: 2022-04-25 11:30:39
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\monster\TriggerEvents.ts
 */
import { ModuleManager, oTrace } from "odin";
import { GameConfig } from "../config/GameConfig";
import { GameModuleS } from "../game/GameModule";
import { RoleModuleS } from "../role/RoleModule";
import { DyObjUtil } from "../tool/DyObjUtil";
import { configId, obj } from "../tool/Util";

export class TriggerEvents {

    private id: number;

    private Trigger: GamePlay.BoxTrigger;

    constructor(loc: Type.Vector) {
        this.Trigger = DyObjUtil.Ins.createGo(obj.BOX_TRI) as GamePlay.BoxTrigger;
        this.Trigger.location = loc;

        let ele = GameConfig.Monster.getElement(configId.TRIGGER_ID);
        this.Trigger.scale = new Type.Vector(ele.Scale[0], ele.Scale[1], ele.Scale[2]);
        this.Trigger.rotation = new Type.Rotation(new Type.Vector(0, 0, 30));
        this.Trigger.OnEnter.Add(this.OnTriggerIn.bind(this));

    }

    protected OnTriggerIn(go: MWCore.GameObject): void {
        if (!GamePlay.IsCharacter(go))
            return;

        let cha = go as GamePlay.Character;
        let player = cha.Player;

        if (this.id == 1 || this.id == 3 || this.id == 5) {
            if (!this.x) {

                this.x = 0;
                ModuleManager.instance.getModule(GameModuleS).ragDollTrue(player);

                ModuleManager.instance.getModule(RoleModuleS).gasTrapIn(player);
                //oTrace("进入奇数区域！");
                oTrace("时间的：", this.x)
                this.SetPoisonDamage(player);

                setTimeout(() => {
                    ModuleManager.instance.getModule(GameModuleS).ragDollFalse(player);
                }, 3000);
            }
        }
        else if (this.id == 2) {
            ModuleManager.instance.getModule(RoleModuleS).jumpAreaIn(player);
        }
    }

    GetID(): number {
        return this.id;
    }

    SetID(num: number) {
        this.id = num;
    }

    private x: number;

    private SetPoisonDamage(player: GamePlay.Player) {
        if (this.x != null) {
            if (this.x < 3) {
                this.x += 1;
                ModuleManager.instance.getModule(RoleModuleS).delHP(player, 10);
                setTimeout(() => {
                    this.SetPoisonDamage(player);
                }, 1000);
            } else {
                setTimeout(() => {
                    this.x = null;
                }, 200);
            }
        }
        else {
            return;
        }
    }
}

