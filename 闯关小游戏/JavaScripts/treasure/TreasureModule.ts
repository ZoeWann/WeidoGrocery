/*
* @Author: your name
* @Date: 2022-04-18 15:54:02
 * @LastEditTime: 2022-04-27 10:35:26
 * @LastEditors: Please set LastEditors
* @Description: 宝物模块
* @FilePath: \JavaScripts\interface.ts
*/

import { ModuleC, ModuleS } from "odin";
import { SkillTreasure } from "./SkillTreasure";
import { WeaponTreasure } from "./WeaponTreasure";

export class TreasureModuleC extends ModuleC<TreasureModuleS, null> {
    onAwake(): void {
        new WeaponTreasure(new Type.Vector(-13207, -10890, 169));
        new SkillTreasure(new Type.Vector(-4517, -5383, 2));
    }
}

export class TreasureModuleS extends ModuleS<TreasureModuleC, null> {
    onAwake(): void {

    }
}
