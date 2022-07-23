import { EffectManager, ModuleManager, oTrace } from "odin";
import { GameConfig } from "../config/GameConfig";
import { BattleRole } from "../interface/BattleRole";
import { RoleModuleS } from "../role/RoleModule";
import { DyObjUtil } from "../tool/DyObjUtil";
import { configId, gameTag, obj, schedule } from "../tool/Util";
import { MonsterModuleS } from "./MonsterModule";

export class Monster implements BattleRole {
    id: string;

    location: Type.Vector;

    go: MWCore.GameObject;

    private _hp: string = "100";

    private _guid: string;

    private _trigger: GamePlay.BoxTrigger;

    private _angel = 20;

    private _originX: number;

    private _toX: number;

    private _effId: number;

    constructor(guid: string, location: Type.Vector) {

        this._guid = guid;

        this.location = location
        oTrace("  创建怪物！！");
        this._originX = location.x;
        this._toX = this._originX + 2000;

        this.creatMonster();
    }

    getId(): string {
        return this.id;
    }


    creatMonster() {
        this._hp = "100";
        this.go = DyObjUtil.Ins.createGo(this._guid);

        ModuleManager.instance.getModule(MonsterModuleS).monsterReborn(this.id, this.go.GetGuid());

        this.id = this.go.GetGuid();
        this.go.location = this.location;
        this.go.SetTag(gameTag.MON);

        this._trigger = DyObjUtil.Ins.createGo(obj.BOX_TRI) as GamePlay.BoxTrigger;
        this._trigger.AttachToGameObject(this.go);

        this._trigger.SetTag(gameTag.SCENE_TRIGGER);

        let di2go = DyObjUtil.Ins.createGo(this._guid);
        di2go.AttachToGameObject(this.go)

        this._trigger.OnEnter.Add(this.OnTriggerIn.bind(this));

        this._trigger.OnLeave.Add(this.OnTriggerOut.bind(this));

        let ele = GameConfig.Monster.getElement(configId.MONSTER_ID);
        this._trigger.scale = new Type.Vector(ele.Scale[0], ele.Scale[1], ele.Scale[2]);

        if (this.location.y == -9345) {
            this.go.rotation = new Type.Rotation(new Type.Vector(-90, 0, 0));
            this._trigger.SetRelativeLocation(new Type.Vector(0, 0, 1000));

            this._effId = EffectManager.instance.playEffectInGameObject(obj.MON_EFF, this.go, 0, Type.Vector.ZERO, new Type.Vector(0, 180, 0));
        }
        else {
            this.go.rotation = new Type.Rotation(new Type.Vector(90, 0, 0));
            this._trigger.SetRelativeLocation(new Type.Vector(0, 0, 1000));
            this._effId = EffectManager.instance.playEffectInGameObject(obj.MON_EFF, this.go, 0, Type.Vector.ZERO, new Type.Vector(0, -180, 0));
        }

        setTimeout(() => {
            this.onUpdate();
        }, 2000);
    }

    private updateCallback = () => {
        if (this.go.location.x >= this._toX) {
            this._angel = -5;
        }
        else if (this.go.location.x <= this._originX) {
            this._angel = 5;
        }

        let loc = this.go.location;
        loc.x = loc.x + this._angel;
        this.go.location = loc;
    }

    onUpdate() {
        schedule.updateCall(this.updateCallback)
    }

    reBorn() {
        this.creatMonster();
    }

    destroy() {
        oTrace("取消！！！！", schedule.cancleUpdateCall(this.updateCallback));

        EffectManager.instance.stopEffect(this._effId);

        let eff = EffectManager.instance.playEffectInPos(obj.MON_DEAD_EFF, this.go.location, 1, new Type.Vector(0, 180, 0));
        if (eff) {
            setTimeout(() => {
                EffectManager.instance.stopEffect(eff);
            }, 2000);

        }

        setTimeout(() => {
            if (this._trigger) {
                DyObjUtil.Ins.destoryGo(this._trigger);
            }

            if (this.go) {
                DyObjUtil.Ins.destoryGo(this.go);
            }

            setTimeout(() => {
                this.reBorn();
            }, 5000);
        }, 50);
    }

    getHP(): string {
        return this._hp;
    }

    delHP(dur: number) {
        let hp = (+this.getHP() - dur);

        if (hp <= 0) {
            this._hp = "0";
            this.destroy();
        } else {
            this._hp = hp.toString();
        }
    }

    private timeMap = new Map<number, number>()

    protected OnTriggerIn(go: MWCore.GameObject): void {

        if (GamePlay.IsCharacter(go)) {
            let cha = (go as GamePlay.Character);

            let player = cha.Player;

            ModuleManager.instance.getModule(RoleModuleS).delHP(player, 20);

            let num = setInterval(() => {
                if (this._trigger.InArea(player.Character)) {

                    ModuleManager.instance.getModule(RoleModuleS).delHP(player, 20);
                }
            }, 1000);
            this.timeMap.set(player.GetPlayerID(), num);
        }
    }

    protected OnTriggerOut(go: MWCore.GameObject): void {
        if (GamePlay.IsCharacter(go)) {

            let cha = (go as GamePlay.Character);

            let player = cha.Player;
            let id = player.GetPlayerID();
            if (this.timeMap.has(id)) {

                let num = this.timeMap.get(id);

                clearInterval(num);

                this.timeMap.delete(id);

            }
        }
    }
}