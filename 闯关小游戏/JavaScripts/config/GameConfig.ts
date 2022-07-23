/*
 * @Author: your name
 * @Date: 2022-04-25 11:09:54
 * @LastEditTime: 2022-04-25 11:11:00
 * @LastEditors: your name
 * @Description: 配置表管理工具
 * @FilePath: \JavaScripts\config\GameConfig.ts
 */
import { ConfigBase, IElementBase } from "./ConfigBase";
import { MonsterConfig } from "./Monster";

export class GameConfig {
	private static configMap: Map<string, ConfigBase<IElementBase>> = new Map();
	/**
	* 多语言设置
	* @param languageIndex 语言索引(-1为系统默认语言)
	* @param getLanguageFun 根据key获取语言内容的方法
	*/
	public static initLanguage(languageIndex: number, getLanguageFun: (key: string | number) => string) {
		ConfigBase.initLanguage(languageIndex, getLanguageFun)
	}
	private static getConfig<T extends ConfigBase<IElementBase>>(ConfigClass: { new(): T }): T {
		if (!this.configMap.has(ConfigClass.name)) {
			this.configMap.set(ConfigClass.name, new ConfigClass());
		}
		return this.configMap.get(ConfigClass.name) as T;
	}
	public static get Monster(): MonsterConfig { return this.getConfig(MonsterConfig) };
}