/*
 * @Author: your name
 * @Date: 2022-04-18 15:54:02
 * @LastEditTime: 2022-04-27 12:01:47
 * @LastEditors: Please set LastEditors
 * @Description: 陷阱模块
 * @FilePath: \JavaScripts\interface.ts
 */

import { ModuleC, ModuleS } from "odin";
import { GameConfig } from "../config/GameConfig";
import { configId } from "../tool/Util";
import { TriggerEvents } from "./TriggerEvents";
import { WaterTrigger } from "./WaterTrigger";

export class TriggerModuleC extends ModuleC<TriggerModuleS, null> {
    onAwake(): void {

    }
}

export class TriggerModuleS extends ModuleS<TriggerModuleC, null> {
    onAwake(): void {
        new WaterTrigger(new Type.Vector(-8637, -10826, 10));

        let ele = GameConfig.Monster.getElement(configId.TRIGGER_ID);
        for (let index = 0; index < ele.Pos.length; index++) {
            let trigger = new TriggerEvents(new Type.Vector(ele.Pos[index][0], ele.Pos[index][1], ele.Pos[index][2]));
            trigger.SetID(index);
        }
    }
}
