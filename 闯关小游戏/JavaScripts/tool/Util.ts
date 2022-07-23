/*
 * @Author: your name
 * @Date: 2022-01-18 11:28:25
 * @LastEditTime: 2022-07-22 10:52:02
 * @LastEditors: Please set LastEditors
 * @Description: 通用方法及常量定义
 * @FilePath: \JavaScripts\Util.ts
 */

import { oTrace } from "odin";
import * as puerts from "puerts";
import * as UE from "ue";
import { LinkedList } from "./LinkedList";

export namespace gameTag {
    export const SCENE_TRIGGER = "SCENE_TRIGGER";
    export const MON = "MON";
}

export namespace obj {
    export const BOX_TRI = "113";

    export const MON_EFF = "14324";

    export const MON_DEAD_EFF = "13417";

    export const BULLET = "20968";

    export const BULLET_EFF = "13602";

    export const BUFF_EFF = "7747";

    export const PORTAL_EFF = "29497";

    export const FIRE_ANIM = "15226";

    export const GREEN_HEAD = "15319";

    export const BEAR_DOLL = "15323";

    export const ART_TEACHER = "15640";

    export const RED_CLOTH = "15614";

    export const TREASURE_BOX = "20910";

    export const TREASURE_EFF = "13710";
}

export namespace sound {
    export const SOUND_FIRE = "SOUND_FIRE";
    export const SOUND_FIREID = "20530";
}

export namespace c2cEvents {
    export const LOGIN = "Login";
    export const HP_CHANGE = "HpChange";
    export const WATER_IN = "WaterAreaIn";
    export const TIPS = "Tips";
    export const GET_WEAPON = "GetWeapon";
    export const MON_HP = "MonHp";
    export const GET_SKILL = "GetSkill";
    export const GET_JUMP = "GetJump";
    export const UNEQUIP_SKILL = "UnEquipSkill";
}

export namespace configId {
    export const MONSTER_ID = "10001";
    export const BLADE_ID = "10002";
    export const TRIGGER_ID = "10003";
}


export namespace util {

    export function setVisible(ui: MWGameUI.MWUIWidget, flag: boolean) {

        if (flag) {

            ui.SetVisibility(MWGameUI.ESlateVisibility.Visible);
        }
        else {

            ui.SetVisibility(MWGameUI.ESlateVisibility.Hidden);
        }

    }

    export function getTargetPos(uiPos: Type.Vector) {
        // let scenePos = util.getClickGameobjectByScene(uiPos.x, uiPos.y, 5000);
        // let toPos = scenePos;
        // if (scenePos == null || scenePos.Equality(Type.Vector.ZERO)) {
        //     toPos = this.uiPos2WorldPos(uiPos.x, uiPos.y, 5000);
        // }
        let toPos = this.uiPos2WorldPos(uiPos.x, uiPos.y, 5000);
        toPos.x = Math.round(toPos.x);
        toPos.y = Math.round(toPos.y);
        toPos.z = Math.round(toPos.z);
        return toPos;
    }

    export function getTargetId(uiPos: Type.Vector) {

        let hits = GamePlay.GetClickGameobjectByScene(uiPos.x, uiPos.y, 5000, true, false);
        let len = hits.length;
        //oTrace("获取gameobj len:", len);

        for (let index = 0; index < len; index++) {
            if (util.checkId(hits[index].GameObject)) {
                // if (hits[index].GameObject) {
                //     //Debugger.Log("选中", hits[index].GameObject.name, hits[index].GameObject.GetTag());
                // }
                //oTrace("监测到了！")
                return hits[index].GameObject.GetGuid();
            }
        }
    }

    export function getClickGameobjectByScene(SceneX: number, SceneY: number, Distance: number) {
        let hits = GamePlay.GetClickGameobjectByScene(SceneX, SceneY, Distance, false, false);
        let len = hits.length;

        // let forward = GamePlay.GetCurrentPlayer().Character.GetForwardVector();
        // let loc = GamePlay.GetCurrentPlayer().Character.location;
        // Debugger.Log("前方", forward.toString(), loc.toString());
        let player = GamePlay.GetCurrentPlayer();
        for (let index = 0; index < len; index++) {
            // if (hits[index].GameObject == null) {
            //     continue;
            // }
            // if (hits[index].GameObject == GamePlay.GetCurrentPlayer().Character) {
            //     continue;
            // }

            // Debugger.Log("打中", hits[index].GameObject.GetName());
            // if (hits[index].GameObject.GetTag() == gameTag.SCENE_TRIGGER) {
            //     continue;
            // }
            // Debugger.Log("打中", hits[index].GameObject.GetName());
            if (util.checkCanSetAttackTarget(player, hits[index].GameObject, hits[index].Location)) {
                if (hits[index].GameObject) {
                    //Debugger.Log("选中", hits[index].GameObject.name, hits[index].GameObject.GetTag());
                }

                return hits[index].Location;
            }
        }
        return null;
    }

    export function checkId(go: MWCore.GameObject) {
        if (GamePlay.IsCharacter(go))
            return false;
        //oTrace("Check id:", go.GetGuid());
        if (go.GetTag() == gameTag.MON) {
            return true;
        }
        return false;
    }

    export function checkCanSetAttackTarget(player: GamePlay.Player, go: MWCore.GameObject, goLoc: Type.Vector) {
        if (go == null) {
            return false;
        }
        if (player.Character == go) {
            return false;
        }
        if (GamePlay.IsBoxTrigger(go) || GamePlay.IsSphereTrigger(go))
            return false;
        if (!checkCanFightByTag(go)) {
            return false;
        }
        // let forward = player.Character.GetForwardVector();
        // let loc = player.Character.location;
        // let dir: Type.Vector;
        // if (goLoc != null) {
        //     dir = goLoc.Subtraction(loc).GetNormalized();
        // }
        // else {
        //     dir = go.location.Subtraction(loc).GetNormalized();;
        // }
        // if (VectorUtil.DotMul(forward, dir) < 0) {
        //     return false;
        // }

        return true;
    }

    export function checkCanFightByTag(go: MWCore.GameObject) {
        if (!go) {
            return false;
        }
        if (!GamePlay.IsCharacter(go)) {
            let goTag = go.GetTag();
            if (goTag != null) {
                if (goTag == gameTag.SCENE_TRIGGER) {
                    return false;
                }
            }
        }

        return true;
    }

    export function uiPos2WorldPos(SceneX: number, SceneY: number, Distance: number) {
        let WorldLocation = new UE.Vector(0);
        let WorldDirection = new UE.Vector(0);
        const WorldLocationRef = puerts.$ref(WorldLocation);
        const WorldDirectionRef = puerts.$ref(WorldDirection);

        let character: UE.MWSysPlayerCharacter = GamePlay.GetCurrentPlayer().Character.Actor as any as UE.MWSysPlayerCharacter;

        character.GetPlayerController().DeprojectScreenPositionToWorld(SceneX, SceneY, WorldLocationRef, WorldDirectionRef);
        WorldLocation = puerts.$unref(WorldLocationRef);
        WorldDirection = puerts.$unref(WorldDirectionRef);
        const EndLocation = new Type.Vector(WorldDirection.X * Distance + WorldLocation.X, WorldDirection.Y * Distance + WorldLocation.Y, WorldDirection.Z * Distance + WorldLocation.Z);
        return EndLocation;
    }


}

export namespace schedule {


    const updateList: LinkedList<updateCallback> = new LinkedList<updateCallback>();

    /** 
   * 供外部驱动
   * @param dt tick的时间，ms
   */
    export type updateCallback = (dt: number) => void;


    export function updateCall(callback: updateCallback, check?: boolean): void {
        if (check && updateList.Find(callback)) {
            return;
        }
        updateList.AddLast(callback);
    }

    export function cancleUpdateCall(callback: updateCallback): boolean {
        return updateList.Remove(callback);
    }

    export function tick(dt: number): void {
        tickUpdate(dt);
    }

    function tickUpdate(dt: number): void {
        let node = updateList.First;
        while (node) {
            try {
                node.Value(dt);
            } catch (error) {
                oTrace(error);
            }
            node = node.Next;
        }
    }

}

export namespace posUtil {
    export function getCanvasPointByWorld(v3: UE.Vector, valueV2: { value: UE.Vector2D }, out: Type.Vector2) {
        valueV2.value.X = valueV2.value.Y = 0;
        let pc = getPlayerController()
        pc.ProjectWorldLocationToScreen(v3, valueV2)
        let canvassize = new Type.Vector2(1920, 1080);
        let windSize = this.GetWindowSize();
        let scaleX = canvassize.x / windSize.X;
        let scaleY = canvassize.y / windSize.Y;
        valueV2.value.X *= scaleX
        valueV2.value.Y *= scaleY
        out.x = valueV2.value.X;
        out.y = valueV2.value.Y;
    }

    export function getPlayerController(): UE.MWSysPlayerController {
        let pc = null
        pc = (GamePlay.GetCurrentPlayer().Character.Actor as any).GetPlayerController()
        return pc
    }

    export function uiPos2WorldPos(SceneX: number, SceneY: number, Distance: number) {
        let WorldLocation = new UE.Vector(0);
        let WorldDirection = new UE.Vector(0);
        const WorldLocationRef = puerts.$ref(WorldLocation);
        const WorldDirectionRef = puerts.$ref(WorldDirection);

        let character: UE.MWSysPlayerCharacter = GamePlay.GetCurrentPlayer().Character.Actor as any as UE.MWSysPlayerCharacter;

        character.GetPlayerController().DeprojectScreenPositionToWorld(SceneX, SceneY, WorldLocationRef, WorldDirectionRef);
        WorldLocation = puerts.$unref(WorldLocationRef);
        WorldDirection = puerts.$unref(WorldDirectionRef);
        const EndLocation = new Type.Vector(WorldDirection.X * Distance + WorldLocation.X, WorldDirection.Y * Distance + WorldLocation.Y, WorldDirection.Z * Distance + WorldLocation.Z);
        return EndLocation;
    }

    export function getWindowSize() {
        const inst = puerts.argv.getByName("Proxy");
        let ret = UE.WidgetLayoutLibrary.GetViewportSize((inst as any).Game);
        return ret;
    }

    export function arr2Vec3(arr: number[]) {
        if (arr == null || arr.length != 3) {
            return null;
        }
        let vec = new Type.Vector(arr[0], arr[1], arr[2]);
        return vec;
    }

    export function distance(a: Type.Vector, b: Type.Vector) {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) + (a.z - b.z) * (a.z - b.z));
    }
}
