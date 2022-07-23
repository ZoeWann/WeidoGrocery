import { ModuleManager, oTrace } from "odin";
import { GameConfig } from "../config/GameConfig";
import { BattleRole } from "../interface/BattleRole";
import { RoleModuleS } from "../role/RoleModule";
import { DyObjUtil } from "../tool/DyObjUtil";
import { configId, gameTag, obj, schedule } from "../tool/Util";
import { MonsterModuleS } from "./MonsterModule";

export class Blade implements BattleRole {
    id: string;

    location: Type.Vector;

    go: MWCore.GameObject;

    private _hp: string = "100";

    private _guid: string;

    private _trigger: GamePlay.BoxTrigger;

    private angel = 10;

    private originZ: number = 180;

    private toZ: number = 600;

    constructor(_guid: string, location: Type.Vector) {

        this._guid = _guid;

        this.location = location

        this.creatGo();

    }

    getId(): string {
        return this.id;
    }

    creatGo() {
        this._hp = "100";
        this.go = DyObjUtil.Ins.createGo(this._guid);


        ModuleManager.instance.getModule(MonsterModuleS).monsterReborn(this.id, this.go.GetGuid());


        this.id = this.go.GetGuid();
        oTrace("  创建铡刀！  ", this.id);
        this.go.location = this.location;
        this.go.SetTag(gameTag.MON);

        let ele = GameConfig.Monster.getElement(configId.BLADE_ID);
        this.go.scale = new Type.Vector(ele.Scale[0], ele.Scale[1], ele.Scale[2]);

        this.go.rotation = new Type.Rotation(new Type.Vector(0, 0, 50));

        this.id = this.go.GetGuid();

        this._trigger = DyObjUtil.Ins.createGo(obj.BOX_TRI) as GamePlay.BoxTrigger;
        this._trigger.AttachToGameObject(this.go)

        this._trigger.SetTag(gameTag.SCENE_TRIGGER);

        this._trigger.OnEnter.Add(this.OnTriggerIn.bind(this));

        this._trigger.OnLeave.Add(this.OnTriggerOut.bind(this));

        this._trigger.SetRelativeLocation(new Type.Vector(100, 5, 10));
        this._trigger.SetRelativeRotation(new Type.Rotation(new Type.Vector(0, 0, 0)))

        this._trigger.scale = new Type.Vector(24, 1.2, 1.2);

        //存疑,2S执行一次移动?
        setTimeout(() => {
            this.onUpdate();
        }, 2000);

    }

    private gameTag: number;

    /**
     * 镰刀移动
     */
    private updateCallback = () => {

        if (this.go.location.z >= this.toZ) {
            this.angel = -10;
        }
        else if (this.go.location.z <= this.originZ) {
            this.angel = 10;
        }

        let loc = this.go.location;
        loc.z = loc.z + this.angel;
        this.go.location = loc;
    }

    //不懂为什么要套一个函数
    onUpdate() {
        schedule.updateCall(this.updateCallback)
    }

    ReBorn() {
        this.creatGo();
    }

    destroy() {
        oTrace("取消！！！！", schedule.cancleUpdateCall(this.updateCallback));

        //为什么要设置一个微延迟
        setTimeout(() => {
            if (this._trigger)
                DyObjUtil.Ins.destoryGo(this._trigger);

            if (this.go)
                DyObjUtil.Ins.destoryGo(this.go);


            setTimeout(() => {
                this.ReBorn();
            }, 3000);

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

    /**
     * 第二关触发器 碰到了就死掉
     */
    protected OnTriggerIn(go: MWCore.GameObject): void {
        if (GamePlay.IsCharacter(go)) {
            let cha = (go as GamePlay.Character);

            let player = cha.Player;
            ModuleManager.instance.getModule(RoleModuleS).delHP(player, 100);
        }

    }

    protected OnTriggerOut(go: MWCore.GameObject): void {
        if (GamePlay.IsCharacter(go)) {

        }
    }
}