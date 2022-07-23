/*
 * @Author: your name
 * @Date: 2022-04-13 16:38:26
 * @LastEditTime: 2022-04-25 16:43:13
 * @LastEditors: Please set LastEditors
 * @Description: buff管理通信类
 * @FilePath: \JavaScripts\buff\BuffModule.ts
 */
import { ModuleC, ModuleManager } from "odin";
import { GameModuleS } from "../game/GameModule";
import { RoleModuleS } from "../role/RoleModule";

export class BuffModuleC extends ModuleC<BuffModuleS, null> {
    addBuff() {
        this.server.net_ReqAddBuff();
    }
}

export class BuffModuleS extends ModuleC<BuffModuleC, null> {
    net_ReqAddBuff(player?: GamePlay.Player) {
        ModuleManager.instance.getModule(RoleModuleS).addBuff(player);


        ModuleManager.instance.getModule(GameModuleS).addBuffEff(player);

        setTimeout(() => {
            ModuleManager.instance.getModule(RoleModuleS).delBuff(player);

            ModuleManager.instance.getModule(GameModuleS).delBuffEff(player);

        }, 3000);
    }
}
