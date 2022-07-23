/*
* @Author: your name
* @Date: 2022-04-18 15:54:02
 * @LastEditTime: 2022-07-22 17:33:30
 * @LastEditors: Please set LastEditors
* @Description: 传送模块
* @FilePath: \JavaScripts\interface.ts
*/

import { ModuleC, ModuleS } from "odin";
import { Portal } from "./Portal";

export class PortalModuleC extends ModuleC<PortalModuleS, null> {
    onAwake(): void {

    }
}

export class PortalModuleS extends ModuleS<PortalModuleC, null> {
    onAwake(): void {
        new Portal(0, new Type.Vector(-3259, -10621, 200), new Type.Vector(-5610, -6213, 200));
        new Portal(1, new Type.Vector(-9888.36, -2557.49, 108.32), new Type.Vector(-9475.88, 1537.4, 160.53));
        new Portal(2, new Type.Vector(-4843.76, 3857.39, 312), new Type.Vector(-3840.2, 8479.89, 279.47));
    }
}