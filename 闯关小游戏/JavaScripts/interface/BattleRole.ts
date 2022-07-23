/*
 * @Author: your name
 * @Date: 2022-04-18 15:54:02
 * @LastEditTime: 2022-04-22 10:52:09
 * @LastEditors: Please set LastEditors
 * @Description: 战斗对象接口约束
 * @FilePath: \JavaScripts\interface.ts
 */
export interface BattleRole {
    id: string;

    location: Type.Vector;

    go: MWCore.GameObject;

    getHP(): string;

    delHP(dur: number);

    getId(): string;
}