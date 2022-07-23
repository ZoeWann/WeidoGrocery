/*
 * @Author: your name
 * @Date: 2022-04-18 15:54:02
 * @LastEditTime: 2022-04-26 16:58:54
 * @LastEditors: Please set LastEditors
 * @Description: 玩家模块基础数据
 * @FilePath: \JavaScripts\interface.ts
 */

import { DataInfo, ModuleData } from "odin";

export class RoleInfo extends DataInfo {
    hp: number;
    maxHp: number;
    attack: number;
    isDead: boolean;
    buff: boolean;
    indexPortal: number;
}

export class RoleDataHelper extends ModuleData<RoleInfo> {
    // 账号创建时会进入一次，之后不会再进入
    protected initDefaultData(): void {
        this.dataInfo.hp = 100;
        this.dataInfo.maxHp = 100;
        this.dataInfo.attack = 20;
        this.dataInfo.isDead = false;
        this.dataInfo.buff = false;
        this.dataInfo.indexPortal = 0;
    }

    constructor() {
        super(RoleInfo);
    }
}