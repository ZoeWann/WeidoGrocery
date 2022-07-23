/*
 * @Author: your name
 * @Date: 2022-04-18 15:54:02
 * @LastEditTime: 2022-07-22 17:31:22
 * @LastEditors: Please set LastEditors
 * @Description: 子弹对象
 * @FilePath: \JavaScripts\interface.ts
 */

import { EffectManager, ModuleManager, oTrace } from "odin";
import { MonsterModuleS } from "../monster/MonsterModule";
import { DyObjUtil } from "../tool/DyObjUtil";
import { gameTag, obj } from "../tool/Util";


export class Bullet {


    private _go: MWCore.GameObject;

    private _trigger: GamePlay.BoxTrigger;

    private _oriLocaiton: Type.Vector;

    private _toLocation: Type.Vector;

    private _dir: Type.Vector;

    private _tag: number;

    private _flySpeed: number = 50;

    private _time: number;

    //初始化子弹类,要传入起始位置和终止位置参数
    constructor(oriLocaiton: Type.Vector, toLocation: Type.Vector) {
        oTrace("创建位置：", this._oriLocaiton);
        this._oriLocaiton = oriLocaiton;
        this._toLocation = toLocation;

        this.creatGo();
    }


    creatGo() {

        this._go = DyObjUtil.Ins.createGo(obj.BULLET);
        this._go.location = this._oriLocaiton;
        this._go.SetCollision(Type.PropertyStatus.Off);
        this._go.rotation = new Type.Rotation(new Type.Vector(90, 0, 90));

        this._trigger = DyObjUtil.Ins.createGo(obj.BOX_TRI) as GamePlay.BoxTrigger;
        this._trigger.AttachToGameObject(this._go)
        this._trigger.scale = new Type.Vector(0.4, 0.4, 0.4);
        this._trigger.SetRelativeLocation(Type.Vector.ZERO);
        this._trigger.SetTag(gameTag.SCENE_TRIGGER);

        if (this._trigger) {
            oTrace("触发器创建完毕！！");
        }


        this._trigger.OnEnter.Add(this.onTriggerIn.bind(this));


        this.startMove();

        // this.trigger.OnLeave.Add(this.OnTriggerOut.bind(this));

    }

    startMove() {

        this._dir = this._toLocation.Subtraction(this._oriLocaiton);
        oTrace("方向：", this._dir.toString());
        let x = this._dir.x;
        let y = this._dir.y;
        let z = this._dir.z;

        let max = Math.max(Math.abs(x), Math.abs(y), Math.abs(z));

        if (Math.abs(max) == Math.abs(x)) {
            this._time = Math.abs(x) / this._flySpeed;
            let moveY = y / this._time;
            let moveZ = z / this._time;
            if (x > 0) {
                this.move(this._flySpeed, moveY, moveZ);
            } else {
                this.move(-this._flySpeed, moveY, moveZ);
            }

        }
        else if (Math.abs(max) == Math.abs(y)) {
            this._time = Math.abs(y) / this._flySpeed;
            let movex = x / this._time;
            let moveZ = z / this._time;
            if (y > 0) {
                this.move(movex, this._flySpeed, moveZ);
            } else {
                this.move(movex, -this._flySpeed, moveZ);
            }


        }
        else if (Math.abs(max) == Math.abs(z)) {
            this._time = Math.abs(z) / this._flySpeed;
            let movex = x / this._time;
            let movey = y / this._time;
            if (z > 0) {
                this.move(movex, movey, this._flySpeed);
            } else {
                this.move(movex, movey, -this._flySpeed);
            }


        }
        else {
            oTrace("error @!!!!!!");
        }

    }


    move(x: number, y: number, z: number) {
        this._tag = setInterval(() => {
            let loc = this._go.location;
            loc.x = loc.x + x;
            loc.y = loc.y + y;
            loc.z = loc.z + z;
            this._go.location = loc;

            // if (this.Go.location == this.toLocation) {
            //     this.Destroy();
            // }

        }, 10);

    }


    destroy() {
        if (this._tag) {
            clearInterval(this._tag);
        }

        let eff = EffectManager.instance.playEffectInPos(obj.BULLET_EFF, this._go.location, 1);
        setTimeout(() => {
            EffectManager.instance.stopEffect(eff);
        }, 2000);

        if (this._trigger)
            DyObjUtil.Ins.destoryGo(this._trigger);

        if (this._go)
            DyObjUtil.Ins.destoryGo(this._go);

    }


    protected onTriggerIn(go: MWCore.GameObject): void {
        if (GamePlay.IsCharacter(go) || GamePlay.IsBoxTrigger(go) || GamePlay.IsSphereTrigger(go)) {
            return;
        }

        if (go) {
            oTrace("子弹接触对象：", go.GetName());
            if (go.GetTag() && go.GetTag() == gameTag.MON) {
                ModuleManager.instance.getModule(MonsterModuleS).delMonHp(go.GetGuid());
            }
            this.destroy();
        }
    }
}