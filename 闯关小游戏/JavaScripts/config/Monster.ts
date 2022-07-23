/*
 * @Author: your name
 * @Date: 2022-04-25 10:54:34
 * @LastEditTime: 2022-04-25 11:26:17
 * @LastEditors: Please set LastEditors
 * @Description: 怪物配置具体数据
 * @FilePath: \JavaScripts\config\Monster.ts
 */
import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA: Array<Array<any>> = [["ID", "ModleId", "Name", "Pos", "Scale"], ["", "", "", "", ""],
[10001, "7675", "激光发射器", [[-12000, -9345, 250], [-10000, -12285, 250], [-8000, -9345, 250], [-6000, -12285, 250]], [0.5, 0.5, 13]],
[10002, "1579", "铡刀", [[-7663, -5737, 664], [-8518, -5015, 180], [-9473, -4210, 380]], [12, 8, 5]],
[10003, "", "陷阱", [[-7528, 2058, 60], [-7028, 2358, 120], [-6528, 2658, 180], [-6028, 2958, 240], [-5528, 3258, 300]], [4, 26, 0.4]]];
export interface IMonsterElement extends IElementBase {
	/**ID*/
	ID: number
	/**模型Id*/
	ModleId: string
	/**怪物名字*/
	Name: string
	/**出生位置*/
	Pos: Array<Array<number>>
	/**比例*/
	Scale: Array<number>
}
export class MonsterConfig extends ConfigBase<IMonsterElement>{
	constructor() {
		super(EXCELDATA);
	}

}