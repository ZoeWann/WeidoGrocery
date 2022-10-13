import { oTrace } from "odin";

import { GameConfig } from "../../config/GameConfig";

type poolObj = { resid: string, obj: MWCore.GameObject };

@MWCore.MWClass

export default class PetAttrSync extends MWCore.MWScript {

​    @MWCore.MWProperty({ replicated: true, onChanged: "onPlayerIDChange" })

​    playerId: number = -1;

​    @MWCore.MWFunction(MWCore.MWServer)

​    changePlayerID(targetId: number) {

​        this.playerId = targetId;

​    }

​    private player: GamePlay.Player;

​    private findPlayerInterval: number;

​    async onPlayerIDChange() {

​        //刚开始登录时，异步加载玩家

​        if (this.playerId > 0 && !this.player) {

​            await this.getPlayerAnsy();

​        }

​        if (this.player) {

​            this.onPetChange();

​        }

​    }

​    async getPlayerAnsy() {

​        return new Promise<void>((resolve) => {

​            this.findPlayerInterval = setInterval(async () => {

​                this.player = GamePlay.getPlayer(this.playerId);

​                if (this.player) {

​                    clearInterval(this.findPlayerInterval);

​                    this.findPlayerInterval = null;

​                    resolve();

​                }

​            }, 200);

​        });

​    }

​    @MWCore.MWProperty({ replicated: true, onChanged: "onPetChange" })

​    PetID: number = -1;

​    @MWCore.MWFunction(MWCore.MWServer)

​    changePetID(pet: number) {

​        this.PetID = pet;

​    }

​    static pool: { [guid: string]: poolObj[] } = {};

​    static getPoolObj(guid: string): poolObj {

​        if (!PetAttrSync.pool[guid]) {

​            PetAttrSync.pool[guid] = [];

​        }

​        if (PetAttrSync.pool[guid].length > 0) {

​            return PetAttrSync.pool[guid].pop();

​        }

​        else {

​            let ret: poolObj = {

​                resid: guid,

​                obj: MWCore.GameObject.spawnGameObject(guid)

​            }

​            return ret;

​        }

​    }

​    //将宠物对象push进宠物对象池

​    static returnPet(p: poolObj) {

​        p.obj.location = Type.Vector.zero;

​        PetAttrSync.pool[p.resid].push(p);

​    }

​    initPet() {

​    }

​    private nowPet: poolObj = null;

​    private intervalId: number = null;

​    /**处于滚动状态 */

​    isRotate: boolean = false;

​    /**处于向上跳的状态 */

​    isJump: boolean = false;

​    /**移动速度，默认2 */

​    moveSpeed: number = 2;

​    /**向上跳的速度，默认10 */

​    jumpSpeed: number = 10;

​    /**向下落的速度，默认10 */

​    fallSpeed: number = 10;

​    /**旋转的速度，默认20 */

​    rotateSpeed: number = 20;

​    private _relaLoc = new Type.Vector(-99, 0, 0);

​    private _relaRot = new Type.Rotation(0, 0, -90);

​    initPetData() {

​        this.isRotate = false;

​        this.isJump = false;

​        this.moveSpeed = 2;

​        this.jumpSpeed = 10;

​        this.fallSpeed = 10;

​        this.rotateSpeed = 20;

​    }

​    async onPetChange() {

​        if (this.nowPet) {

​            this.nowPet.obj.detachFromGameObject();

​            PetAttrSync.returnPet(this.nowPet);     //把使用过后的宠物push进对象池方便以后使用

​            this.nowPet = null;

​            if (this.intervalId) {

​                clearInterval(this.intervalId);

​                this.intervalId = null;

​            }

​        }

​        if (this.PetID > 0 && this.player) {

​            oTrace(`==============change pet`);

​            let petData = GameConfig.Collection.getElement(this.PetID);

​            let guid = petData.Prefabguid;

​            if (!guid || guid == "") return;

​            this.initPetData();

​            this.nowPet = PetAttrSync.getPoolObj(guid);

​            this.bUseUpdate = true;     //MWCore属性 是否每帧刷新

​            // let obj = this.nowPet.obj;

​            // this.player.character.attachGameObjectToCharacter(obj, GamePlay.CharacterSocketType.Root);

​            // oTrace(`playerLocation:${this.player.location},chaLoc:${this.player.character.location}`);

​            // obj.setRelativeLocation(this._relaLoc);

​            //obj.setRelativeRotation(this._relaRot);

​            this.nowPet.obj.scale = Type.Vector.one.mul(0.4);

​            // obj.setRelativeLocation(Type.Vector.zero);

​            // obj.scale = Type.Vector.one.mul(3);

​            // let obj = this.nowPet.obj;

​            // let location = new Type.Vector(-50, 50, 120);

​            // let rotation = new Type.Rotation(0, 0, -90);

​            // this.nowPet = PetAttrSync.getPoolObj(guid);

​            // let obj = this.nowPet.obj;

​            // this.player.character.attachGameObjectToCharacter(obj, GamePlay.CharacterSocketType.Root);

​            // obj.setRelativeLocation(location);

​            // obj.setRelativeRotation(rotation);

​            // setTimeout(() => {

​            //  obj.scale = Type.Vector.one.mul(0.5);

​            // }, 10);

​        }

​    }

​    /**

​     * 玩家背后距离n的位置 这个函数主要是为了 有5个宠物 而设置的空位

​     * @param playerLocation 玩家位置

​     * @param n 距离      

​     * @returns 

​     */

​    // getPlayerBackLocation(playerLocation: Type.Vector, n: number): Type.Vector {

​    //  let playerBackLocation = playerLocation.addition(this.player.getTransform().getForwardVector().mul(-n));

​    //  // 加上x偏移量

​    //  let addX = playerBackLocation.addition(this.player.getTransform().getForwardVector().mul(0));

​    //  // 加上y偏移量

​    //  let addY = addX.addition(this.player.getTransform().getRightVector().mul(0))

​    //  return new Type.Vector(addY.x, addY.y, this.player.character.location.z + 10 ); // 宠物在地面上

​    // }

​    getPlayerBackLocation(playerLocation: Type.Vector, n: number): Type.Vector {

​        let playerBackLocation = Type.Vector.add(this.player.character.location, this.player.getTransform().getForwardVector().mul(-n), this._tmpVec);

​        return new Type.Vector(playerBackLocation.x, playerBackLocation.y, this.player.character.location.z + 10 ); // 宠物在地面上

​    }

​    private _timer: number = 0;

​    private _tmpVec: Type.Vector = new Type.Vector(0, 0, 0);

​    private _tmpRotat: Type.Rotation = new Type.Rotation(0, 0, -90);

​    protected onUpdate(dt: number): void {

​        // this._timer += dt;

​        // if (this._timer < 0.2)

​        //  return;

​        // this._timer = 0;    //200ms调用一次

​        if (this.nowPet == null) {

​            return;

​        }

​        let obj = this.nowPet.obj;

​        /**宠物的位置 */

​        let petLocation = obj.location;

​        /**玩家脚下的位置 */

​        // let playerLocation = new Type.Vector(this.player.character.location.x + this.locAddX, this.player.character.location.y + this.locAddY, this.player.character.location.z);

​        /**玩家背后的位置（z值是地面） */

​        let playerBackLocation = this.getPlayerBackLocation(this.player.character.location, 20);

​        /**宠物和玩家背后稍远一点的距离 */

​        let distance = Type.Vector.subtract(petLocation, playerBackLocation, this._tmpVec);

​        // 设定宠物面向方向跟随玩家面向方向使用的变量，比较简单不写注释了：

​        let petRotation = obj.rotation;

​        let playerRotation = this.player.rotation.addition(this._tmpRotat);

​        /**旋转目标x */

​        let rotateX = petRotation.x;

​        /**旋转目标z */

​        let rotateZ = playerRotation.z;

​        if (Type.Vector.subtract(petLocation, playerBackLocation, this._tmpVec).magnitude < 500) { // 如果宠物和玩家脚下距离足够小，让宠物往玩家背后稍远点移动

​            //if (playerBackLocation.add(petLocation).magnitude < 60) {

​            //petLocation = obj.location;

​            playerBackLocation = this.getPlayerBackLocation(this.player.character.location, 120);

​            //obj.setRelativeLocation(MathLibrary.lerp(petLocation, playerBackLocation, dt * this.moveSpeed));

​            obj.location = MathLibrary.lerp(petLocation, playerBackLocation, dt * this.moveSpeed)

​        }

​        else {

​            playerBackLocation = this.getPlayerBackLocation(this.player.character.location, 20);

​            if (distance.magnitude < 1000) {// 如果宠物在玩家背后

​                if (this.isJump) {// 如果宠物处于原地跳跃状态，向上移动

​                    this._tmpVec.x = petLocation.x;

​                    this._tmpVec.y = petLocation.y + 40;

​                    this._tmpVec.z = petLocation.z;

​                    //obj.location = MathLibrary.lerp(petLocation, new Type.Vector(petLocation.x, petLocation.y, playerBackLocation.z + 9), dt * this.fallSpeed)

​                    //obj.setRelativeLocation(MathLibrary.lerp(petLocation, this._tmpVec, dt * this.fallSpeed));

​                    //obj.setRelativeLocation(MathLibrary.lerp(petLocation, new Type.Vector(petLocation.x, petLocation.y, playerBackLocation.z + 40), dt * this.jumpSpeed));

​                    obj.location = MathLibrary.lerp(petLocation, new Type.Vector(petLocation.x, petLocation.y, playerBackLocation.z + 40), dt * this.jumpSpeed)

​                    if (petLocation.z >= playerBackLocation.z + 39) {// 宠物跳到了足够高的位置，让宠物落地

​                        this.isJump = false;

​                    }

​                }

​                else {// 如果宠物没在原地跳跃

​                    if (petLocation.z <= playerBackLocation.z + 10) {// 宠物落地，开始或重复跳跃

​                        this.isJump = true;

​                    }

​                    else {// 让宠物落地

​                        //obj.setRelativeLocation(MathLibrary.lerp(petLocation, new Type.Vector(petLocation.x, petLocation.y, playerBackLocation.z + 9), dt * this.fallSpeed));

​                        this._tmpVec.x = petLocation.x;

​                        this._tmpVec.y = petLocation.y + 9;

​                        this._tmpVec.z = petLocation.z;

​                        //obj.location = MathLibrary.lerp(petLocation, new Type.Vector(petLocation.x, petLocation.y, playerBackLocation.z + 9), dt * this.fallSpeed)

​                        //obj.setRelativeLocation(MathLibrary.lerp(petLocation, this._tmpVec, dt * this.fallSpeed));

​                        obj.location = MathLibrary.lerp(petLocation, this._tmpVec, dt * this.fallSpeed);

​                    }

​                }

​                rotateX = playerRotation.x;

​            }

​            else {// 宠物不在玩家背后，让宠物向玩家背后移动

​                // oTrace(`[zzzz]宠物和目标点距离：${distance.size}`);

​                if (this.isJump) {

​                    this.isJump = false;

​                }

​                //obj.setRelativeLocation(MathLibrary.lerp(petLocation, playerBackLocation, dt * this.moveSpeed));

​                obj.location = MathLibrary.lerp(petLocation, playerBackLocation, dt * this.moveSpeed)

​                // 宠物在移动，让它滚（为什么骂猫猫！？）（模仿LoL的小小英雄团子）（等等，那个滚来滚去的球叫啥来着）

​                rotateX += 30;

​                obj.rotation = MathLibrary.lerp(petRotation, new Type.Rotation(rotateX, playerRotation.y, rotateZ), dt * this.rotateSpeed);

​            }

​        }

​        // 旋转

​        //obj.setRelativeRotation(MathLibrary.lerp(petRotation, new Type.Rotation(rotateX, playerRotation.y, rotateZ), dt * this.rotateSpeed));

​        //obj.rotation = MathLibrary.lerp(petRotation, new Type.Rotation(rotateX, playerRotation.y, rotateZ), dt * this.rotateSpeed);

​    }

}