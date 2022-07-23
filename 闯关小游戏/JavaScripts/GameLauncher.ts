/*
 * @Author: your name
 * @Date: 2022-04-18 15:54:02
 * @LastEditTime: 2022-04-27 11:59:50
 * @LastEditors: Please set LastEditors
 * @Description: 程序入口类
 * @FilePath: \JavaScripts\interface.ts
 */

import { ModuleManager, OdinGame, oTrace, PreloadRes } from "odin";
import { BuffModuleC, BuffModuleS } from "./buff/BuffModule";
import { GameModuleC, GameModuleS } from "./game/GameModule";
import { MonsterModuleC, MonsterModuleS } from "./monster/MonsterModule";
import { PortalModuleC, PortalModuleS } from "./portal/PortalModule";
import { RoleDataHelper } from "./role/RoleDataHelper";
import { RoleModuleC, RoleModuleS } from "./role/RoleModule";
import { schedule, sound } from "./tool/Util";
import { TreasureModuleC, TreasureModuleS } from "./treasure/TreasureModule";
import { TriggerModuleC, TriggerModuleS } from "./trigger/TriggerModule";

@MWCore.MWClass
class GameLauncher extends OdinGame {
    @MWCore.MWProperty()
    preloadAssets: string = "";

    OnStart(): void {
        super.OnStart();
        this.bUseUpdate = true;
        oTrace("game launcher !!!!!");
    }

    OnUpdate(dt: number): void {
        super.OnUpdate(dt);
        schedule.tick(dt);
    }

    onRegisterModule(): void {
        ModuleManager.instance.register(MonsterModuleS, MonsterModuleC, null);
        ModuleManager.instance.register(BuffModuleS, BuffModuleC, null);
        ModuleManager.instance.register(RoleModuleS, RoleModuleC, RoleDataHelper);
        ModuleManager.instance.register(TriggerModuleS, TriggerModuleC, null);
        ModuleManager.instance.register(TreasureModuleS, TreasureModuleC, null);
        ModuleManager.instance.register(PortalModuleS, PortalModuleC, null);
        ModuleManager.instance.register(GameModuleS, GameModuleC, null);
        oTrace("onRegisterModule ")
    }

    onPreloadAssets(): void {
        //组织预加载声音数据
        let soundDataArr: Array<{
            resName: string;
            resId: string;
        }> = [];
        soundDataArr.push({ resName: sound.SOUND_FIRE, resId: sound.SOUND_FIREID });
        PreloadRes.addSound(soundDataArr);
    }

    //初始化游戏
    protected async initClient(): Promise<void> {
        await super.initClient();
        oTrace("initClient start")

        ModuleManager.instance.startAllModule();
        ModuleManager.instance.enterSceneAllModule(2);

        oTrace("initClient end")
    }
}

export default GameLauncher;
