(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('MWCore'), require('GamePlay'), require('Events'), require('DataStorage'), require('Type'), require('Global'), require('MWGameUI'), require('ue'), require('MWMGS'), require('MathLibrary'), require('puerts')) :
    typeof define === 'function' && define.amd ? define(['exports', 'MWCore', 'GamePlay', 'Events', 'DataStorage', 'Type', 'Global', 'MWGameUI', 'ue', 'MWMGS', 'MathLibrary', 'puerts'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["mw-game"] = {}, global.MWCore, global.GamePlay, global.Events, global.require$$3, global.Type, global.require$$5, global.MWGameUI, global.UE, global.require$$8, global.require$$9, global.puerts));
})(this, (function (exports, MWCore, GamePlay, Events, require$$3, Type, require$$5, MWGameUI, UE, require$$8, require$$9, puerts) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var MWCore__default = /*#__PURE__*/_interopDefaultLegacy(MWCore);
    var GamePlay__default = /*#__PURE__*/_interopDefaultLegacy(GamePlay);
    var Events__default = /*#__PURE__*/_interopDefaultLegacy(Events);
    var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);
    var Type__default = /*#__PURE__*/_interopDefaultLegacy(Type);
    var require$$5__default = /*#__PURE__*/_interopDefaultLegacy(require$$5);
    var MWGameUI__default = /*#__PURE__*/_interopDefaultLegacy(MWGameUI);
    var UE__default = /*#__PURE__*/_interopDefaultLegacy(UE);
    var UE__namespace = /*#__PURE__*/_interopNamespace(UE);
    var require$$8__default = /*#__PURE__*/_interopDefaultLegacy(require$$8);
    var require$$9__default = /*#__PURE__*/_interopDefaultLegacy(require$$9);
    var puerts__namespace = /*#__PURE__*/_interopNamespace(puerts);

    var dist = {};

    (function (exports) {

    Object.defineProperty(exports, '__esModule', { value: true });

    var MWCore = MWCore__default["default"];
    var GamePlay = GamePlay__default["default"];
    var Events = Events__default["default"];
    var DataStorage = require$$3__default["default"];
    var Type = Type__default["default"];
    var Global = require$$5__default["default"];
    var MWGameUI = MWGameUI__default["default"];
    var UE = UE__default["default"];
    var MWMGS = require$$8__default["default"];
    var MathLibrary = require$$9__default["default"];

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var MWCore__default$1 = /*#__PURE__*/_interopDefaultLegacy(MWCore);
    var GamePlay__default$1 = /*#__PURE__*/_interopDefaultLegacy(GamePlay);
    var Events__default$1 = /*#__PURE__*/_interopDefaultLegacy(Events);
    var DataStorage__default = /*#__PURE__*/_interopDefaultLegacy(DataStorage);
    var Type__default$1 = /*#__PURE__*/_interopDefaultLegacy(Type);
    var Global__default = /*#__PURE__*/_interopDefaultLegacy(Global);
    var MWGameUI__default$1 = /*#__PURE__*/_interopDefaultLegacy(MWGameUI);
    var UE__namespace = /*#__PURE__*/_interopNamespace(UE);
    var MWMGS__default = /*#__PURE__*/_interopDefaultLegacy(MWMGS);
    var MathLibrary__default = /*#__PURE__*/_interopDefaultLegacy(MathLibrary);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    //一个玩家的数据
    class PlayerData {
        playerId;
        dataMap; //数据源
        moduleDataMap = new Map();
        constructor(playerId, dataMap) {
            this.playerId = playerId;
            this.dataMap = dataMap;
        }
        //获取一个模块数据
        getModuleData(ModuleDataClass) {
            if (ModuleDataClass == null)
                return null;
            let moudleDataName = ModuleDataClass.name;
            if (!this.moduleDataMap.has(moudleDataName)) {
                let moudleData = new ModuleDataClass();
                moudleData["init"](this.playerId, this.dataMap);
                this.moduleDataMap.set(moudleDataName, moudleData);
            }
            return this.moduleDataMap.get(moudleDataName);
        }
        get dataInfoMap() {
            return this.dataMap;
        }
        //销毁
        destroy() {
            this.moduleDataMap.forEach((moudleData) => {
                moudleData["destroy"]();
            });
            this.moduleDataMap.clear();
        }
    }

    //自己角色的数据(客户端专用)
    class DataCenterC {
        static _instance = new DataCenterC();
        constructor() { }
        static get instance() {
            return this._instance;
        }
        destroy() {
            DataCenterC._instance = null;
        }
        INIT_PLAYER_DATA_ASK = "InitPlayerData_Ask"; //初始化玩家数据请求
        INIT_PLAYER_DATA_REPLY = "InitPlayerData_Reply"; //初始化玩家数据回应
        PLAYER_DATA_CHANGE_NOTIFY = "PlayerDataChange_Notify"; //玩家数据变化通知
        playerData;
        /**
         * 初始化，获取当前玩家的所有模块数据
         */
        init() {
            //请求初始化数据
            setTimeout(() => {
                Events__default$1["default"].DispatchToServer(this.INIT_PLAYER_DATA_ASK);
            }, 500);
            Events__default$1["default"].AddServerListener(this.PLAYER_DATA_CHANGE_NOTIFY, (dataInfoName, dataInfo) => {
                if (this.playerData != null) {
                    this.playerData.dataInfoMap[dataInfoName] = dataInfo;
                }
            });
            return new Promise((resolve) => {
                //监听_初始化数据
                let listener = Events__default$1["default"].AddServerListener(this.INIT_PLAYER_DATA_REPLY, (dataMap) => {
                    listener.Disconnect();
                    this.playerData = new PlayerData(0, dataMap);
                    resolve();
                });
            });
        }
        /**
         * 获取自己的一个模块数据
         * @param ModuleDataClass 模块数据类
         * @returns 模块数据对象
         */
        getModuleData(ModuleDataClass) {
            return this.playerData.getModuleData(ModuleDataClass);
        }
    }

    /**回调体，用于Action和Event系统的辅助功能*/
    class CallBack {
        fun;
        thisArg;
        dirty = false; //脏标记
        constructor(fun, thisArg) {
            this.fun = fun;
            this.thisArg = thisArg;
        }
        call(...prames) {
            if (!this.dirty) {
                if (this.thisArg != null) {
                    return this.fun.call(this.thisArg, ...prames);
                }
                else {
                    this.fun(...prames);
                }
            }
        }
        //判断是否构建于fun和thisArg
        isOriginFrom(fun, thisArg) {
            return this.fun == fun && this.thisArg == thisArg;
        }
        get originFun() {
            return this.fun;
        }
        get originThisArg() {
            return this.thisArg;
        }
    }
    /**任意参数的代理*/
    class Action {
        funArgList = [];
        callingRemNum = -1; //调用时移除的数量
        countChangeCallback; //长度变化的回调
        /**
         * 添加一个监听方法(不会重复添加)
         * @param fn 方法
         * @param thisArg 域
         */
        add(fn, thisArg) {
            if (fn == null)
                return;
            let index = this.getFunIndex(fn, thisArg);
            if (index == -1)
                this.funArgList.push(new CallBack(fn, thisArg));
            if (this.countChangeCallback != null)
                this.countChangeCallback(this.count);
        }
        /**
         * 移除一个监听方法
         * @param fn 方法
         * @param thisArg 域
         */
        remove(fn, thisArg) {
            if (fn == null)
                return;
            if (this.callingRemNum >= 0) {
                this.callingRemNum++;
                let callBack = this.getCallBack(fn, thisArg);
                if (callBack != null)
                    callBack.dirty = true;
            }
            else {
                let index = this.getFunIndex(fn, thisArg);
                if (index != -1)
                    this.funArgList.splice(index, 1);
                if (this.countChangeCallback != null)
                    this.countChangeCallback(this.count);
            }
        }
        /**
         * 执行
         * @param prams 参数序列
         */
        call(...prams) {
            if (this.funArgList.length == 0)
                return;
            this.callingRemNum = 0;
            for (let i = 0; i < this.funArgList.length; i++) {
                this.funArgList[i].call(...prams);
            }
            if (this.callingRemNum > 0) { //Call的时候有方法被移除了
                for (let i = 0; i < this.funArgList.length;) {
                    if (this.funArgList[i].dirty)
                        this.funArgList.splice(i, 1);
                    else
                        i++;
                }
                if (this.countChangeCallback != null)
                    this.countChangeCallback(this.count);
            }
            this.callingRemNum = -1;
        }
        /**
         * 判断是否包含某个监听方法
         * @param fn 方法
         * @param thisArg 域
         * @returns 结果
         */
        includes(fn, thisArg) {
            if (fn == null)
                return false;
            return this.getFunIndex(fn, thisArg) != -1;
        }
        /**
         * 清除所有监听
         */
        clear() {
            while (this.funArgList.length > 0)
                this.funArgList.pop();
        }
        /**
         * 监听方法的数量
         */
        get count() {
            return this.funArgList.length;
        }
        /**
         * 设置长度变化的回调方法
         * @param callback 方法
         */
        setCountChangeCallback(callback) {
            this.countChangeCallback = callback;
        }
        getFunIndex(fn, thisArg) {
            for (let i = 0; i < this.funArgList.length; i++) {
                if (this.funArgList[i].isOriginFrom(fn, thisArg))
                    return i;
            }
            return -1;
        }
        getCallBack(fn, thisArg) {
            for (let i = 0; i < this.funArgList.length; i++) {
                if (this.funArgList[i].isOriginFrom(fn, thisArg))
                    return this.funArgList[i];
            }
            return null;
        }
    }
    /**一个参数的代理*/
    class Action1 extends Action {
        add(fn, thisArg) { super.add(fn, thisArg); }
        remove(fn, thisArg) { super.remove(fn, thisArg); }
        call(arg) { super.call(arg); }
    }
    /**二个参数的代理*/
    class Action2 extends Action {
        add(fn, thisArg) { super.add(fn, thisArg); }
        remove(fn, thisArg) { super.remove(fn, thisArg); }
        call(a, b) { super.call(a, b); }
    }
    //单例的装饰器
    const SINGLETON_KEY = Symbol();
    function Singleton() {
        return function (type) {
            const proxyType = new Proxy(type, {
                // this will hijack the constructor
                construct(target, argsList, newTarget) {
                    // we should skip the proxy for children of our target class
                    if (target.prototype !== newTarget.prototype) {
                        return Reflect.construct(target, argsList, newTarget);
                    }
                    // if our target class does not have an instance, create it
                    if (!target[SINGLETON_KEY]) {
                        target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget);
                    }
                    return target[SINGLETON_KEY];
                },
            });
            Reflect.defineProperty(proxyType, "instance", {
                get() {
                    if (!this[SINGLETON_KEY]) {
                        new this();
                    }
                    return this[SINGLETON_KEY];
                },
                set(next) {
                    this[SINGLETON_KEY] = next;
                }
            });
            return proxyType;
        };
    }

    var LogManager_1;
    /**
     * 输出Log
     * @param content 内容
     */
    function oTrace(...content) {
        exports.LogManager.instance.log(...content);
    }
    /**
     * 输出Warning
     * @param content 内容
     */
    function oTraceWarning(...content) {
        exports.LogManager.instance.logWarning(...content);
    }
    /**
     * 输出Error
     * @param content 内容
     */
    function oTraceError(...content) {
        exports.LogManager.instance.logError(...content);
    }
    //#region Debug
    exports.LogManager = LogManager_1 = class LogManager {
        static instance;
        constructor() { }
        destroy() {
            LogManager_1.instance = null;
        }
        logLevel = 3;
        _firstWithEnable = true;
        /**
         * 设置所有的打印是否带______[OdinLog]前缀
         */
        set firstWithEnable(value) {
            this._firstWithEnable = value;
        }
        /**
         * 设置输出的等级
         * @param value 等级值(0-全部 1-Error&Warning 2-Error)
         */
        setLogLevel(value) {
            this.logLevel = value;
        }
        /**
         * 输出Log
         * @param content 内容
         */
        log(...content) {
            this.logWithTag(null, ...content);
        }
        /**
         * 输出带tag的Log，便于搜索
         * @param tag tag
         * @param content 内容
         */
        logWithTag(tag, ...content) {
            if (this.logLevel < 3)
                return;
            console.log(`${this.getFirstWith(tag)}${content}`);
        }
        /**
         * 输出Warning
         * @param content 内容
         */
        logWarning(...content) {
            this.logWarningWithTag(null, ...content);
        }
        /**
         * 输出带tag的Warning，便于搜索
         * @param tag tag
         * @param content 内容
         */
        logWarningWithTag(tag, ...content) {
            if (this.logLevel < 2)
                return;
            console.warn(`${this.getFirstWith(tag)}${content}`);
        }
        /**
         * 输出Error
         * @param content 内容
         */
        logError(...content) {
            this.logErrorWithTag(null, ...content);
        }
        /**
         * 输出带tag的Error，便于搜索
         * @param tag tag
         * @param content 内容
         */
        logErrorWithTag(tag, ...content) {
            if (this.logLevel < 1)
                return;
            console.error(`${this.getFirstWith(tag)}${content}`);
        }
        //获取前缀
        getFirstWith(tag) {
            if (this._firstWithEnable) {
                if (tag != null) {
                    return `______[OdinLog][${tag}]       `;
                }
                else {
                    return `______[OdinLog]       `;
                }
            }
            else {
                if (tag != null) {
                    return `[${tag}]`;
                }
                else {
                    return "";
                }
            }
        }
    };
    exports.LogManager = LogManager_1 = __decorate([
        Singleton()
    ], exports.LogManager);

    //数据中心，管理所有玩家的数据(服务端专用)
    class DataCenterS {
        static _instance = new DataCenterS();
        constructor() { }
        static get instance() {
            return this._instance;
        }
        destroy() {
            DataCenterS._instance = null;
        }
        INIT_PLAYER_DATA_ASK = "InitPlayerData_Ask"; //初始化玩家数据请求
        INIT_PLAYER_DATA_REPLY = "InitPlayerData_Reply"; //初始化玩家数据回应
        PLAYER_DATA_CHANGE_NOTIFY = "PlayerDataChange_Notify"; //玩家数据变化通知
        SAVE_DELAY_SECOND = 10; //每10秒保存一个数据
        onPlayerJoined = new Action1(); //玩家进入
        onPlayerLeft = new Action1(); //玩家离开(保存数据之前调用)
        playerDataMap = null;
        toBeSavedMap = new Map(); //要存储的玩家数据，10秒存 <platerId, time>
        onlinePlayerIds = []; //在线的玩家id
        /**初始化 */
        init() {
            if (!GamePlay__default$1["default"].IsServer())
                return;
            this.playerDataMap = new Map();
            //玩家上线
            Events__default$1["default"].AddPlayerJoinedListener((player) => {
                oTrace("DataCenter:Player enter game. playerID=" + player.GetPlayerID());
                this.loadPlayerData(player);
                this.onPlayerJoined.call(player);
            });
            //玩家下线
            Events__default$1["default"].AddPlayerLeftListener((player) => {
                oTrace("DataCenter:Player left game. playerID=" + player.GetPlayerID());
                this.onPlayerLeft.call(player);
                this.unloadPlayerData(player);
            });
            //玩家初始化数据的请求
            Events__default$1["default"].AddClientListener(this.INIT_PLAYER_DATA_ASK, (player, data) => {
                oTrace("Receive " + this.INIT_PLAYER_DATA_ASK + " playerID=" + player.GetPlayerID());
                let playerID = player.GetPlayerID();
                if (this.playerDataMap.has(playerID)) {
                    Events__default$1["default"].DispatchToClient(player, this.INIT_PLAYER_DATA_REPLY, this.playerDataMap.get(playerID).dataInfoMap);
                }
                else {
                    oTrace("DataCenter:Player data not found. platerID=" + playerID);
                }
            });
            //10秒钟保存一次数据
            setInterval(this.savePlayerData.bind(this), 1000);
        }
        //装载玩家数据
        loadPlayerData(player) {
            let data = DataStorage__default["default"].GetPlayerData(player);
            let playerID = player.GetPlayerID();
            oTrace("DataCenter:Load player data. playerID=" + player.GetPlayerID() + " " + (data == null ? "NewPlayer" : "OldPlayer"));
            if (data == null) {
                data = { playerID: playerID };
            }
            this.playerDataMap.set(playerID, new PlayerData(playerID, data));
            this.onlinePlayerIds.push(playerID);
        }
        //卸载玩家数据
        unloadPlayerData(player) {
            let playerID = player.GetPlayerID();
            if (this.toBeSavedMap.has(playerID)) {
                this.toBeSavedMap.delete(playerID);
                DataStorage__default["default"].AsyncSetPlayerData(player, this.getPlayerData(player).dataInfoMap);
            }
            this.playerDataMap.get(playerID).destroy();
            this.playerDataMap.delete(playerID);
            let index = this.onlinePlayerIds.indexOf(playerID);
            this.onlinePlayerIds.splice(index, 1);
        }
        //保存玩家数据(真存)
        savePlayerData() {
            this.playerDataMap.forEach((data, playerID) => {
                if (this.toBeSavedMap.has(playerID)) {
                    let time = this.toBeSavedMap.get(playerID);
                    time++;
                    if (time >= this.SAVE_DELAY_SECOND) {
                        let player = GamePlay__default$1["default"].GetPlayer(playerID);
                        DataStorage__default["default"].AsyncSetPlayerData(player, this.getPlayerData(player).dataInfoMap);
                        this.toBeSavedMap.delete(playerID);
                    }
                    else {
                        this.toBeSavedMap.set(playerID, time);
                    }
                }
            });
        }
        //获取一个玩家的数据
        getPlayerData(player) {
            if (player == null)
                return;
            if (player instanceof GamePlay__default$1["default"].Player) {
                return this.playerDataMap.get(player.GetPlayerID());
            }
            else {
                return this.playerDataMap.get(player);
            }
        }
        /**
         * 获取一个玩家的一个模块数据
         * @param player 玩家
         * @param ModuleDataClass 模块数据类
         * @returns 模块数据对象
         */
        getModuleData(player, ModuleDataClass) {
            return this.getPlayerData(player).getModuleData(ModuleDataClass);
        }
        /**
         * 存储模块数据
         * @param moduleData 模块数据
         * @returns 是否成功
         */
        saveModuleData(moduleData, syncToClient) {
            let player = GamePlay__default$1["default"].GetPlayer(moduleData.playerId);
            let playerID = player.GetPlayerID();
            let playerData = this.getPlayerData(player);
            if (playerData == null) {
                return false; //没有这个玩家的数据
            }
            if (!this.toBeSavedMap.has(playerID)) {
                this.toBeSavedMap.set(playerID, 0);
            }
            let dataInfoName = moduleData.dataName;
            let dataInfo = moduleData.dataInfo;
            playerData.dataInfoMap[dataInfoName] = dataInfo;
            if (syncToClient) {
                Events__default$1["default"].DispatchToClient(player, this.PLAYER_DATA_CHANGE_NOTIFY, dataInfoName, dataInfo);
            }
            return true;
        }
        /**
         * 获取在线的所有玩家的ID数组
         * @returns 在线玩家id数组
         */
        getPlayerIDs() {
            return this.onlinePlayerIds;
        }
    }

    class TimeUtil {
        /**进入帧事件(参数dt)*/
        static onEnterFrame = new Action1();
        static delayExecuteFun = [];
        static delayExecuteId = 0;
        static _delayTime = 0;
        /**每一帧经过的时间 (单位：秒) */
        static get delayTime() {
            return this._delayTime;
        }
        /** 游戏运行后所经过的总时长 (单位：秒)*/
        static get time() {
            return Global__default["default"].ElapsedTime();
        }
        /**
         * 延迟一定帧数执行方法
         * @param fun 执行的方法
         * @param frameNum 要延迟的帧数
         * @returns 用于停止的id
         */
        static delayExecute(fun, frameNum = 1) {
            let id = ++this.delayExecuteId;
            this.delayExecuteFun.push({ id: id, fun, frame: frameNum });
            return id;
        }
        /**
         * 清除delayExecute
         * @param id delayExecute方法返回的id
         */
        static clearDelayExecute(id) {
            for (let i = 0; i < this.delayExecuteFun.length; i++) {
                if (this.delayExecuteFun[i].id == id) {
                    this.delayExecuteFun.splice(i, 1);
                    break;
                }
            }
        }
        /**
         * 延迟一定秒数,用于异步方法中间的等待
         * @param second 时间(单位：秒)
         * @returns Promise
         */
        static async delaySecond(second) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    return resolve();
                }, second * 1000);
            });
        }
        /**
         * 给主循环留的接口，不要调用
         * @param dt 两帧直接的时间差
         */
        static update(dt) {
            this._delayTime = dt;
            this.onEnterFrame.call(dt);
            this.delayExecuteUpdate();
        }
        static delayExecuteUpdate() {
            if (this.delayExecuteFun.length == 0)
                return;
            for (let i = 0; i < this.delayExecuteFun.length;) {
                this.delayExecuteFun[i].frame--;
                if (this.delayExecuteFun[i].frame <= 0) {
                    this.delayExecuteFun[i].fun();
                    this.delayExecuteFun.splice(i, 1);
                }
                else {
                    i++;
                }
            }
        }
    }

    var NetManager_1;
    exports.NetManager = NetManager_1 = class NetManager {
        static instance;
        constructor() { }
        destroy() {
            NetManager_1.instance = null;
        }
        ASK = "Ask";
        REPLY = "Reply";
        NOTIFY = "Notify";
        _logVisible = false;
        funMap = new Map(); //注册的方法
        objFunMap = new Map(); //注册的对象的方法
        objMap = new Map(); //对远端开放调用的对象<netGuid, obj>
        waitServerResolveMap = new Map();
        _currentPlayer;
        init() {
            if (GamePlay__default$1["default"].IsClient()) {
                Events__default$1["default"].AddServerListener(this.REPLY, (funName, res) => {
                    this.showLog(`Reply      ${funName} ${res}`);
                    if (this.waitServerResolveMap.has(funName) && this.waitServerResolveMap.get(funName).length > 0) {
                        let resolve = this.waitServerResolveMap.get(funName).shift();
                        resolve(res);
                    }
                    else {
                        oTraceError("NetObject(Client Reply): Function is not found. fun=" + funName);
                    }
                });
                Events__default$1["default"].AddServerListener(this.NOTIFY, (funName, ...params) => {
                    this.showLog(`Notify     ${funName}`);
                    let fun = this.getFunction(funName);
                    if (fun != null) {
                        fun.call(...params);
                    }
                    else {
                        oTraceError("NetObject(Client Notify): Function is not found. fun=" + funName);
                    }
                });
            }
            else {
                Events__default$1["default"].AddClientListener(this.ASK, (player, funName, ...params) => {
                    this.showLog(`   Ask       ${funName} ${params.length}`);
                    let fun = this.getFunction(funName);
                    if (fun != null) {
                        this._currentPlayer = player;
                        params.push(player);
                        let res = fun.call(...params);
                        this._currentPlayer = null;
                        if (res instanceof Promise) {
                            res.then((result) => {
                                this.showLog(`Reply      ${funName} ${result}`);
                                Events__default$1["default"].DispatchToClient(player, this.REPLY, funName, result);
                            });
                        }
                        else {
                            this.showLog(`Reply      ${funName} ${res}`);
                            Events__default$1["default"].DispatchToClient(player, this.REPLY, funName, res);
                        }
                    }
                    else {
                        oTraceError("NetObject(Server Ask): Function is not found. fun=" + funName);
                    }
                });
            }
        }
        /**
         * 注册网络方法(网络方法是可以被远端调用的， 注意：注册的方法名不能重复)
         * @param fun 方法
         * @param thisArg 方法的域
         * @param callName 调用别名(默认为方法名)
         */
        registerFun(fun, thisArg, callName = null) {
            if (callName == null) {
                callName = fun.name;
            }
            if (!this.funMap.has(callName)) {
                let callback = new CallBack(fun, thisArg);
                this.funMap.set(callName, callback);
            }
            else {
                oTraceError("Repeated NET Function! funName=" + fun.name + " callName=" + callName);
            }
        }
        /**
         * 移除注册的网络方法
         * @param fun 方法
         */
        unRegisterFun(fun) {
            for (let [callName, callBack] of this.funMap) {
                if (callBack.originFun == fun) {
                    this.funMap.delete(callName);
                    return;
                }
            }
        }
        /**
         * 注册网络对象(网络对象里的方法都是可以被远端调用的)
         * @param netObj 网络对象
         * @param netGuid 通信id
         */
        registerObj(netObj, netGuid) {
            oTrace('Register NET Object! netGuid=' + netGuid);
            if (netGuid == null) {
                oTraceError("Register NET Obj Error! netGuid Is Null!");
            }
            else if (!this.objMap.has(netGuid)) {
                this.objMap.set(netGuid, netObj);
            }
            else {
                oTraceError("Register NET Obj Error! Repeated NET Guid! netGuid=" + netGuid);
            }
        }
        /**
         * 移除注册的网络对象
         * @param netObj 对象
         */
        unRegisterObj(netObj) {
            if (netObj == null)
                return;
            for (let [netGuid, obj] of this.objMap) {
                if (obj == netObj) {
                    this.objMap.delete(netGuid);
                    break;
                }
            }
            for (let [callName, callBack] of this.objFunMap) {
                if (callBack.originThisArg == netObj) {
                    this.funMap.delete(callName);
                }
            }
        }
        /**
         * 调用服务端方法
         * @param fun 方法路径|方法
         * @param params 参数
         * @returns 方法的返回值
         */
        callServerFun(fun, ...params) {
            if (GamePlay__default$1["default"].IsServer())
                return null;
            let funName = (typeof fun === 'string') ? fun : fun.name;
            if (!this.waitServerResolveMap.has(funName)) {
                this.waitServerResolveMap.set(funName, []);
            }
            return new Promise((resolve) => {
                this.waitServerResolveMap.get(funName).push(resolve);
                this.showLog(`   Ask        ${funName} ${params.length}`);
                Events__default$1["default"].DispatchToServer(this.ASK, funName, ...params);
            });
        }
        /**
         * 调用目标客户端的方法
         * @param player 目标玩家
         * @param fun 方法路径|方法
         * @param params 参数
         */
        callClientFun(player, fun, ...params) {
            if (GamePlay__default$1["default"].IsClient())
                return null;
            let funName = (typeof fun === 'string') ? fun : fun.name;
            this.showLog(`Notify   OneCilent   ${funName} ${params}`);
            Events__default$1["default"].DispatchToClient(player, this.NOTIFY, funName, ...params);
        }
        /**
         * 调用目标玩家周围客户端的方法
         * @param player 目标玩家
         * @param fun 方法路径|方法
         * @param params 参数
         */
        callAroundClientFun(player, fun, ...params) {
            if (GamePlay__default$1["default"].IsClient())
                return null;
            let funName = (typeof fun === 'string') ? fun : fun.name;
            this.showLog(`Notify   AroundClient   ${funName} ${params}`);
            Events__default$1["default"].DispatchToAllClient(player, this.NOTIFY, funName, ...params);
        }
        /**
         * 调用所有客户端的方法
         * @param fun 方法路径|方法
         * @param params 参数
         */
        callWorldClientFun(fun, ...params) {
            if (GamePlay__default$1["default"].IsClient())
                return null;
            let funName = (typeof fun === 'string') ? fun : fun.name;
            this.showLog(`Notify   WorldClient   ${funName} ${params}`);
            Events__default$1["default"].DispatchToAllRoomClient(this.NOTIFY, funName, ...params);
        }
        /**是否显示通信log */
        set logVisible(value) {
            this._logVisible = value;
        }
        /**
         * 当前调用服务器方法的玩家
         */
        get currentPlayer() {
            return this._currentPlayer;
        }
        //根据名称获取一个方法
        //funName可以是netGuid.FunName的形式
        getFunction(fun) {
            if (this.funMap.has(fun)) {
                return this.funMap.get(fun);
            }
            if (this.objFunMap.has(fun)) {
                return this.objFunMap.get(fun);
            }
            if (fun.includes('.')) {
                let strArr = fun.split('.');
                let netGuid = strArr[0];
                let funName = strArr[1];
                if (this.objMap.has(netGuid)) {
                    let obj = this.objMap.get(netGuid);
                    if (obj[funName] != null && typeof (obj[funName]) == "function") {
                        let callback = new CallBack(obj[funName], obj);
                        this.objFunMap.set(fun, callback);
                        return callback;
                    }
                }
            }
            return null;
        }
        //输出log
        showLog(content) {
            if (!this._logVisible)
                return;
            oTraceWarning(content);
        }
    };
    exports.NetManager = NetManager_1 = __decorate([
        Singleton()
    ], exports.NetManager);

    exports.EffectPlayerType = void 0;
    (function (EffectPlayerType) {
        EffectPlayerType[EffectPlayerType["Pos"] = 1] = "Pos";
        EffectPlayerType[EffectPlayerType["Player"] = 2] = "Player";
        EffectPlayerType[EffectPlayerType["GameObject"] = 3] = "GameObject";
    })(exports.EffectPlayerType || (exports.EffectPlayerType = {}));
    class EffectData {
        static currentPlayId = 0;
        playId;
        resId;
        playType;
        loopNum;
        targetGoGuid;
        targetPlayerId;
        socketType;
        position;
        angles;
        scale;
        constructor() {
        }
        /**
         * 获取在一个坐标播放特效的数据
         * @param resGuid 特效资源guid
         * @param position 坐标
         * @param loopNum 循环次数(0无限)
         * @param angles 角度
         * @returns 特效播放数据
         */
        static getPlayInPos(resGuid, position, loopNum, angles, scale) {
            let data = new EffectData();
            data.playId = EffectData.getNewPlayId();
            data.playType = exports.EffectPlayerType.Pos;
            data.resId = resGuid;
            data.position = position;
            data.loopNum = loopNum;
            data.angles = angles;
            data.scale = scale;
            return data;
        }
        static getPlayInPlayer(resGuid, player, socketType, loopNum, offset, angles, scale) {
            let data = new EffectData();
            data.playId = EffectData.getNewPlayId();
            data.playType = exports.EffectPlayerType.Player;
            data.resId = resGuid;
            data.position = offset;
            data.loopNum = loopNum;
            data.angles = angles;
            data.scale = scale;
            data.targetPlayerId = player.GetPlayerID();
            data.socketType = socketType;
            return data;
        }
        static getPlayInGameObject(resGuid, target, loopNum = 1, offset, angles, scale) {
            let data = new EffectData();
            data.playId = EffectData.getNewPlayId();
            data.playType = exports.EffectPlayerType.GameObject;
            data.resId = resGuid;
            data.position = offset;
            data.loopNum = loopNum;
            data.angles = angles;
            data.scale = scale;
            data.targetGoGuid = target.guid;
            return data;
        }
        static isReady(data) {
            if (data.playType == exports.EffectPlayerType.Pos)
                return true;
            if (data.playType == exports.EffectPlayerType.GameObject)
                return MWCore__default$1["default"].GameObject.Find(data.targetGoGuid) != null;
            if (data.playType == exports.EffectPlayerType.Player)
                return GamePlay__default$1["default"].GetPlayer(data.targetPlayerId) != null;
            return false;
        }
        static EffIsDepend(effData, targetId) {
            if (effData.playType == exports.EffectPlayerType.Pos) {
                return targetId == null;
            }
            return effData.targetGoGuid == targetId || effData.targetPlayerId == targetId;
        }
        //生成一个新的播放id
        static getNewPlayId() {
            if (GamePlay__default$1["default"].IsServer())
                return ++this.currentPlayId;
            return --this.currentPlayId;
        }
    }

    class Effect {
        _resId; //没什么实际意义，就是自定义的名字
        go;
        playTime; //特效播放一次的持续时间(单位:秒)
        totalPlayerTime = 0; //本次播放的总时间(单位:秒)
        startPlayTime = 0; //开始播放的时间(时间戳：秒)
        effectData;
        isWaitParent;
        delayPlayFrame; //延迟播放的帧数
        delayPlayId = 0; //延迟播放的方法ID
        /**
         * 构造
         * @param resId 资源id
         * @param playTime 播放的总时长(单位:秒)
         */
        constructor(resId, playTime) {
            this._resId = resId;
            this.playTime = playTime;
            if (GamePlay__default$1["default"].IsClient()) {
                if (resId != null) {
                    let go = null;
                    if (Effect.isAssetId(this.resId)) {
                        go = MWCore__default$1["default"].GameObject.SpawnGameObject(resId);
                    }
                    else {
                        go = MWCore__default$1["default"].GameObject.Find(resId);
                        go.SetVisibility(Type__default$1["default"].PropertyStatus.On);
                    }
                    if (go != null) {
                        this.init(go);
                    }
                    else {
                        oTraceError("Effect: Creat effect fail! resId=" + resId);
                    }
                }
            }
            else {
                oTraceError("Effect: Forbidden creat effect on server!");
            }
        }
        //判断自己的id是否是资源id（如果是，说是从库里出来的，如果不是，说明是从场景里找的）
        static isAssetId(id) {
            return id.length < 10;
        }
        init(go) {
            //如果是库里实例化出来的需要延迟播放
            if (Effect.isAssetId(this._resId)) {
                this.delayPlayFrame = 1;
            }
            this.go = go;
            this.go.Stop();
            return this;
        }
        play(data) {
            this.effectData = data;
            this.startPlayTime = TimeUtil.time;
            if (this.effectData.loopNum <= 0) {
                this.totalPlayerTime = Number.MAX_VALUE;
                this.go.SetLoop(true);
            }
            else {
                this.totalPlayerTime = this.playTime * this.effectData.loopNum;
                this.go.SetLoop(false);
            }
            if (this.delayPlayFrame > 0) { //延迟播放
                if (this.delayPlayId > 0) {
                    TimeUtil.clearDelayExecute(this.delayPlayId);
                }
                this.delayPlayId = TimeUtil.delayExecute(() => {
                    this.playHandle();
                    this.delayPlayId = 0;
                    this.delayPlayFrame = 0;
                }, this.delayPlayFrame);
            }
            else { //不延迟播放
                this.playHandle();
            }
            return data.playId;
        }
        playHandle() {
            this.isWaitParent = !EffectData.isReady(this.effectData);
            if (this.isWaitParent)
                return;
            switch (this.effectData.playType) {
                case exports.EffectPlayerType.GameObject:
                    let target = MWCore__default$1["default"].GameObject.Find(this.effectData.targetGoGuid);
                    this.go.AttachToGameObject(target);
                    break;
                case exports.EffectPlayerType.Player:
                    let player = GamePlay__default$1["default"].GetPlayer(this.effectData.targetPlayerId);
                    player.Character.AttachGameObjectToCharacter(this.go, this.effectData.socketType);
                    break;
                case exports.EffectPlayerType.Pos:
                    this.go.DetachFromGameObject();
                    break;
            }
            this.go.Play();
            if (this.effectData.position != null) {
                this.go.SetRelativeLocation(this.effectData.position);
            }
            else {
                this.go.SetRelativeLocation(Type__default$1["default"].Vector.ZERO);
            }
            if (this.effectData.angles != null) {
                this.go.SetRelativeRotation(new Type__default$1["default"].Rotation(this.effectData.angles));
            }
            else {
                this.go.SetRelativeRotation(Type__default$1["default"].Rotation.ZERO);
            }
            if (this.effectData.scale != null) {
                this.go.scale = this.effectData.scale;
            }
            else {
                this.go.scale = Type__default$1["default"].Vector.ONE;
            }
        }
        /**编辑器特效对象 */
        get mwEffect() {
            return this.go;
        }
        /**
         * 是否依赖一个对象
         * @param targetId gameObejct的guid|player的playerId
         * @returns 结果
         */
        isDepend(targetId) {
            return EffectData.EffIsDepend(this.effectData, targetId);
        }
        stop() {
            this.go.DetachFromGameObject();
            this.go.Stop();
            this.totalPlayerTime = 0;
            if (this.delayPlayId > 0) {
                TimeUtil.clearDelayExecute(this.delayPlayId);
            }
        }
        get playId() {
            return this.effectData.playId;
        }
        get resId() {
            return this._resId;
        }
        get isDone() {
            return TimeUtil.time - this.startPlayTime >= this.totalPlayerTime;
        }
        update() {
            if (this.isDone)
                return true;
            if (this.isWaitParent) {
                this.playHandle();
                if (TimeUtil.time - this.startPlayTime > 10) { //10秒找不到宿主就停止吧
                    this.stop();
                }
            }
            return false;
        }
        clone() {
            let go = this.go.Clone();
            let effect = new Effect(null, this.playTime);
            effect._resId = this._resId;
            return effect.init(go);
        }
    }

    var EffectManager_1;
    //特效管理
    exports.EffectManager = EffectManager_1 = class EffectManager {
        static instance;
        constructor() { }
        destroy() {
            EffectManager_1.instance = null;
        }
        effDataMap = new Map(); //需要预先加载的特效 <guid, {name, guid, time}>
        effectMap = new Map(); //原始的特效 <guid, Effect>
        pool = new Map(); //<guid, [Effect,...]>
        playingEffectArr = []; //当前处于播放状态的特效
        playingEffectMap = new Map(); //当前处于播放状态的特效<objId, Effect>
        loopEffectDataOnServer = new Map();
        init() {
            if (GamePlay__default$1["default"].IsClient()) {
                TimeUtil.onEnterFrame.add(this.update, this);
                exports.NetManager.instance.registerFun(this.playEffect, this);
                exports.NetManager.instance.registerFun(this.stopEffect, this);
                exports.NetManager.instance.registerFun(this.stopEffectFromHost_Executor, this);
                //刚上线的时候，向服务器要当前循环播放的特效
                exports.NetManager.instance.callServerFun("getLoopEffect").then((dataArr) => {
                    dataArr.forEach((effData) => {
                        this.playEffect(effData);
                    });
                });
            }
            else {
                exports.NetManager.instance.registerFun(() => {
                    return this.loopEffectDataOnServer;
                }, this, "getLoopEffect");
            }
        }
        /**
         * 注册预加载特效(框架方法，请勿调用)
         * @param name 调用名称
         * @param guid 资源id
         * @param time 播放时长(单位：秒)
         */
        registerPreload(name, guid, time) {
            this.effDataMap.set(guid, { name: name, guid: guid, time: time });
        }
        /**
         * 预加载特效资源(框架方法，请勿调用)
         * @returns 是否全部成功
         */
        preloadEffect() {
            return new Promise((resolve) => {
                if (this.effDataMap.size == 0) {
                    return resolve(true);
                }
                let effDataArr = [];
                for (let [guid, effData] of this.effDataMap) {
                    effDataArr.push(effData);
                }
                let waitIndex = 0;
                let id = setInterval(() => {
                    for (; waitIndex < effDataArr.length; waitIndex++) {
                        let effName = effDataArr[waitIndex].name;
                        let guid = effDataArr[waitIndex].guid;
                        oTrace("Load effect.[" + (waitIndex + 1) + "/" + effDataArr.length + "]  name=" + effName + " time=" + effDataArr[waitIndex].time + " guid=" + guid);
                        if (guid.length > 10 && MWCore__default$1["default"].GameObject.Find(guid) == null) {
                            break; //等不到就一直等
                        }
                        else {
                            let time = effDataArr[waitIndex].time;
                            let effect = new Effect(guid, time);
                            this.effectMap.set(guid, effect);
                        }
                    }
                    if (waitIndex >= effDataArr.length) {
                        clearInterval(id);
                        return resolve(true);
                    }
                }, 100);
            });
        }
        playEffect(data) {
            if (GamePlay__default$1["default"].IsServer()) {
                if (data.loopNum <= 0) {
                    this.loopEffectDataOnServer.set(data.playId, data);
                }
                exports.NetManager.instance.callWorldClientFun(this.playEffect, data);
            }
            else {
                let effect = this.spawnEffect(data.resId);
                if (effect == null)
                    return 0;
                effect.play(data);
                this.playingEffectArr.push(effect);
                this.playingEffectMap.set(data.playId, effect);
            }
            return data.playId;
        }
        /**
         * 在一个角色的挂点上播放特效（可双端调用)
         * @param resId 特效资源id
         * @param player 玩家
         * @param socketType 挂点类型
         * @param loopNum 循环次数(0为无限)
         * @param offset 坐标偏移
         * @param angles 角度
         * @param scale 缩放
         * @returns playId，本次播放的唯一标识，可用于停止
         */
        playEffectInPlayer(resId, player, socketType, loopNum = 1, offset = Type__default$1["default"].Vector.ZERO, angles = null, scale = null) {
            let effectData = EffectData.getPlayInPlayer(resId, player, socketType, loopNum, offset, angles, scale);
            return this.playEffect(effectData);
        }
        /**
         * 在一个GameObject上播放特效（可双端调用)
         * @param resId 特效资源id
         * @param target 目标GameObject | 目标GameObject的guid
         * @param loopNum 循环次数(0为无限)
         * @param offset 坐标偏移
         * @param angles 角度
         * @param scale 缩放
         * @returns playId，本次播放的唯一标识，可用于停止
         */
        playEffectInGameObject(resId, target, loopNum = 1, offset = Type__default$1["default"].Vector.ZERO, angles = null, scale = null) {
            let effectData = EffectData.getPlayInGameObject(resId, target, loopNum, offset, angles, scale);
            return this.playEffect(effectData);
        }
        /**
         * 在一个坐标上播放特效（可双端调用)
         * @param resId 特效资源id
         * @param pos 世界坐标
         * @param loopNum 循环次数(0为无限)
         * @param angles 角度
         * @param scale 缩放
         * @returns playId，本次播放的唯一标识，可用于停止
         */
        playEffectInPos(resId, pos, loopNum = 1, angles = null, scale = null) {
            let effectData = EffectData.getPlayInPos(resId, pos, loopNum, angles, scale);
            return this.playEffect(effectData);
        }
        /**
         * 停止目标对象上所有资源id的特效（可双端调用)
         * @param resId 特效资源id
         * @param target 目标对象(Player或者GameObject)
         */
        stopEffectFromHost(resId, target) {
            let hostId = null;
            if (target != null) {
                if (target instanceof GamePlay__default$1["default"].Player) {
                    hostId = target.GetPlayerID();
                }
                else if (target instanceof MWCore__default$1["default"].GameObject) {
                    hostId = target.GetGuid();
                }
            }
            this.stopEffectFromHost_Executor(resId, hostId);
        }
        stopEffectFromHost_Executor(resId, hostId) {
            if (GamePlay__default$1["default"].IsServer()) {
                for (let [objId, effData] of this.loopEffectDataOnServer) {
                    if (effData.resId == resId && EffectData.EffIsDepend(effData, hostId)) {
                        this.loopEffectDataOnServer.delete(objId);
                    }
                }
                exports.NetManager.instance.callWorldClientFun(this.stopEffectFromHost_Executor, resId, hostId);
            }
            else {
                for (let i = 0; i < this.playingEffectArr.length; i++) {
                    if (this.playingEffectArr[i].resId == resId && this.playingEffectArr[i].isDepend(hostId)) {
                        this.playingEffectArr[i].stop();
                    }
                }
            }
        }
        /**
         * 停止一个特效的播放（可双端调用)
         * @param playId 播放id
         */
        stopEffect(playId) {
            if (playId == 0)
                return;
            if (GamePlay__default$1["default"].IsServer()) {
                if (this.loopEffectDataOnServer.has(playId)) {
                    this.loopEffectDataOnServer.delete(playId);
                }
                exports.NetManager.instance.callWorldClientFun(this.stopEffect, playId);
            }
            else {
                let effect = this.getEffect(playId);
                if (effect != null)
                    effect.stop();
                //else oTraceError("EffectManager: No effect found to stop! objId = " + objId);
            }
        }
        /**
         * 根据播放id获取特效
         * @param playId 播放id
         * @returns 特效
         */
        getEffect(playId) {
            if (GamePlay__default$1["default"].IsServer() || !this.playingEffectMap.has(playId))
                return null;
            return this.playingEffectMap.get(playId);
        }
        update(dt) {
            for (let i = 0; i < this.playingEffectArr.length;) {
                let effect = this.playingEffectArr[i];
                if (effect.update()) {
                    this.returnEffect(effect);
                    this.playingEffectArr.splice(i, 1);
                    this.playingEffectMap.delete(effect.playId);
                }
                else {
                    i++;
                }
            }
        }
        spawnEffect(resId) {
            if (!this.effectMap.has(resId)) {
                let effect = new Effect(resId, 5);
                if (effect.mwEffect == null)
                    return null;
                this.effectMap.set(resId, effect);
            }
            if (!this.pool.has(resId)) {
                this.pool.set(resId, []);
            }
            let effect = null;
            if (this.pool.get(resId).length == 0) {
                effect = this.effectMap.get(resId).clone();
            }
            else {
                effect = this.pool.get(resId).shift();
            }
            return effect;
        }
        returnEffect(effect) {
            if (effect == null || !this.pool.has(effect.resId))
                return;
            effect.stop();
            this.pool.get(effect.resId).push(effect);
        }
    };
    exports.EffectManager = EffectManager_1 = __decorate([
        Singleton()
    ], exports.EffectManager);

    //字符串工具
    class StringUtil {
        /**
         * 获取一个Vector的字符串表达
         * @param v 向量
         * @returns 字符串
         */
        static getVectorString(v) {
            return `${v.x},${v.y},${v.z}`;
        }
        /**
         * 判断字符串是否为空(null或"")
         * @param str 要判断的字符串
         * @returns 结果
         */
        static isEmpty(str) {
            return str == null || str.length == 0;
        }
        /**
         * 将{i}中的内容依次替换为后续参数,i从0开始
         * @param str 要处理的字符串
         * @param param 替换序列
         * @returns 新的字符串
         */
        static format(str, ...param) {
            if (param == null || param.length == 0) {
                return str;
            }
            for (let i = 0; i < param.length; i++) {
                str = str.replace(`{${i}}`, param[i]);
            }
            return str;
        }
    }

    //网络对象
    class NetObject {
        _netGuid = null;
        constructor(netGuid) {
            this._netGuid = netGuid;
        }
        get netGuid() {
            return this._netGuid;
        }
        /**
         * 将自己注册到Net上，可供远端调用
         */
        registerToNet() {
            if (this._netGuid != null) {
                exports.NetManager.instance.registerObj(this, this._netGuid);
            }
            else {
                oTraceError("NetObject->registerToNet: error guid=" + this._netGuid);
            }
        }
    }

    //客户端的网络对象
    class NetObjectC extends NetObject {
        _server;
        netFunNameMap = new Map(); //因为方法被替换过 名字丢了 所以要记录一下
        /**
         * 构造
         * @param netGuid 通信id
         * @param ServerClass 服务端类
         * @param autoRegister 是否自动注册
         */
        constructor(netGuid, ServerClass, autoRegister = true) {
            super(netGuid);
            if (ServerClass != null) {
                this._server = new ServerClass(); //传null是为了避免循环构造
                this.serverClassToCallHander();
            }
            if (autoRegister && netGuid != null)
                this.registerToNet();
        }
        //服务器类转换为客户端调用的工具
        serverClassToCallHander() {
            this.replaceNetFun(this.server);
            if (this.server["__proto__"] != null) {
                this.replaceNetFun(this.server["__proto__"]);
            }
        }
        //替换NET方法
        replaceNetFun(obj) {
            let prototype = Object.getPrototypeOf(obj);
            let funNames = Reflect.ownKeys(prototype);
            for (let i = 0; i < funNames.length; i++) {
                let funName = funNames[i].toString();
                if (funName.startsWith('net_') && typeof obj[funName] === 'function') {
                    let fun = this.getCallServerFun(funName);
                    this.server[funName] = fun;
                    this.netFunNameMap.set(fun, funName);
                }
                else {
                    delete this.server[funName];
                }
            }
        }
        //生成可以供客户端调用的方法
        getCallServerFun(funName) {
            return async (...prames) => {
                return this.callServerFun(funName, ...prames);
            };
        }
        /**
         * 调用服务端方法
         * @param fun 服务端方法名|服务端方法对象
         * @param prames 参数
         * @returns 方法返回值
         */
        async callServerFun(fun, ...prames) {
            if (fun == null)
                return;
            let funName;
            if (fun instanceof Function) {
                if (StringUtil.isEmpty(fun.name)) {
                    funName = this.netFunNameMap.get(fun);
                }
                else {
                    funName = fun.name;
                }
            }
            else {
                funName = fun;
            }
            let res = await exports.NetManager.instance.callServerFun(`${this.netGuid}.${funName}`, ...prames);
            return res;
        }
        /**
         * 和自己绑定的服务端对象，可通过此对象直接调用net_开头的服务端方法
         */
        get server() {
            return this._server;
        }
    }

    class ModuleC extends NetObjectC {
        ModuleDataClass;
        /**
         * 构造(不要手动构造模块，请在GameStart中注册)
         * @param ServerModuleClass 模块服务端类
         * @param ModuleDataClass 模块数据类
         * @param netGuid 通信id
         */
        constructor(ServerModuleClass, ModuleDataClass, netGuid) {
            super(netGuid, ServerModuleClass, false);
            this.ModuleDataClass = ModuleDataClass;
        }
        /**获取当前玩家*/
        get currentPlayer() {
            return GamePlay__default$1["default"].GetCurrentPlayer();
        }
        /**获取模块数据*/
        get data() {
            return DataCenterC.instance.getModuleData(this.ModuleDataClass);
        }
        /**创建调用*/
        onAwake() { }
        /**开始调用*/
        onStart() { }
        /**进入场景调用*/
        onEnterScene(sceneType) { }
        /**刷新调用*/
        onUpdate(dt) { }
        /**销毁调用*/
        onDestroy() { }
        /**
         * 外部调用本模块的某个操作
         * @type type 操作类型
         * @param param 参数
         */
        execute(type, param) { }
        /**等待资源 */
        onWaitAsset(sceneType) { return null; }
    }

    var ModuleManager_1;
    //模块管理
    exports.ModuleManager = ModuleManager_1 = class ModuleManager {
        static instance;
        destroy() {
            ModuleManager_1.instance = null;
        }
        moduleMapType;
        moduleArr;
        constructor() {
            this.moduleMapType = {};
            this.moduleArr = [];
        }
        /**
         * 注册模块
         * @param ServerModule 模块的服务端类型
         * @param ClientModule 模块的客户端类型
         * @param ModuleDataClass 模块的数据类型
         */
        register(ServerModule, ClientModule, ModuleDataClass) {
            let netGuid = `${ServerModule.name}_${ClientModule.name}`;
            if (GamePlay__default$1["default"].IsServer()) {
                ModuleManager_1.instance.registerServerClient(ServerModule, ClientModule, ModuleDataClass, netGuid);
            }
            else {
                ModuleManager_1.instance.registerServerClient(ClientModule, ServerModule, ModuleDataClass, netGuid);
            }
        }
        //注册模块
        registerServerClient(ModuleClass, FriendClass, ModuleDataClass, netGuid) {
            var module = new ModuleClass(FriendClass, ModuleDataClass, netGuid);
            var muduleType = ModuleClass.name;
            if (this.moduleMapType[muduleType] != null) {
                oTrace("Module is repetitive! ModuleName=" + muduleType); //模块重复注册
                return null;
            }
            else {
                this.moduleMapType[muduleType] = module;
                this.moduleArr.push(module);
                return module;
            }
        }
        /**
         * 根据类型获取一个模块
         * @param ModuleClass 模块类型
         * @returns 模块
         */
        getModule(ModuleClass) {
            var key = ModuleClass.name;
            if (this.moduleMapType.hasOwnProperty(key)) {
                return this.moduleMapType[key];
            }
            return null;
        }
        //刷新
        update(dt) {
            for (let i = 0; i < this.moduleArr.length; i++) {
                this.moduleArr[i].onUpdate(dt);
            }
        }
        /**唤醒所有模块 */
        awakeAllModule() {
            this.forEachModule((moudle) => {
                moudle.onAwake();
            });
        }
        /**启动所有模块 */
        startAllModule() {
            this.forEachModule((moudle) => {
                this.startModule(moudle);
            });
            TimeUtil.onEnterFrame.add(this.update, this);
        }
        //启动一个模块
        startModule(module) {
            if (module instanceof ModuleC) {
                module.registerToNet();
            }
            module.onStart();
        }
        /**
         * 所有模块等待资源
         * @param sceneType 场景类型
         */
        async waitAssetAllModule(sceneType) {
            if (GamePlay__default$1["default"].IsClient()) {
                for (let i = 0; i < this.moduleArr.length; i++) {
                    await this.moduleArr[i]["onWaitAsset"]();
                }
            }
        }
        /**
         * 所有模块模块进入场景
         * @param sceneType 场景类型
         */
        enterSceneAllModule(sceneType) {
            if (GamePlay__default$1["default"].IsClient()) {
                this.forEachModule((moudle) => {
                    moudle["onEnterScene"]();
                });
            }
        }
        /**销毁所有模块 */
        destroyAllModule() {
            this.forEachModule((moudle) => {
                moudle.onDestroy();
            });
            TimeUtil.onEnterFrame.remove(this.update, this);
        }
        /**
         * 遍历所有模块
         * @param executer 每个模块执行的方法
         */
        forEachModule(executer) {
            for (let i = 0; i < this.moduleArr.length; i++) {
                executer(this.moduleArr[i]);
            }
        }
    };
    exports.ModuleManager = ModuleManager_1 = __decorate([
        Singleton()
    ], exports.ModuleManager);

    class Sound {
        static volumeScale = 1; //音量缩放
        onComplete = new Action();
        playId; //唯一id
        targetGuid; //依附的GameObject的guid
        _resId;
        go;
        _isDone = true;
        _isError = false;
        loopNum; //循环次数
        _volume; //音量
        constructor(resId) {
            if (resId != null) {
                let go = MWCore__default$1["default"].GameObject.SpawnGameObject(resId); //同步
                if (go == null) {
                    oTraceError("Sound: Build Sound Fild! resId=" + resId);
                    this._isError = true;
                    return;
                }
                this.init(go, resId);
            }
        }
        init(go, resId) {
            this._resId = resId;
            this.go = go;
            this.go.VolumeMultiplier = 0;
            this.go.StopVoice();
            this.go.OnSoundFinishDelegate.Add(() => {
                //此处需要验证 如果设置了循环，是否每次播放到头都会抛出事件(经验证，循环的声音每次结束都会收到这个事件)
                this.loopNum--;
                if (this.loopNum == 0) {
                    this.stop();
                    this.onComplete.call();
                }
            });
            return this;
        }
        play(loopNum = 1, volume = 1) {
            this.targetGuid = null;
            this.loopNum = loopNum;
            this.go.SetAllowSpatializationAndUISoundAndLoop(false, true, loopNum == 0 || loopNum > 1);
            this.go.PlayVoice();
            this._isDone = false;
            this.volume = volume;
        }
        playInTarget(target, loopNum = 1, volume = 1) {
            this.targetGuid = target.guid;
            this.go.AttachToGameObject(target);
            this.go.SetRelativeLocation(Type__default$1["default"].Vector.ZERO);
            this.play3D(loopNum, volume);
        }
        playInPos(pos, loopNum = 1, volume = 1) {
            this.targetGuid = null;
            this.go.DetachFromGameObject();
            this.go.location = pos;
            this.play3D(loopNum, volume);
        }
        play3D(loopNum, volume) {
            this.loopNum = loopNum;
            this.go.SetAllowSpatializationAndUISoundAndLoop(true, false, loopNum == 0 || loopNum > 1);
            this.go.SetSoundSphere(1000, 1, false, GamePlay__default$1["default"].MWAttenuationDistanceModel.Linear);
            this.volume = volume;
            this.go.PlayVoice();
            this._isDone = false;
        }
        stop() {
            this._isDone = true;
            this.clear();
        }
        clear() {
            this.go.DetachFromGameObject();
            this.go.StopVoice();
            this.targetGuid = null;
            this.playId = 0;
        }
        set volume(value) {
            this._volume = value;
            this.go.VolumeMultiplier = value * Sound.volumeScale;
        }
        get volume() {
            return this._volume;
        }
        get resId() {
            return this._resId;
        }
        get isDone() {
            return this._isDone;
        }
        get isError() {
            return this._isError;
        }
        clone() {
            let go = this.go.Clone();
            let sound = new Sound(this._resId);
            return sound.init(go, this._resId);
        }
    }

    var SoundManager_1;
    //声音管理
    exports.SoundManager = SoundManager_1 = class SoundManager {
        static instance;
        constructor() { this.init(); }
        destroy() {
            SoundManager_1.instance = null;
        }
        currentPlayId = 0;
        preloadSoundDatas = []; //需要预先加载的声音数据
        soundMap = new Map(); //<guid, Sound> 源声音，对象池从这里取，UI声音只播放这一份
        pool = new Map(); //<guid, [sound, ...]>
        playingSound = [];
        bgm;
        //private SoundMa:number = 1;//服务器播放声音的标记，用于关闭声音
        init() {
            if (GamePlay__default$1["default"].IsClient()) {
                TimeUtil.onEnterFrame.add(this.update, this);
                exports.NetManager.instance.registerFun(this.playSound, this);
                exports.NetManager.instance.registerFun(this.stopSound, this);
                exports.NetManager.instance.registerFun(this.net_play3DSoundHandle, this);
                exports.NetManager.instance.registerFun(this.stop3DSound, this);
            }
        }
        /**
         * 注册预加载声音(框架方法，请勿调用)
         * @param resName 自己定义的资源名称,加载失败的时候报错用
         * @param resId 资源id
         */
        registerPreload(resName, resId) {
            if (resName == null)
                resName = resId;
            this.preloadSoundDatas.push({ resName: resName, resId: resId });
        }
        /**
         * 预加载所有声音资源(框架方法，请勿调用)
         * @param passFail 有错误是否报出来
         * @returns 是否全部成功
         */
        preloadSound() {
            return new Promise((resolve) => {
                let num = 1;
                let isLose = false;
                for (let i = 0; i < this.preloadSoundDatas.length; i++) {
                    let soundData = this.preloadSoundDatas[i];
                    oTrace("Load sound.[" + num + "/" + this.preloadSoundDatas.length + "]     resName=" + soundData.resName + " resId=" + soundData.resId);
                    let sound = new Sound(soundData.resId);
                    if (sound.isError) {
                        oTrace("    Fail");
                        isLose = true;
                        break;
                    }
                    this.soundMap.set(soundData.resId, sound);
                    oTrace("    Success");
                    num++;
                }
                if (!isLose)
                    return resolve(true);
            });
        }
        /**
         * 根据资源id播放声音（可双端调用，不可叠加)
         * @param resId 资源id
         * @param loopNum 循环次数(0无限)
         * @param volume 音量
         * @returns 声音对象
         */
        playSound(resId, loopNum = 1, volume = 1) {
            if (GamePlay__default$1["default"].IsServer()) {
                exports.NetManager.instance.callWorldClientFun(this.playSound, resId, loopNum, volume);
            }
            else {
                let sound = this.getSound(resId);
                if (sound != null) {
                    sound.play(loopNum, volume);
                }
            }
        }
        /**
         * 根据资源id停止声音
         * @param resId 资源id
         */
        stopSound(resId) {
            if (GamePlay__default$1["default"].IsServer()) {
                exports.NetManager.instance.callWorldClientFun(this.stopSound, resId);
            }
            else {
                let sound = this.getSound(resId, false);
                if (sound != null)
                    sound.stop();
            }
        }
        /**
         * 播放背景音乐（可双端调用)
         * @param resId 资源id
         * @param volume 音量
         */
        playBGM(resId, volume = 1) {
            if (GamePlay__default$1["default"].IsServer()) {
                exports.NetManager.instance.callWorldClientFun(this.playBGM, resId, volume);
            }
            else {
                this.stopBGM();
                this.bgm = this.getSound(resId);
                if (this.bgm != null)
                    this.bgm.play(0, volume);
            }
        }
        /**
         * 停止背景音乐（可双端调用)
         */
        stopBGM() {
            if (GamePlay__default$1["default"].IsServer()) {
                exports.NetManager.instance.callWorldClientFun(this.stopBGM);
            }
            else if (this.bgm != null) {
                this.bgm.stop();
                this.bgm = null;
            }
        }
        /**
         * 在目标播放3D音效（可双端调用)
         * @param resId 资源id
         * @param target 播放目标 (GameObject的guid | GameObject | 世界坐标)
         * @param loopNum 循环次数
         * @param volume 音量
         * @returns 播放id，播放声音的唯一标识，可用于停止声音
         */
        play3DSound(resId, target, loopNum = 1, volume = 1) {
            let playId = this.getNewPlayId();
            this.net_play3DSoundHandle(resId, target, loopNum, volume, playId);
            return playId;
        }
        net_play3DSoundHandle(resId, target, loopNum = 1, volume = 1, playId = 0) {
            if (GamePlay__default$1["default"].IsServer()) {
                if (target instanceof MWCore__default$1["default"].GameObject)
                    exports.NetManager.instance.callWorldClientFun(this.net_play3DSoundHandle, resId, target.guid, loopNum, volume, playId);
                else
                    exports.NetManager.instance.callWorldClientFun(this.net_play3DSoundHandle, resId, target, loopNum, volume, playId);
            }
            else {
                let sound = this.spawn3DSound(resId);
                if (sound == null)
                    return null;
                sound.playId = playId;
                if (target instanceof MWCore__default$1["default"].GameObject) {
                    sound.playInTarget(target, loopNum, volume);
                }
                else if (target instanceof Type__default$1["default"].Vector) {
                    sound.playInPos(target, loopNum, volume);
                }
                else {
                    target = MWCore__default$1["default"].GameObject.Find(target);
                    if (target != null) {
                        sound.playInTarget(target, loopNum, volume);
                    }
                }
            }
        }
        /**
         * 停止3D声音（可双端调用)
         * @param playId 播放id
         */
        stop3DSound(playId) {
            if (GamePlay__default$1["default"].IsServer()) {
                exports.NetManager.instance.callWorldClientFun(this.stop3DSound, playId);
            }
            else {
                let targetSound = this.playingSound.find((ele) => { return ele.playId == playId; });
                if (targetSound != null)
                    targetSound.stop();
            }
        }
        /**
         * 音量(Client Only)
         */
        set volumeScale(value) {
            if (GamePlay__default$1["default"].IsServer())
                return;
            Sound.volumeScale = value;
            for (let i = 0; i < this.playingSound.length; i++) {
                this.playingSound[i].volume = this.playingSound[i].volume;
            }
            for (let [name, sound] of this.soundMap) {
                sound.volume = sound.volume;
            }
            if (this.bgm != null) {
                this.bgm.volume = this.bgm.volume;
            }
        }
        /**
         * 音量(Client Only)
         */
        get volumeScale() {
            if (GamePlay__default$1["default"].IsServer())
                return 0;
            return Sound.volumeScale;
        }
        update(dt) {
            for (let i = 0; i < this.playingSound.length;) {
                let sound = this.playingSound[i];
                if (sound.isDone) {
                    this.return3DSound(sound);
                    this.playingSound.splice(i, 1);
                }
                else {
                    i++;
                }
            }
        }
        //获取一个音效(如果没有，则创建)
        getSound(resId, creat = true) {
            if (!this.soundMap.has(resId)) {
                if (!creat)
                    return null;
                this.soundMap.set(resId, new Sound(resId));
            }
            let sound = this.soundMap.get(resId);
            if (sound.isError) {
                oTrace("There's something wrong with the sound! resId=" + resId);
                return null;
            }
            return sound;
        }
        //生成一个新的播放id
        getNewPlayId() {
            if (GamePlay__default$1["default"].IsServer())
                return ++this.currentPlayId;
            return --this.currentPlayId;
        }
        //孵化3D音效
        spawn3DSound(resId) {
            if (!this.pool.has(resId)) {
                this.pool.set(resId, []);
            }
            let sound = null;
            if (this.pool.get(resId).length == 0) {
                sound = this.getSound(resId).clone();
            }
            else {
                sound = this.pool.get(resId).shift();
            }
            this.playingSound.push(sound);
            return sound;
        }
        //归还3D音效
        return3DSound(sound) {
            if (sound == null || !this.pool.has(sound.resId))
                return;
            this.pool.get(sound.resId).push(sound);
        }
    };
    exports.SoundManager = SoundManager_1 = __decorate([
        Singleton()
    ], exports.SoundManager);

    //GameObject的节点结构
    class GoNode {
        name;
        guid;
        children;
        /**
         * 获取一个GameObject的根节点
         * @param go GameObject
         * @returns 根节点
         */
        static get(go) {
            if (go == null)
                return null;
            let node = { name: go.name, guid: go.GetGuid(), children: [] };
            let children = go.GetChildren();
            for (let i = 0; i < children.length; i++) {
                let childNode = this.get(children[i]);
                node.children.push(childNode);
            }
            return node;
        }
        /**
         * 根据名字获取节点的一个子节点
         * @param goNode 目标节点
         * @param name 名字
         * @returns 子节点
         */
        static getChildByName(goNode, name) {
            for (let i = 0; i < goNode.children.length; i++) {
                if (goNode.children[i].name == name) {
                    return goNode.children[i];
                }
            }
            return null;
        }
        /**
         * 根据名字获取节点的所有同名子节点
         * @param goNode 目标节点
         * @param name 名字
         * @returns 子节点序列
         */
        static getChildrenByName(goNode, name) {
            let arr = [];
            for (let i = 0; i < goNode.children.length; i++) {
                if (goNode.children[i].name == name) {
                    arr.push(goNode.children[i]);
                }
            }
            return arr;
        }
        /**
         * 根据guid获取节点的一个子节点
         * @param goNode 目标节点
         * @param guid guid
         * @returns 子节点
         */
        static getChildByGuid(goNode, guid) {
            for (let i = 0; i < goNode.children.length; i++) {
                if (goNode.children[i].guid == guid) {
                    return goNode.children[i];
                }
            }
            return null;
        }
        /**
         * 根据路径获取节点的一个子节点
         * @param goNode 目标节点
         * @param path 路径
         * @returns 子节点
         */
        static getChildByPath(goNode, path) {
            let arr = path.split('/');
            let currentNode = goNode;
            for (let i = 0; i < arr.length; i++) {
                currentNode = this.getChildByName(currentNode, arr[i]);
                if (currentNode == null)
                    return null;
                if (i == arr.length - 1)
                    return currentNode;
            }
        }
        /**
         * 获取节点某个路径下的所有子节点
         * @param goNode 目标节点
         * @param path 路径
         * @returns 子节点序列
         */
        static getChildrenByPath(goNode, path) {
            let arr = path.split('/');
            let currentNode = goNode;
            for (let i = 0; i < arr.length; i++) {
                if (i == arr.length - 1) {
                    return this.getChildrenByName(currentNode, arr[i]);
                }
                currentNode = this.getChildByName(currentNode, arr[i]);
                if (currentNode == null)
                    return null;
            }
        }
        /**
         * 生成节点的树形结构字符串
         * @param goNode 目标节点
         * @returns 树形字符串
         */
        static getString(goNode) {
            return this.getStringHandle(goNode, 0);
        }
        static getStringHandle(goNode, depth = 0) {
            let str = '\n';
            for (let i = 0; i < depth; i++) {
                str += "  ";
            }
            str += goNode.name;
            for (let i = 0; i < goNode.children.length; i++) {
                str += GoNode.getStringHandle(goNode.children[i], depth + 1);
            }
            return str;
        }
    }

    var ResManager_1;
    exports.ResManager = ResManager_1 = class ResManager {
        static instance;
        constructor() { }
        destroy() {
            ResManager_1.instance = null;
        }
        _isInit = false;
        /**
         * 初始化，不要私自调用
         */
        init() {
            if (this._isInit)
                return;
            this._isInit = true;
            if (GamePlay__default$1["default"].IsServer()) {
                exports.NetManager.instance.registerFun(this.netServerGetGameObjectNodeTreeByPath, this);
                exports.NetManager.instance.registerFun(this.netServerGetGameObjectNodeTreeByGuid, this);
                exports.NetManager.instance.registerFun(this.netServerGetGameObjectGuid, this);
                exports.NetManager.instance.registerFun(this.getChildGuidFromGo, this);
                exports.NetManager.instance.registerFun(this.getScriptGuidFromGo, this);
                exports.NetManager.instance.registerFun(this.findChildFromGo, this);
                exports.NetManager.instance.registerFun(this.findScriptFromGo, this);
            }
        }
        /**
         * 获取一个GameObject的节点结构(异步，双端调用)
         * @param guid gameObject的guid
         * @returns 节点树结构
         */
        async loadGoNode(guid) {
            if (GamePlay__default$1["default"].IsServer()) {
                return this.netServerGetGameObjectNodeTreeByGuid(guid);
            }
            else {
                let goNode = await exports.NetManager.instance.callServerFun(this.netServerGetGameObjectNodeTreeByGuid, guid);
                if (goNode == null)
                    return null;
                let res = await this.gameObjectIsOK(goNode);
                return res ? goNode : null;
            }
        }
        /**
         * 根据路径查找场景中一个GameObject(异步，双端调用)
         * @param path 节点路径
         * @param waitTime 等待时间(单位：毫秒)
         * @returns GameObject
         */
        async findGameObjectByPath(path, waitTime = 10000) {
            let guid;
            if (GamePlay__default$1["default"].IsClient()) {
                guid = await exports.NetManager.instance.callServerFun(this.netServerGetGameObjectGuid, path);
            }
            else {
                guid = this.netServerGetGameObjectGuid(path);
            }
            if (guid == null)
                return null;
            return this.findGameObjectByGuid(guid, waitTime);
        }
        /**
         * 根据guid查找场景中一个GameObject(异步，双端调用)
         * @param guid guid
         * @param waitTime 等待时间(单位：毫秒)
         * @returns GameObject
         */
        async findGameObjectByGuid(guid, waitTime = 10000) {
            let go = MWCore__default$1["default"].GameObject.Find(guid);
            if (go != null)
                return go;
            return new Promise((resolve) => {
                let tickTime = 100;
                let id = setInterval(() => {
                    go = MWCore__default$1["default"].GameObject.Find(guid);
                    waitTime -= tickTime;
                    if (go != null || waitTime <= 0) {
                        clearInterval(id);
                        resolve(go);
                    }
                }, tickTime);
            });
        }
        /**
         * 根据guid查找场景中一个脚本(异步，双端调用)
         * @param guid guid
         * @param waitTime 等待时间(毫秒)
         * @returns 脚本
         */
        async findScriptByGuid(guid, waitTime = 10000) {
            let sp = MWCore__default$1["default"].MWScriptManager.FindScript(guid);
            if (sp != null)
                return sp;
            return new Promise((resolve) => {
                let tickTime = 100;
                let id = setInterval(() => {
                    sp = MWCore__default$1["default"].MWScriptManager.FindScript(guid);
                    waitTime -= tickTime;
                    if (sp != null || waitTime <= 0) {
                        clearInterval(id);
                        resolve(sp);
                    }
                }, tickTime);
            });
        }
        //等待GameObject的所有节点就绪
        async gameObjectIsOK(nodeTree) {
            return new Promise((resolve) => {
                let time = 0;
                let arr = [nodeTree];
                let id = setInterval(() => {
                    time += 100;
                    while (arr.length > 0) {
                        let node = arr[0];
                        let guid = node.guid;
                        let go = MWCore__default$1["default"].GameObject.Find(guid);
                        if (go != null) {
                            for (let i = 0; node.children != null && i < node.children.length; i++) {
                                arr.push(node.children[i]);
                            }
                            arr.shift();
                        }
                        else {
                            break;
                        }
                    }
                    if (arr.length == 0) {
                        clearInterval(id);
                        resolve(true);
                    }
                    else if (time > 10000) { //找1秒（10次）,如果还是找不到就算了
                        resolve(false);
                    }
                }, 100);
            });
        }
        //根据路径获取GameObject的节点数据(Only Server)
        netServerGetGameObjectNodeTreeByPath(path) {
            if (!GamePlay__default$1["default"].IsServer())
                return null;
            let go = this.getMWGameObject(path);
            if (go == null)
                return;
            return GoNode.get(go);
        }
        //根据路径获取GameObject的节点数据(Only Server)
        netServerGetGameObjectNodeTreeByGuid(guid) {
            if (!GamePlay__default$1["default"].IsServer())
                return null;
            let go = MWCore__default$1["default"].GameObject.Find(guid);
            if (go == null)
                return;
            return GoNode.get(go);
        }
        //根据路径获取GameObject的GUID(Only Server)
        netServerGetGameObjectGuid(path) {
            if (!GamePlay__default$1["default"].IsServer())
                return null;
            let go = this.getMWGameObject(path);
            if (go != null)
                return go.guid;
            return null;
        }
        //按路径获取GameObject(Only Server)
        getMWGameObject(path) {
            if (!GamePlay__default$1["default"].IsServer())
                return null;
            if (path.indexOf('/') == -1) {
                let name = path;
                return this.getRootMWGameObject(name);
            }
            else {
                let pathCells = path.split('/');
                let name = pathCells.shift();
                let go = this.getRootMWGameObject(name);
                if (go == null) {
                    return null;
                }
                for (let i = 0; i < pathCells.length; i++) {
                    go = go.GetChildByName(pathCells[i]);
                    if (go == null) {
                        return null;
                    }
                }
                return go;
            }
        }
        //获取根节点下的GameObject(Only Server)
        getRootMWGameObject(name) {
            let gos = MWCore__default$1["default"].GameObject.GetGameObjectsByName(name);
            for (let i = 0; i < gos.length; i++) {
                if (gos[i].parent == null) {
                    return gos[i];
                }
            }
            return null;
        }
        /**
         * 从GameObject获取子对象的guid (异步，双端调用)
         * @param targetGo 目标gameObject
         * @param path 节点路径
         * @returns guid
         */
        async getChildGuidFromGo(targetGo, path) {
            if (StringUtil.isEmpty(path))
                return null;
            let targetGuid = this.getGoGuid(targetGo);
            if (GamePlay__default$1["default"].IsClient()) {
                return await exports.NetManager.instance.callServerFun(this.getChildGuidFromGo, targetGuid, path);
            }
            let arr = path.split('/');
            const maxFindTimes = 10;
            let findTimes = maxFindTimes; //找的次数
            let i = -1; //需要先找到GameObject，所以是-1
            let go = null;
            if (targetGo instanceof MWCore__default$1["default"].GameObject) {
                go = targetGo;
                i = 0;
            }
            return new Promise((resolve) => {
                let id = setInterval(() => {
                    let findRes = null;
                    if (i == -1) {
                        findRes = MWCore__default$1["default"].GameObject.Find(targetGuid);
                    }
                    else if (arr[i] == '..') {
                        findRes = go.parent;
                    }
                    else {
                        findRes = go.GetChildByName(arr[i]);
                    }
                    if (findRes != null) {
                        go = findRes;
                        i++;
                        findTimes = maxFindTimes;
                    }
                    else {
                        findTimes--;
                        oTraceError("ResManager.getChildGameObjectGuid file!   path=" + path + "   times=" + (maxFindTimes - findTimes));
                    }
                    if (i >= arr.length || findTimes == 0) {
                        clearInterval(id);
                        resolve(findTimes == 0 ? null : go.guid);
                    }
                }, 300);
            });
        }
        //从一个GameObject中获取脚本的guid
        async getScriptGuidFromGo(targetGo, path) {
            if (StringUtil.isEmpty(path))
                return null;
            let targetGuid = this.getGoGuid(targetGo);
            if (GamePlay__default$1["default"].IsClient()) {
                return await exports.NetManager.instance.callServerFun(this.getScriptGuidFromGo, targetGuid, path);
            }
            let arr = path.split('/');
            const maxFindTimes = 10;
            let findTimes = maxFindTimes; //找的次数
            let i = -1; //需要先找到GameObject，所以是-1
            let go = null;
            let sp = null;
            if (targetGo instanceof MWCore__default$1["default"].GameObject) {
                go = targetGo;
                i = 0;
            }
            return new Promise((resolve) => {
                let id = setInterval(() => {
                    let findRes = null;
                    if (i == arr.length - 1) {
                        if (arr[i].endsWith('.ts'))
                            sp = go.GetScriptByName(arr[i]);
                        else
                            sp = go.GetScriptByName(`${arr[i]}.ts`);
                    }
                    else if (i == -1) {
                        findRes = MWCore__default$1["default"].GameObject.Find(targetGuid);
                    }
                    else if (arr[i] == '..') {
                        findRes = go.parent;
                    }
                    else {
                        findRes = go.GetChildByName(arr[i]);
                    }
                    if (findRes != null) {
                        go = findRes;
                        i++;
                        findTimes = maxFindTimes;
                    }
                    else {
                        findTimes--;
                        oTraceError("ResManager.getChildScriptGuid file!   path=" + path + "   times=" + (maxFindTimes - findTimes));
                    }
                    if (sp != null || findTimes == 0) {
                        clearInterval(id);
                        resolve(findTimes == 0 ? null : sp.guid);
                    }
                }, 100);
            });
        }
        /**
         * 根据路径从GameObject中查找一个子GameObject (异步 双端)
         * @param targetGo 目标GameObject
         * @param path 路径
         * @returns 子GameObject
         */
        async findChildFromGo(targetGo, path) {
            let targetGuid = this.getGoGuid(targetGo);
            let guid = await this.getChildGuidFromGo(targetGuid, path);
            if (guid == null) {
                oTraceError("ResManager.findChild: findChild fail!   path=" + path);
                return null;
            }
            return this.findGameObjectByGuid(guid);
        }
        /**
         * 根据路径从GameObject中查找一个脚本 (异步 双端)
         * @param targetGo 目标GameObject
         * @param path 路径
         * @returns 脚本对象
         */
        async findScriptFromGo(targetGo, path) {
            let targetGuid = this.getGoGuid(targetGo);
            let guid = await this.getScriptGuidFromGo(targetGuid, path);
            if (guid == null) {
                oTraceError("ResManager.findScript: findScript fail!   path=" + path);
                return null;
            }
            return this.findScriptByGuid(guid);
        }
        getGoGuid(targetGo) {
            if (targetGo instanceof MWCore__default$1["default"].GameObject) {
                return targetGo.guid;
            }
            return targetGo;
        }
    };
    exports.ResManager = ResManager_1 = __decorate([
        Singleton()
    ], exports.ResManager);

    var InputManager_1;
    exports.InputManager = InputManager_1 = class InputManager {
        static instance;
        constructor() { this.init(); }
        destroy() {
            InputManager_1.instance = null;
        }
        _onTouch;
        touchInput;
        beginMulFun;
        keyDownActionMap;
        init() {
            if (GamePlay__default$1["default"].IsServer())
                return;
            this._onTouch = new Action1();
            this.keyDownActionMap = new Map();
            this._onTouch.setCountChangeCallback((count) => {
                if (count == 1) {
                    if (this.touchInput == null) {
                        this.beginMulFun = this.touchBegin.bind(this);
                        this.initTouch();
                    }
                    this.touchInput.TouchBeginMulDele.Add(this.beginMulFun);
                }
                else if (count = 0) {
                    this.touchInput.TouchBeginMulDele.Remove(this.beginMulFun);
                }
            });
        }
        /**
         * 鼠标点击触发，返回点击的所有结果
         */
        get onTouch() {
            return this._onTouch;
        }
        /**
         * 按下键盘事件(增加了重复监听的判断，还可以移除监听方法)
         * @param key 按键类型
         * @returns 监听的Action方法
         */
        onKeyDown(key) {
            if (!this.keyDownActionMap.has(key)) {
                this.keyDownActionMap.set(key, new Action());
                Events__default$1["default"].OnKeyDown(key, () => {
                    this.keyDownActionMap.get(key).call(key);
                });
            }
            let action = this.keyDownActionMap.get(key);
            if (action.count > 0)
                return null;
            return action;
        }
        initTouch() {
            if (this.touchInput != null)
                return;
            this.touchInput = new GamePlay__default$1["default"].SysTouchInput();
            GamePlay__default$1["default"].AsyncGetCurrentPlayer().then(player => {
                this.touchInput.SetPlayerController();
            });
        }
        touchBegin() {
            let pos = this.touchInput.GetPlayerControllTouches()[0];
            let list = GamePlay__default$1["default"].GetClickGameobjectByScene(pos.x, pos.y, 50000, true, false);
            //this.log(list);
            let arr = [];
            for (let i = 0; list != null && i < list.length; i++) {
                if (arr.includes(list[i]))
                    continue;
                arr.push(list[i]);
            }
            if (list.length > 0) {
                this.onTouch.call(arr);
            }
        }
        log(list) {
            oTrace("------------Mouse Click……");
            for (let i = 0; list != null && i < list.length; i++) {
                oTrace("List: " + list[i].GameObject.GetName());
            }
        }
    };
    exports.InputManager = InputManager_1 = __decorate([
        Singleton()
    ], exports.InputManager);

    var BehaviourManager_1;
    exports.BehaviourManager = BehaviourManager_1 = class BehaviourManager {
        static instance;
        constructor() { }
        destroy() {
            TimeUtil.onEnterFrame.remove(this.update, this);
            BehaviourManager_1.instance = null;
        }
        registerList = [];
        behaviourMap = new Map();
        init() {
            TimeUtil.onEnterFrame.add(this.update, this);
        }
        addComponent(target, BehaviourClass) {
            let behaviour = new BehaviourClass(target);
            let targetGuid = behaviour.targetGuid;
            if (!this.behaviourMap.has(targetGuid)) {
                this.behaviourMap.set(targetGuid, []);
            }
            behaviour.onAwake();
            this.registerList.push(behaviour);
            this.behaviourMap.get(targetGuid).push(behaviour);
            return behaviour;
        }
        getComponent(target, BehaviourClass) {
            let targetGuid = target.guid;
            if (!this.behaviourMap.has(targetGuid))
                return;
            let arr = this.behaviourMap.get(targetGuid);
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] instanceof BehaviourClass) {
                    return arr[i];
                }
            }
            return null;
        }
        deleteComponent(behaviour) {
            let targetGuid = behaviour.targetGuid;
            if (!this.behaviourMap.has(targetGuid))
                return;
            let arr = this.behaviourMap.get(targetGuid);
            let index = arr.indexOf(behaviour);
            arr.splice(index, 1);
            if (arr.length == 0) {
                this.behaviourMap.delete(targetGuid);
            }
        }
        clearComponent(go) {
            let guid = go.guid;
            if (!this.behaviourMap.has(guid)) {
                return;
            }
            let arr = this.behaviourMap.get(guid);
            for (let i = 0; i < arr.length; i++) {
                arr[i].onDestroy();
            }
            this.behaviourMap.delete(guid);
            for (let i = 0; i < this.registerList.length;) {
                if (this.registerList[i].gameObject == go) {
                    this.registerList.splice(i, 1);
                }
                else {
                    i++;
                }
            }
        }
        update(dt) {
            if (this.registerList.length > 0) {
                for (let i = 0; i < this.registerList.length; i++) {
                    this.registerList[i].onStart();
                }
                this.registerList.length = 0;
            }
            this.behaviourMap.forEach((behaviourArr) => {
                for (let i = 0; i < behaviourArr.length; i++) {
                    if (behaviourArr[i].updateEnable) {
                        behaviourArr[i].onUpdate(dt);
                    }
                }
            });
        }
    };
    exports.BehaviourManager = BehaviourManager_1 = __decorate([
        Singleton()
    ], exports.BehaviourManager);

    //预加载资源
    class PreloadRes {
        static GameObjectPaths = [];
        /**
         * 注册预等待的gameObejct的路径
         * @param path 路径
         */
        static addWaitGameObject(pathArr) {
            if (GamePlay__default$1["default"].IsServer())
                return;
            for (let i = 0; i < pathArr.length; i++) {
                this.GameObjectPaths.push(pathArr[i]);
            }
        }
        //注册预加载的声音
        static addSound(soundDataArr) {
            for (let i = 0; i < soundDataArr.length; i++) {
                exports.SoundManager.instance.registerPreload(soundDataArr[i].resName, soundDataArr[i].resId);
            }
        }
        //注册预加载的特效
        static addEffect(effectDataArr) {
            for (let i = 0; i < effectDataArr.length; i++) {
                exports.EffectManager.instance.registerPreload(effectDataArr[i].resName, effectDataArr[i].resId, effectDataArr[i].time);
            }
        }
        //注册所有需要预等待的GameObject
        static async findAllPrewaitGameObject() {
            while (this.GameObjectPaths.length > 0) {
                let path = this.GameObjectPaths.shift();
                oTrace(`Wait GameObject  path = ${path}`);
                let go = await exports.ResManager.instance.findGameObjectByPath(path, Number.MAX_VALUE);
                if (go == null) {
                    oTrace("    Fail");
                    return false;
                }
                else {
                    oTrace("    Success");
                }
            }
            return true;
        }
    }

    /**
     * 批量Events监听处理
     * 可以将一批注册的事件同时激活或屏蔽
     */
    class EventListenerBatch {
        _active;
        addMap = new Map();
        listenerMap = new Map();
        /**
         * 注册监听事件
         * @param eventName 事件名
         * @param callback 监听方法
         */
        add(eventName, callback) {
            this.addMap.set(eventName, callback);
        }
        /**
         * 移除监听事件
         * @param eventName 事件名
         */
        remove(eventName) {
            if (this.addMap.has(eventName)) {
                this.addMap.delete(eventName);
            }
            if (this.listenerMap.has(eventName)) {
                this.listenerMap.delete(eventName);
            }
        }
        /**
         * 清理所有监听事件
         */
        clear() {
            this.active = false;
            this.addMap.clear();
        }
        /**是否生效*/
        set active(value) {
            if (this._active == value)
                return;
            this._active = value;
            if (value) {
                this.addMap.forEach((callback, eventName) => {
                    let listener = Events__default$1["default"].AddLocalListener(eventName, callback);
                    this.listenerMap.set(eventName, listener);
                });
            }
            else {
                this.listenerMap.forEach((listener) => {
                    listener.Disconnect();
                });
                this.listenerMap.clear();
            }
        }
        /**是否生效*/
        get active() {
            return this._active;
        }
    }

    //UI的层级
    exports.UILayer = void 0;
    (function (UILayer) {
        UILayer[UILayer["Bottom"] = 0] = "Bottom";
        UILayer[UILayer["Middle"] = 1] = "Middle";
        UILayer[UILayer["Own"] = 2] = "Own";
        UILayer[UILayer["Top"] = 3] = "Top"; //顶层
    })(exports.UILayer || (exports.UILayer = {}));

    //挂载在ui文件上的UIpanel
    class PanelBase extends MWGameUI__default$1["default"].MWUIBehaviour {
        uiPrefab = null;
        _visible = true;
        _eventListener;
        isEnabel = false;
        /**
         * 根据prefab路径，创建一个Panel
         * @param prefabPath ui文件的路径
         * @returns Panel
         */
        static creat(prefabPath) {
            oTrace(`PanelBase: Load UIPrefab prefabPath=${prefabPath}`);
            let uiPrefab = MWGameUI__default$1["default"].CreateUIPrefabByName(prefabPath); //这个加载是同步的，prefab上的脚本也会同步创建（直接构造）
            if (uiPrefab != null) {
                let panel = MWGameUI__default$1["default"].FindUIWidgetScript(uiPrefab);
                if (panel != null && (panel instanceof PanelBase)) {
                    oTrace('    Load Panel Success!');
                    return panel;
                }
                oTraceError('    Load Panel Script Fail');
            }
            else {
                oTraceError('    Load Panel Load Fail');
            }
            return null;
        }
        OnInitialized() {
            //trace("OnInitialized " + this.constructor.name);
            this.uiPrefab = MWGameUI__default$1["default"].MWUIPanelWidget.Get(this.UIObject);
            this.onStart();
        }
        PreConstruct() {
            //trace("PreConstruct " + this.constructor.name);
        }
        //第一次显示调用
        Construct() {
            //trace("Construct " + this.constructor.name);
            if (this.canvas != null) {
                this.canvas.SetVisibility(MWGameUI__default$1["default"].ESlateVisibility.SelfHitTestInvisible);
            }
            TimeUtil.delayExecute(() => {
                this.onLayout();
            });
        }
        //销毁调用
        OnDestroy() {
            this.onDestroy();
        }
        /**
         * 根据节点路径查找一个界面元素
         * @param ObjClass 元素类型
         * @param path 节点路径
         * @returns 元素对象
         */
        findChildByPath(ObjClass, path) {
            let child = this.uiPrefab.FindChildByPath(path);
            if (child == null) {
                oTraceError('PanelBase: Child not found in panel!  path=' + path);
                return null;
            }
            let widget = ObjClass.Get(child);
            if (ObjClass.name == MWGameUI__default$1["default"].MWUIButton.name) {
                widget.SetFocusable(false); //设置了这个 按钮就不会按下后自动抛出抬起事件了
            }
            return widget;
        }
        //===================实现IPanel接口==================
        //获取画布
        get canvas() { return this.UIObjectAS().GetRootContent(); }
        get uiObject() { return this.UIObject; }
        //可见性
        set visible(value) {
            this._visible = value;
            this.uiPrefab.SetVisibility(value ? MWGameUI__default$1["default"].ESlateVisibility.SelfHitTestInvisible : MWGameUI__default$1["default"].ESlateVisibility.Collapsed);
        }
        //可见性
        get visible() { return this._visible; }
        //显示Panel
        show(...params) {
            if (!this.isShow) {
                UI.instance.addChild(this, this.getLayer());
                this.onShow(...params);
            }
        }
        //关闭Panel
        close() {
            if (this.isShow) {
                UI.instance.removeChild(this);
                this.onHide();
            }
        }
        //==================================================
        /**是否处于显示状态*/
        get isShow() { return UI.instance.panelIsShow(this); }
        /**名字*/
        get name() { return this.constructor.name; }
        /**事件批处理*/
        get localEventListener() {
            if (this._eventListener == null)
                this._eventListener = new EventListenerBatch();
            return this._eventListener;
        }
        /**
         * 获取这个Panle应该显示在的UI层，默认在Middle层，如果想换层请复写这个方法
         * @returns UI层
         */
        getLayer() {
            return exports.UILayer.Middle;
        }
        /**销毁Panel */
        destroy() {
            this.uiObject.DestroyObject();
        }
        //启用(字符串调用)
        enable() {
            if (this.isEnabel)
                return;
            this.isEnabel = true;
            this.onEnable();
            TimeUtil.onEnterFrame.add(this.onUpdate, this);
        }
        //禁用(字符串调用)
        disable() {
            if (!this.isEnabel)
                return;
            this.isEnabel = false;
            this.onDisable();
            TimeUtil.onEnterFrame.remove(this.onUpdate, this);
        }
        //=====================生命周期=====================
        /**
         * 开始调用
         */
        onStart() { }
        /**
         * 局部完成调用，隐藏的对象不参与UI布局，所以要布局完成后再隐藏，这个方法就是布局完成后调用
         */
        onLayout() { }
        /**
         * 激活调用
         */
        onEnable() { }
        /**
         * 禁用调用
         */
        onDisable() { }
        /**
         * show调用
         * @param params show方法传递的参数
         */
        onShow(...params) { }
        /**
         * close调用
         */
        onHide() { }
        ;
        /**
         * 销毁调用
         */
        onDestroy() { }
        /**
         * 刷新调用
         * @param dt 帧间隔时间
         */
        onUpdate(dt) { }
    }

    //UI管理类，需要有类继承此类，并挂在场景的一个UI对象的上，作为UI的总节点
    class UI extends PanelBase {
        static _instance;
        static get instance() {
            return this._instance;
        }
        //图层的数据
        LayerMap = new Map([
            [exports.UILayer.Bottom, { startZ: 0, z: 0, panels: [] }],
            [exports.UILayer.Middle, { startZ: 100000, z: 0, panels: [] }],
            [exports.UILayer.Own, { startZ: 200000, z: 0, panels: [] }],
            [exports.UILayer.Top, { startZ: 300000, z: 0, panels: [] }],
        ]);
        creatPanleMap = new Map(); //所有创建过的Panle
        uniquePanel; //独占Panel
        constructor(obj) {
            super(obj);
            UI._instance = this;
        }
        //#region Public Method
        /**
         * 显示一个界面
         * @param panel 界面
         * @param layer 图层
         * @returns 显示的界面
         */
        addChild(panel, layer = exports.UILayer.Middle) {
            if (panel == null)
                return;
            if (panel.uiObject.GetParent() == null) {
                this.canvas.AddChild(panel.uiObject);
            }
            let beforLayerType = this.getPanelLayer(panel); //获取以前的层
            //如果是独享层
            if (layer == exports.UILayer.Own) {
                //卸载掉独享层别的Panel
                let panels = this.LayerMap.get(exports.UILayer.Own).panels;
                if (panels.length > 0) {
                    this.uniquePanel = null;
                    this.removeChild(panels[0]);
                }
                this.uniquePanel = panel;
                //隐藏Middle和Bottom的Panel
                this.setAllMiddleAndBottomPanelVisible(false);
            }
            //从以前的层删除
            if (beforLayerType != null && beforLayerType != layer) {
                let beforLayer = this.LayerMap.get(beforLayerType);
                let index = beforLayer.panels.indexOf(panel);
                beforLayer.panels.splice(index, 1);
            }
            let currentLayer = this.LayerMap.get(layer);
            if (!currentLayer.panels.includes(panel)) {
                currentLayer.panels.push(panel);
            }
            let z = currentLayer.startZ + currentLayer.z++;
            panel.uiObject.GetSlot().SetZOrder(z);
            if (panel.visible) {
                panel.uiObject.SetVisibility(MWGameUI__default$1["default"].ESlateVisibility.SelfHitTestInvisible);
            }
            this.layoutWidget(panel.uiObject); //每次都重新布局，因为屏幕尺寸可能会变
            if (beforLayerType == null) {
                panel["enable"]();
            }
            return panel;
        }
        /**
         * 移除一个显示的界面
         * @param panel 界面
         */
        removeChild(panel) {
            if (panel == null)
                return;
            // if(panel.UIObject.GetParent()){
            //     panel.UIObject.RemoveFromParent();
            // }
            let isSuccess = false;
            for (let [key, uiLayer] of this.LayerMap) {
                let index = uiLayer.panels.indexOf(panel);
                if (index != -1) {
                    uiLayer.panels.splice(index, 1);
                    panel.uiObject.SetVisibility(MWGameUI__default$1["default"].ESlateVisibility.Collapsed);
                    isSuccess = true;
                    break;
                }
            }
            if (!isSuccess)
                return;
            if (panel == this.uniquePanel) {
                this.setAllMiddleAndBottomPanelVisible(true);
                this.uniquePanel = null;
            }
            panel["disable"]();
        }
        /**
         * 打开一个界面
         * @param PanelClass 界面的类
         * @param prames 显示参数(这个参数可以传递给界面的onShow方法)
         */
        openPanel(PanelClass, ...prames) {
            this.getPanel(PanelClass).show(...prames);
        }
        /**
         * 关闭一个界面
         * @param PanelClass 界面的类
         */
        closePanel(PanelClass) {
            this.getPanel(PanelClass).close();
        }
        /**
         * 判断界面是否处于显示状态
         * @param panel 界面
         * @returns 是否显示
         */
        panelIsShow(panel) {
            if (panel == null)
                return false;
            return this.getPanelLayer(panel) != null;
        }
        //#endregion
        //#region Private Method
        /**
         * 显示loading(字符串调用)
         * @param msg 显示的提示内容
         * @param progress 进度条进度(0-1)
         * @param completeCallBack 完成回调
         */
        showLoading(msg, progress, completeCallBack) {
            this["enable"]();
            progress = Math.min(1, progress);
            this.onShowLoading(msg, progress, () => {
                if (completeCallBack != null) {
                    completeCallBack();
                }
                if (progress == 1) {
                    this["disable"]();
                    this.onHideLoading();
                }
            });
        }
        //获取预加载的Panel
        getPanel(PanelClass) {
            let name = PanelClass.name;
            if (!this.creatPanleMap.has(name)) {
                let panel = PanelClass["creat"]();
                this.creatPanleMap.set(name, panel);
            }
            return this.creatPanleMap.get(name);
        }
        //设置Middle和Bottom层所有Panle的可见性
        setAllMiddleAndBottomPanelVisible(value) {
            let panels = this.LayerMap.get(exports.UILayer.Middle).panels;
            for (let i = 0; i < panels.length; i++) {
                panels[i].visible = value;
            }
            panels = this.LayerMap.get(exports.UILayer.Bottom).panels;
            for (let i = 0; i < panels.length; i++) {
                panels[i].visible = value;
            }
        }
        //获取一个Panel所在的UI层
        getPanelLayer(panel) {
            for (let [key, value] of this.LayerMap) {
                if (value.panels.indexOf(panel) != -1)
                    return key;
            }
            return null;
        }
        //布局
        layoutWidget(widget) {
            let size = UI.getScreenSize();
            let scale = UI.getCanvasScale();
            size.x *= scale.x;
            size.y *= scale.y;
            widget.GetSlot().SetSize(size);
        }
        //#endregion
        //#region Static Method
        //======================以下为工具方法====================
        //画布尺寸
        static getCanvasSize() {
            return UI.instance.canvas.GetSlot().GetSize();
        }
        //屏幕尺寸
        static getScreenSize() {
            let x = { value: 0 };
            let y = { value: 0 };
            UI.getPlayerController().GetViewportSize(x, y);
            return new Type__default$1["default"].Vector2(x.value, y.value);
        }
        static getPlayerController() {
            return GamePlay__default$1["default"].GetCurrentPlayer().Character.Actor.GetPlayerController();
        }
        // 获取缩放比例
        static getCanvasScale() {
            let canvasSize = UI.getCanvasSize();
            let screenSize = UI.getScreenSize();
            return new Type__default$1["default"].Vector2(canvasSize.x / screenSize.x, canvasSize.y / screenSize.y);
        }
        /**
         * 获取屏幕尺寸
         * @returns 屏幕尺寸
         */
        static getStageSize() {
            let size = UI.getScreenSize();
            let scale = UI.getCanvasScale();
            size.x *= scale.x;
            size.y *= scale.y;
            return size;
        }
        /**
         * 将世界坐标转换到屏幕坐标
         * @param worldPos 世界坐标
         * @returns 屏幕坐标
         */
        static getCanvasPointByWorld(worldPos) {
            let p = { value: new UE__namespace.Vector2D(0, 0) };
            let pc = UI.getPlayerController();
            pc.ProjectWorldLocationToScreen(new UE__namespace.Vector(worldPos.x, worldPos.y, worldPos.z), p);
            let scale = UI.getCanvasScale();
            p.value.X *= scale.x;
            p.value.Y *= scale.y;
            return new Type__default$1["default"].Vector2(p.value.X, p.value.Y);
        }
    }

    //埋点工具
    class AnalyticsUtil {
        static NET_MSG_SEND_MGS = "NET_MSG_SEND_MGS";
        static comData; //通用数据
        static msgMap;
        /** 初始化
         * @param comData 公共数据(key-value)
         */
        static init() {
            if (this.msgMap != null)
                return;
            this.msgMap = new Map();
            if (GamePlay__default$1["default"].IsClient()) {
                Events__default$1["default"].AddServerListener(AnalyticsUtil.NET_MSG_SEND_MGS, (eventName, eventDesc, jsonData) => {
                    MWMGS__default["default"].MWMGS_API.GetInstance().ReportLogInfo(eventName, eventDesc, jsonData);
                });
            }
        }
        /**
         * 设置公共数据，每个埋点数据都会附加的字段，由key,value的形式组织
         * @param comData 公共数据
         */
        static setCommonData(comData) {
            AnalyticsUtil.comData = comData;
        }
        /** 根据类型生成一个埋点数据对象
         * @param MsgClass 埋点数据类
         * @returns 数据对象
         */
        static get(MsgClass) {
            if (this.msgMap == null) {
                this.init();
            }
            if (!AnalyticsUtil.msgMap.has(MsgClass.name)) {
                let msg = new MsgClass();
                msg.data = {};
                if (!AnalyticsUtil.comData) {
                    for (const key in AnalyticsUtil.comData) {
                        msg[key] = AnalyticsUtil.comData[key];
                    }
                }
                AnalyticsUtil.msgMap.set(MsgClass.name, msg);
            }
            return AnalyticsUtil.msgMap.get(MsgClass.name);
        }
        /**
         * 上传埋点数据到潘多拉
         * @param player 在服务端调用时，指定埋点的玩家，如果不写则全房间玩家都上传
         */
        send(player) {
            let eventName = this.constructor.name.toLowerCase();
            let eventDesc = this.desc;
            let jsonData = JSON.stringify(this.data).toLowerCase();
            if (GamePlay__default$1["default"].IsClient()) {
                MWMGS__default["default"].MWMGS_API.GetInstance().ReportLogInfo(eventName, eventDesc, jsonData);
            }
            else {
                if (player == null) {
                    Events__default$1["default"].DispatchToAllRoomClient(AnalyticsUtil.NET_MSG_SEND_MGS, eventName, eventDesc, jsonData);
                }
                else {
                    Events__default$1["default"].DispatchToClient(player, AnalyticsUtil.NET_MSG_SEND_MGS, eventName, eventDesc, jsonData);
                }
            }
        }
    }
    //埋点例子
    /**
        //定义一个埋点消息类
        class ZN_PlayerFirstLogin extends MGSMsg{
            desc: string = '第一次登录';
            data: {loginTime:number};
        }
        
        //游戏开始的时候初始化 (注:如游戏无通用字段则无需初始化)
        MGSMsg.Init({playerName:"帅帅的帅帅"});
        
        //发送一个埋点
        let msg = MGSMsg.Get(ZN_PlayerFirstLogin);//生成一个埋点
        msg.data.loginTime = 100;//设置字段值
        msg.Send();//发送埋点
    */

    class OdinGame extends MWCore__default$1["default"].MWScript {
        consoleLevel = 3; //Log级别
        CONNECT_SERVER = "ConnectServer";
        showLoading; //显示loading的方法，从UI中获取
        OnStart() {
            if (GamePlay__default$1["default"].IsClient()) {
                let num = 0;
                let id = setInterval(() => {
                    if (UI.instance != null) {
                        clearInterval(id);
                        this.showLoading = UI.instance["showLoading"].bind(UI.instance);
                        id = setInterval(() => {
                            this.showLoading(`Connect Server(${++num})……`, 0);
                            Events__default$1["default"].DispatchToServer(this.CONNECT_SERVER);
                        }, 1000);
                        let listener = Events__default$1["default"].AddServerListener(this.CONNECT_SERVER, () => {
                            clearInterval(id);
                            listener.Disconnect();
                            this.enterGame(); //进入游戏
                        });
                    }
                }, 100);
            }
            else {
                this.enterGame(); //进入游戏
                Events__default$1["default"].AddClientListener(this.CONNECT_SERVER, (player) => {
                    Events__default$1["default"].DispatchToClient(player, this.CONNECT_SERVER);
                });
            }
        }
        OnUpdate(dt) {
            TimeUtil.update(dt);
        }
        OnDestroy() {
            this.exitGame();
        }
        //进入游戏
        enterGame() {
            exports.NetManager.instance.init();
            exports.ResManager.instance.init();
            exports.BehaviourManager.instance.init();
            AnalyticsUtil.init();
            exports.LogManager.instance.setLogLevel(this.consoleLevel);
            if (GamePlay__default$1["default"].IsServer()) {
                this.initServer();
            }
            else {
                this.initClient();
            }
            this.bUseUpdate = true;
        }
        //离开游戏
        exitGame() {
            exports.ModuleManager.instance.destroyAllModule();
            exports.ModuleManager.instance.destroy();
            exports.NetManager.instance.destroy();
            exports.SoundManager.instance.destroy();
            exports.EffectManager.instance.destroy();
            exports.ResManager.instance.destroy();
            exports.InputManager.instance.destroy();
            exports.BehaviourManager.instance.destroy();
        }
        //初始化客户端
        initServer() {
            DataCenterS.instance.init();
            this.onRegisterModule();
            exports.ModuleManager.instance.awakeAllModule();
            exports.ModuleManager.instance.startAllModule();
            exports.EffectManager.instance.init();
            exports.LogManager.instance.logWarning("____________________    Init Complete    ____________________");
        }
        //初始化服务端
        async initClient() {
            this.showLoading("Request Data……", 0.1);
            await DataCenterC.instance.init();
            this.showLoading("Register Assets……", 0.15);
            this.onPreloadAssets();
            exports.LogManager.instance.logWarning("____________________   Register Module   ____________________");
            this.showLoading("Register Modules……", 0.2);
            this.onRegisterModule();
            this.showLoading("Get CurrentPlayer……", 0.4);
            exports.LogManager.instance.logWarning("____________________  Wait CurrentPlayer ____________________");
            await GamePlay__default$1["default"].AsyncGetCurrentPlayer();
            exports.LogManager.instance.logWarning("____________________    MyPlayerID:" + GamePlay__default$1["default"].GetCurrentPlayer().GetPlayerID() + "   ____________________");
            let loadResult = true;
            this.showLoading("Load Sound……", 0.6);
            exports.LogManager.instance.logWarning("____________________      Load Sound     ____________________");
            loadResult = await exports.SoundManager.instance.preloadSound();
            if (!loadResult) {
                await TimeUtil.delaySecond(Number.MAX_VALUE);
            }
            this.showLoading("Load Effect……", 0.8);
            exports.LogManager.instance.logWarning("____________________      Load Effect     ___________________");
            loadResult = await exports.EffectManager.instance.preloadEffect();
            if (!loadResult) {
                await TimeUtil.delaySecond(Number.MAX_VALUE);
            }
            exports.EffectManager.instance.init();
            this.showLoading("Find GameObject……", 0.9);
            exports.LogManager.instance.logWarning("____________________    Find GameObject   ___________________");
            loadResult = await PreloadRes.findAllPrewaitGameObject();
            if (!loadResult) {
                await TimeUtil.delaySecond(Number.MAX_VALUE);
            }
            this.showLoading("Awake All Module……", 0.95);
            exports.ModuleManager.instance.awakeAllModule();
            //await ModuleManager.instance.waitAssetAllModule(0);
            return new Promise((resolve) => {
                this.showLoading("Enter Game……", 1, () => {
                    exports.LogManager.instance.logWarning("____________________    Init Complete   ____________________ ");
                    this.onInitClientComplete();
                    this.showLoading = null;
                    resolve();
                });
            });
        }
        //客户端初始化完成调用(可在子类中复写)
        onInitClientComplete() {
        }
    }
    __decorate([
        MWCore__default$1["default"].MWProperty({ displayName: "Log级别" }) //0-3 0:不输出 3:输出所有
    ], OdinGame.prototype, "consoleLevel", void 0);

    //数据元素基类
    class DataInfo {
        version = 1;
    }

    //数据元素控制基类
    class ModuleData {
        /** 服务器同步数据的事件(Client Only)*/
        onDataChange = new Action();
        syncActionNetMsg; //同步Action调用
        _playerId;
        DataInfoClass;
        dataInfoMap;
        syncToClient;
        constructor(DataInfoClass) {
            this.DataInfoClass = DataInfoClass;
            this.syncActionNetMsg = "ModuleData_ActionSync_Msg_" + this.constructor.name;
            if (GamePlay__default$1["default"].IsClient()) {
                Events__default$1["default"].AddServerListener(this.syncActionNetMsg, (eventType, ...params) => {
                    this[eventType].call(...params);
                });
            }
        }
        //因为在构造方法里读不到派生类的属性，所以只能另起方法在外部调用(字符串调用)
        init(playerId, dataInfoMap) {
            this.dataInfoMap = dataInfoMap;
            this._playerId = playerId;
            if (dataInfoMap[this.dataName] == null) {
                dataInfoMap[this.dataName] = new this.DataInfoClass();
                this.initDefaultData();
            }
            if (GamePlay__default$1["default"].IsServer()) {
                const keys = Object.keys(this);
                keys.forEach(key => {
                    //遍历所有Action，使这些Action一旦在服务器调用，就会自动同步到客户端也调用
                    if (this[key] instanceof Action) {
                        let actionName = key;
                        let action = this[actionName];
                        if (action != null) {
                            action.add((...params) => {
                                if (this.syncToClient) {
                                    this.syncToClient = false;
                                    let player = GamePlay__default$1["default"].GetPlayer(this._playerId);
                                    Events__default$1["default"].DispatchToClient(player, this.syncActionNetMsg, actionName, ...params);
                                }
                            }, this);
                        }
                    }
                });
            }
            return this;
        }
        //销毁(字符串调用)
        destroy() {
            const keys = Object.keys(this);
            keys.forEach(key => {
                //遍历所有Action，使这些Action一旦在服务器调用，就会自动同步到客户端也调用
                if (this[key] instanceof Action) {
                    let action = this[key];
                    if (action != null) {
                        action.clear();
                    }
                }
            });
        }
        /**数据体*/
        get dataInfo() {
            return this.dataInfoMap[this.dataName];
        }
        /**数据名称*/
        get dataName() {
            return this.DataInfoClass.name;
        }
        /**所属玩家id*/
        get playerId() {
            return this._playerId;
        }
        /**
         * 初始化默认数据，需要请复写
         */
        initDefaultData() {
        }
        /**
         * 保存模块数据(Server Only)
         * @param syncToClient 是否同步给客户端
         * @returns 模块数据自身
         */
        saveData(syncToClient) {
            if (GamePlay__default$1["default"].IsClient())
                return null;
            DataCenterS.instance.saveModuleData(this, syncToClient);
            if (syncToClient) {
                this.onDataChange.call();
            }
            this.syncToClient = syncToClient;
            return this;
        }
    }

    class AIMachine {
        //当前状态
        currentState = null;
        //状态集合
        stateMap = new Map();
        //战斗对象
        owner;
        constructor(owner) {
            this.owner = owner;
        }
        /**
         * 注册状态
         * @param type 状态机类型
         * @param newstate 状态对象
         */
        register(type, newstate) {
            if (this.stateMap.has(type) == false) {
                this.stateMap.set(type, newstate);
            }
        }
        /**
        * 状态轮询：调用子状态
        */
        update() {
            if (this.currentState) {
                this.currentState.onUpdate();
            }
        }
        /**
        * 切换状态：立即转换到新的状态（参数自己注册时填写）
        * @param type 新的状态
        */
        changeState(type) {
            // 先退出当前状态
            if (this.currentState) {
                this.currentState.exit();
                this.currentState = null;
            }
            // 接着步入新状态：是否已存在了
            let state = this.stateMap.get(type);
            if (state == null) {
                return;
            }
            state.enter(this.owner);
            this.currentState = state;
        }
        destory() {
            if (this.changeState) {
                this.currentState.exit();
                this.changeState = null;
            }
            this.stateMap.forEach(state => {
                state.onDestory();
            });
            this.stateMap.clear();
            this.stateMap = null;
        }
    }

    class AIState {
        //战斗实体
        context;
        //状态机
        owner;
        constructor(owner) {
            this.owner = owner;
        }
        /**
         * 切换状态
         * @param type 状态类型
         */
        change2State(type) {
            this.owner.changeState(type);
        }
        /**
         * 状态进入，外部调用
         * @param context 战斗实体
         */
        enter(context) {
            this.context = context;
            this.onEnter();
        }
        /**
         * 退出状态外部调用
         */
        exit() {
            this.onExit();
        }
        /**
         * 销毁
         */
        onDestory() {
            this.context = null;
            this.owner = null;
        }
    }

    class Behaviour {
        _targetGuid;
        _gameObject;
        _script;
        _endPlayHandle;
        updateEnable = false;
        constructor(target) {
            if (target instanceof MWCore__default$1["default"].GameObject) {
                this._gameObject = target;
            }
            else {
                this._script = target;
                this._gameObject = target.gameObject;
            }
            this._endPlayHandle = this.endPlayHandle.bind(this);
            this._gameObject.Actor.OnEndPlay.Add(this._endPlayHandle);
            this._targetGuid = target.guid;
        }
        get targetGuid() {
            return this._targetGuid;
        }
        get gameObject() {
            return this._gameObject;
        }
        get transform() {
            return this.gameObject.GetTransform();
        }
        get script() {
            return this._script;
        }
        async findChild(path) {
            path = path.replace(/,/g, '/').replace(/parent/g, '..');
            return exports.ResManager.instance.findChildFromGo(this.gameObject, path);
        }
        async findScript(path) {
            path = path.replace(/,/g, '/').replace(/parent/g, '..');
            return exports.ResManager.instance.findScriptFromGo(this.gameObject, path);
        }
        endPlayHandle() {
            exports.BehaviourManager.instance.deleteComponent(this);
            this._gameObject.Actor.OnEndPlay.Remove(this._endPlayHandle);
            this.onDestroy();
        }
        onAwake() { }
        onStart() { }
        onUpdate(dt) { }
        onDestroy() { }
        ;
    }

    class NetBehaviour extends Behaviour {
        registerToNet() {
            if (this.targetGuid != null) {
                exports.NetManager.instance.registerObj(this, this.targetGuid);
            }
        }
        //调用服务端方法
        async callServerFun(funName, ...prames) {
            if (funName == null || GamePlay__default$1["default"].IsServer())
                return;
            return exports.NetManager.instance.callServerFun(`${this.targetGuid}.${funName}`, ...prames);
        }
        //调用特定客户端的方法
        callClientFun(player, funName, ...params) {
            if (player == null || funName == null || GamePlay__default$1["default"].IsClient())
                return;
            exports.NetManager.instance.callClientFun(player, `${this.targetGuid}.${funName}`, ...params);
        }
        //调用周围客户端的方法
        //params是调用client方法返回的参数序列，低0个是方法名
        callAroundClientFun(player, funName, ...params) {
            if (player == null || funName == null || GamePlay__default$1["default"].IsClient())
                return;
            exports.NetManager.instance.callAroundClientFun(player, `${this.targetGuid}.${funName}`, ...params);
        }
        //调用全世界客户端的方法
        callWorldClientFun(funName, ...params) {
            if (funName == null || GamePlay__default$1["default"].IsClient())
                return;
            exports.NetManager.instance.callWorldClientFun(`${this.targetGuid}.${funName}`, ...params);
        }
    }

    class NetBehaviourCreator extends MWCore__default$1["default"].MWScript {
        _behaviour;
        creatBehaviour(ServerClass, ClientClass) {
            if (GamePlay__default$1["default"].IsClient()) {
                if (ClientClass != null) {
                    this._behaviour = exports.BehaviourManager.instance.addComponent(this, ClientClass);
                }
            }
            else {
                if (ServerClass != null) {
                    this._behaviour = exports.BehaviourManager.instance.addComponent(this, ServerClass);
                }
            }
            if (this._behaviour != null) {
                this._behaviour.registerToNet();
            }
        }
        behaviour() {
            return this._behaviour;
        }
        OnDestroy() {
            exports.NetManager.instance.unRegisterObj(this.behaviour);
        }
    }

    //服务器端的网络对象
    class NetObjectS extends NetObject {
        _client;
        netFunNameMap = new Map(); //因为方法被替换过 名字丢了 所以要记录一下
        callClientObj = { funName: null, params: null };
        /**
         * 构造
         * @param netGuid 通信id
         * @param ClientClass 客户端类
         * @param autoRegister 是否自动注册
         */
        constructor(netGuid, ClientClass, autoRegister = true) {
            super(netGuid);
            if (ClientClass != null) { //避免循环构造
                this._client = new ClientClass();
                this.clientClassToCallHandler();
            }
            if (autoRegister && netGuid != null)
                this.registerToNet();
        }
        //客户端类转换为客户端调用的工具
        clientClassToCallHandler() {
            this.replaceNetFun(this.client);
            if (this.client["__proto__"] != null) {
                this.replaceNetFun(this.client["__proto__"]);
            }
        }
        //替换NET方法
        replaceNetFun(obj) {
            let prototype = Object.getPrototypeOf(obj);
            let funNames = Reflect.ownKeys(prototype);
            for (let i = 0; i < funNames.length; i++) {
                let funName = funNames[i].toString();
                if (funName.startsWith('net_') && typeof obj[funName] === 'function') {
                    let fun = this.getCallClientFun(funName);
                    this.client[funName] = fun;
                    this.netFunNameMap.set(fun, funName);
                }
                else {
                    delete obj[funName];
                }
            }
        }
        //将客户端类的方法转换为傀儡方法
        getCallClientFun(funName) {
            return (...params) => {
                this.callClientObj.funName = funName;
                this.callClientObj.params = params;
            };
        }
        /**
         * 和自己绑定的客户端对象，可通过此对象直接调用net_开头的客户端方法
         */
        get client() {
            return this._client;
        }
        /**
         * 当前调用服务器方法的玩家
         */
        get currentPlayer() {
            return exports.NetManager.instance.currentPlayer;
        }
        /**
         * 调用目标客户端的方法
         * @param player 目标客户端
         * @param fun 方法名|方法对象|方法调用结果
         * @param params 参数
         */
        callClientFun(player, fun, ...params) {
            this.setCallClientObj(fun, params);
            exports.NetManager.instance.callClientFun(player, `${this.netGuid}.${this.callClientObj.funName}`, ...this.callClientObj.params);
        }
        /**
         * 调用目标周围客户端的方法
         * @param player 目标客户端
         * @param fun 方法名|方法对象|方法调用结果
         * @param params 参数
         */
        callAroundClientFun(player, fun, ...params) {
            this.setCallClientObj(fun, params);
            exports.NetManager.instance.callAroundClientFun(player, `${this.netGuid}.${this.callClientObj.funName}`, ...this.callClientObj.params);
        }
        /**
         * 调用所有客户端的方法
         * @param fun 方法名|方法对象|方法调用结果
         * @param params 参数
         */
        callWorldClientFun(fun, ...params) {
            this.setCallClientObj(fun, params);
            exports.NetManager.instance.callWorldClientFun(`${this.netGuid}.${this.callClientObj.funName}`, ...this.callClientObj.params);
        }
        //设置调用的各种参数
        setCallClientObj(fun, params) {
            if (fun == undefined)
                return;
            if (typeof fun === 'string') {
                this.callClientObj.funName = fun;
                this.callClientObj.params = params;
            }
            else if (fun instanceof Function) {
                if (StringUtil.isEmpty(fun.name)) {
                    this.callClientObj.funName = this.netFunNameMap.get(fun);
                }
                else {
                    this.callClientObj.funName = fun.name;
                }
                this.callClientObj.params = params;
            }
        }
    }

    class ModuleS extends NetObjectS {
        ModuleDataClass;
        /**
         * 构造(不要手动构造模块，请在GameStart中注册)
         * @param ClientModuleClass 模块客户端类
         * @param ModuleDataClass 模块数据类
         * @param netGuid 通信id
         */
        constructor(ClientModuleClass, ModuleDataClass, netGuid) {
            super(netGuid, ClientModuleClass, true);
            this.ModuleDataClass = ModuleDataClass;
        }
        /** 获取当前请求玩家的本模块数据控制*/
        get currentData() {
            let platerData = DataCenterS.instance.getPlayerData(this.currentPlayer);
            if (platerData != null) {
                return platerData.getModuleData(this.ModuleDataClass);
            }
            return null;
        }
        /**
         * 获取玩家的本模块数据
         * @param player 目标玩家
         * @returns 数据
         */
        getPlayerData(player) {
            return DataCenterS.instance.getPlayerData(player).getModuleData(this.ModuleDataClass);
        }
        /**创建调用*/
        onAwake() { }
        /**开始调用*/
        onStart() { }
        /**刷新调用*/
        onUpdate(dt) { }
        /**销毁调用*/
        onDestroy() { }
        /**执行操作*/
        execute(param, data) { }
    }

    class SuperPanelBase {
        uiPrefab;
        _visible = true;
        _eventListener;
        defaultPrefabPath = null;
        /**
         * 不可以直接实例化
         * @param path
         */
        constructor(path) {
            this.defaultPrefabPath = path;
        }
        /**
         * 根据prefab路径，创建一个Panel
         * @param prefabPath ui文件的路径
         * @returns Panel
         */
        static creat(prefabPath) {
            let panel = new this(null);
            let path = prefabPath != null ? prefabPath : panel.defaultPrefabPath;
            oTrace(`SuperPanelBase: Load UIPrefab prefabPath=${prefabPath}`);
            panel.uiPrefab = MWGameUI__default$1["default"].CreateUIPrefabByName(path);
            if (panel.uiPrefab != null) {
                panel.uiPrefab.GetRootContent().SetVisibility(MWGameUI__default$1["default"].ESlateVisibility.SelfHitTestInvisible);
                oTrace('    Load Panel Success!');
            }
            else {
                oTraceError('    Load Panel Load Fail');
            }
            panel.buildSelf();
            panel.onStart();
            TimeUtil.delayExecute(() => {
                panel.onLayout();
            });
            return panel;
        }
        /**
         * 根据节点路径查找一个界面元素
         * @param ObjClass 元素类型
         * @param path 节点路径
         * @returns 元素对象
         */
        findChildByPath(ObjClass, path) {
            let child = this.uiPrefab.FindChildByPath(path);
            if (child == null) {
                oTraceError('SuperPanelBase: Child not found in panel!  path=' + path);
                return null;
            }
            let widget = ObjClass.Get(child);
            if (ObjClass.name == MWGameUI__default$1["default"].MWUIButton.name) {
                widget.SetFocusable(false); //设置了这个 按钮就不会按下后自动抛出抬起事件了
            }
            return widget;
        }
        /**
         * 根据类型路径获取多个子元素，路径是这种形式：`Canvas/Con/Field{0}_txt`
         * @param ObjClass 元素类型
         * @param path 节点路径
         * @returns 元素对象队列
         */
        findChildrenByPath(ObjClass, path, startIndex = 1, endIndex = Number.MAX_VALUE) {
            let arr = [];
            for (let i = startIndex; i < endIndex; i++) {
                let txt = this.findChildByPath(ObjClass, StringUtil.format(path, i));
                if (txt == null)
                    break;
                arr.push(txt);
            }
            return arr;
        }
        //===================实现IPanel接口==================
        //获取画布
        get canvas() {
            if (this.uiPrefab == null)
                return null;
            return this.uiPrefab.GetRootContent();
        }
        //UI对象
        get uiObject() {
            return this.uiPrefab;
        }
        //可见性
        set visible(value) {
            this._visible = value;
            if (value) {
                this.uiPrefab.SetVisibility(MWGameUI__default$1["default"].ESlateVisibility.SelfHitTestInvisible);
            }
            else {
                this.uiPrefab.SetVisibility(MWGameUI__default$1["default"].ESlateVisibility.Collapsed);
            }
        }
        //可见性
        get visible() { return this._visible; }
        //显示Panel
        show(...params) {
            if (!this.isShow) {
                UI.instance.addChild(this, this.getLayer());
            }
            this.onShow(...params);
        }
        //关闭Panel
        close() {
            if (this.isShow) {
                UI.instance.removeChild(this);
                this.onHide();
            }
        }
        //==================================================
        /**是否处于显示状态*/
        get isShow() { return UI.instance.panelIsShow(this); }
        /**名字*/
        get name() { return this.constructor.name; }
        /**事件批处理*/
        get localEventListener() {
            if (this._eventListener == null)
                this._eventListener = new EventListenerBatch();
            return this._eventListener;
        }
        /**
         * 获取这个Panle应该显示在的UI层，默认在Middle层，如果想换层请复写这个方法
         * @returns UI层
         */
        getLayer() {
            return exports.UILayer.Middle;
        }
        /**销毁Panel */
        destroy() {
            this.onDestroy();
            UI.instance.removeChild(this);
            this.uiObject.DestroyObject();
        }
        /**Panel生成工具自动生成的方法，不要调用 */
        buildSelf() { }
        //启用(字符串调用)
        enable() {
            this.localEventListener.active = true;
            this.onEnable();
            TimeUtil.onEnterFrame.add(this.onUpdate, this);
        }
        //禁用(字符串调用)
        disable() {
            this.onDisable();
            TimeUtil.onEnterFrame.remove(this.onUpdate, this);
            this.localEventListener.active = true;
        }
        //=====================生命周期=====================
        /**
         * 开始调用
         */
        onStart() { }
        /**
         * 局部完成调用，隐藏的对象不参与UI布局，所以要布局完成后再隐藏，这个方法就是布局完成后调用
         */
        onLayout() { }
        /**
         * 激活调用
         */
        onEnable() { }
        /**
         * 禁用调用
         */
        onDisable() { }
        /**
         * show调用
         * @param params show方法传递的参数
         */
        onShow(...params) { }
        /**
         * close调用
         */
        onHide() { }
        ;
        /**
         * 销毁调用
         */
        onDestroy() { }
        /**
         * 刷新调用
         * @param dt 帧间隔时间
         */
        onUpdate(dt) { }
    }

    //UI工具自动生成代码的的基类
    class ViewBase {
        uiPrefab;
        constructor(prefabPath) {
            this.uiPrefab = MWGameUI__default$1["default"].CreateUIPrefabByName(prefabPath);
        }
        findChildByPath(ObjClass, path) {
            let child = this.uiPrefab.FindChildByPath(path);
            return ObjClass.Get(child);
        }
    }

    /**
     * 摄像机工具类，用于实现震屏、摄像机跟随等效果
     */
    class CameraUtil {
        static _character;
        static forward;
        static speed = 800; //摄像机移动速度
        static maxRange = 20; //最大幅度
        static lastOffSize = -1; //上一帧的射线机偏移量
        static decay = 0.5; //抖动衰减(越小停的越快)
        static get character() {
            if (this._character == null)
                this._character = GamePlay__default$1["default"].GetCurrentPlayer().Character;
            return this._character;
        }
        /**
         * 震屏
         * @param maxRange 最大幅度
         * @param decay 每个周期的衰减
         * @param speed 速度
         */
        static screenShock(maxRange = 60, decay = 0.5, speed = 3000) {
            if (!TimeUtil.onEnterFrame.includes(this.screenShockUpdate, this)) {
                TimeUtil.onEnterFrame.add(this.screenShockUpdate, this);
            }
            this.lastOffSize = 0;
            this.maxRange = maxRange;
            this.decay = decay;
            this.speed = speed;
            this.forward = GamePlay__default$1["default"].GetShootDir(GamePlay__default$1["default"].GetCurrentPlayer().Character, GamePlay__default$1["default"].GetCurrentPlayer().Character.location, 100).GetNormalized();
        }
        static screenShockFinish() {
            TimeUtil.onEnterFrame.remove(this.screenShockUpdate, this);
            this.character.CameraSetting.SetCameraOffset(Type__default$1["default"].Vector.ZERO);
        }
        static screenShockUpdate(dt) {
            let offset = this.character.CameraSetting.GetCameraOffset();
            offset = offset.Addition(this.forward.Multiply(this.speed * dt));
            let currentZise = offset.size;
            if (currentZise > this.lastOffSize) { //增加的
                if (currentZise >= Math.abs(this.maxRange)) {
                    offset = this.forward.Multiply(this.maxRange * this.speed / Math.abs(this.speed));
                    this.speed = -this.speed;
                    this.maxRange *= this.decay;
                    if (this.maxRange <= 0.01) {
                        this.screenShockFinish();
                        return;
                    }
                }
            }
            this.lastOffSize = currentZise;
            this.character.CameraSetting.SetCameraOffset(offset);
        }
        /**
         * 跟随目标
         * @param target 目标
         */
        static setFollowTarget(target) {
            GamePlay__default$1["default"].CameraManager.SetCameraTarget(target);
        }
    }

    /**
     * 数学工具
     */
    class MathUtil {
        /**
         * 获取两个向量之间的距离
         * @param v1 第一个向量
         * @param v2 第二个向量
         * @returns 距离
         */
        static distance(v1, v2) {
            return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2) + Math.pow(v1.z - v2.z, 2));
        }
        /**
         * 获取两个向量之间的距离的平方
         * @param v1 第一个向量
         * @param v2 第二个向量
         * @returns 距离
         */
        static distanceSquare(v1, v2) {
            return Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2) + Math.pow(v1.z - v2.z, 2);
        }
        /**
         * 一个点往目标点移动一个距离
         * @param currentPos 当前点
         * @param targetPos 目标点
         * @param moveDis 移动的距离
         * @param resPos 移动后得到的结果的点
         * @returns 是否移动到了目标点
         */
        static posMove(currentPos, targetPos, moveDis, resPos) {
            let dis = MathUtil.distance(currentPos, targetPos);
            if (dis <= moveDis) {
                resPos.x = targetPos.x;
                resPos.y = targetPos.y;
                resPos.z = targetPos.z;
                return true;
            }
            let movV = targetPos.Subtraction(currentPos).GetNormalized().Multiply(moveDis);
            let newPos = currentPos.Addition(movV);
            resPos.x = newPos.x;
            resPos.y = newPos.y;
            resPos.z = newPos.z;
            return false;
        }
        /**
         * 向量的线性插值
         * @param from 起始向量
         * @param to 目标向量
         * @param alpha alpha
         * @returns 新向量
         */
        static vectorLerp(from, to, alpha) {
            return from.Addition(to.Subtraction(from).Multiply(alpha));
        }
        /**
         * 获取一个区间的整随机数
         * @param min 最小值
         * @param max 最大值(不包含)
         * @returns 随机数
         */
        static getRandom(min, max) {
            let range = max - min;
            let rand = Math.random();
            return (min + Math.round(rand * range));
        }
        /**
         * 获取两个旋转之间的欧拉角
         * @param from 起始旋转
         * @param to 目标旋转
         * @returns 欧拉角
         */
        static getEulerAngles(from, to) {
            let angles = new Type__default$1["default"].Vector((to.x - from.x) % 360, (to.y - from.y) % 360, (to.z - from.z) % 360);
            if (Math.abs(angles.x) > 180)
                angles.x += -Math.sign(angles.x) * 360;
            if (Math.abs(angles.y) > 180)
                angles.y += -Math.sign(angles.y) * 360;
            if (Math.abs(angles.z) > 180)
                angles.z += -Math.sign(angles.z) * 360;
            return angles;
        }
        /**
         * Rotation转欧拉角
         * @param rotation Rotation
         * @returns 欧拉角
         */
        static rotationToAngles(rotation) {
            return new Type__default$1["default"].Vector(rotation.x, rotation.y, rotation.z);
        }
        /**
         * 获取局部欧拉角
         * @param go GameObject
         * @returns 欧拉角
         */
        static getLocalEulerAngles(go) {
            return this.rotationToAngles(go.GetRelativeRotation());
        }
        /**
         * 向量点积
         * @param a 第一个向量
         * @param b 第二个向量
         * @returns 点积结果
         */
        static dot(a, b) {
            return MathLibrary__default["default"].Dot_VectorVector(a, b);
        }
        /**
         * 向量叉积
         * @param a 第一个向量
         * @param b 第二个向量
         * @returns 叉积结果
         */
        static cross(a, b) {
            return new Type__default$1["default"].Vector(a.y * b.z - b.y * a.z, a.z * b.x - a.x * b.z, a.x * b.y - b.x * a.y);
        }
        /**
         * 获取两个向量的旋转角
         * @param from 起始向量
         * @param to 目标向量
         * @param up 旋转轴
         * @returns 旋转的角度
         */
        static getSignedAngle(from, to, up) {
            let angle = Type__default$1["default"].Vector.Angle(from, to);
            let sign = Math.sign(this.dot(up, this.cross(from, to)));
            let signed_angle = angle * sign;
            return signed_angle <= 0 ? 360 + signed_angle : signed_angle;
        }
    }

    var GoPool_1;
    //GameObject对象池
    exports.GoPool = GoPool_1 = class GoPool {
        static instance;
        constructor() { }
        destroy() {
            GoPool_1.instance = null;
        }
        POOL_RES_GUID = 'poolResGuid'; //原始对象的guid，还对象的时候使用
        sceneSource = new Map();
        subPoolMap = new Map();
        /**
         * 生成一个对象
         * @param guid 场景中对象的guid或资源的guid
         * @returns 对象
         */
        spawn(guid) {
            if (!this.subPoolMap.has(guid)) {
                this.subPoolMap.set(guid, []);
            }
            if (this.subPoolMap.get(guid).length > 0) {
                let obj = this.subPoolMap.get(guid).pop();
                obj.SetVisibility(Type__default$1["default"].PropertyStatus.On);
                return obj;
            }
            let obj = null;
            if (guid.length > 18) { //场景里的
                if (!this.sceneSource.has(guid)) {
                    let source = MWCore__default$1["default"].GameObject.Find(guid);
                    source.DetachFromGameObject();
                    source.SetVisibility(Type__default$1["default"].PropertyStatus.Off);
                    source.StaticStatus = false;
                    source.location = Type__default$1["default"].Vector.RIGHT.Multiply(9999999);
                    this.sceneSource.set(guid, source);
                }
                obj = this.sceneSource.get(guid).Clone();
                obj.SetVisibility(Type__default$1["default"].PropertyStatus.On);
            }
            else { //库里的
                obj = MWCore__default$1["default"].GameObject.SpawnGameObject(guid);
            }
            obj.location = Type__default$1["default"].Vector.ZERO;
            obj[this.POOL_RES_GUID] = guid;
            return obj;
        }
        /**
         * 归还一个对象
         * @param obj 对象
         */
        unSpawn(obj) {
            let guid = obj[this.POOL_RES_GUID];
            if (this.subPoolMap.get(guid).includes(obj))
                return;
            this.subPoolMap.get(guid).push(obj);
            obj.location = Type__default$1["default"].Vector.RIGHT.Multiply(9999999);
            obj.DetachFromGameObject();
            obj.SetVisibility(Type__default$1["default"].PropertyStatus.Off);
        }
        /**
         * 清除对象池中所以guid对应的对象
         * @param guid 清除对象的guid
         */
        clear(guid) {
            if (!this.subPoolMap.has(guid) && this.subPoolMap.get(guid).length == 0) {
                return;
            }
            let arr = this.subPoolMap.get(guid);
            for (let i = 0; i < arr.length; i++) {
                arr[i].Destroy();
            }
            arr.length = 0;
        }
    };
    exports.GoPool = GoPool_1 = __decorate([
        Singleton()
    ], exports.GoPool);
    //对象池
    class ObjPool {
        creatFunction;
        resetFunction;
        destroyFunction;
        freeObjs;
        /**
         * 构造一个对象池
         * @param creatObj 创建新对象的回调
         * @param onReset 重置对象的回调
         * @param onDestroy 销毁对象的回调
         * @param initNum 默认缓存对象数量
         */
        constructor(creatObj, onReset, onDestroy, initNum = 2) {
            this.creatFunction = creatObj;
            this.resetFunction = onReset;
            this.destroyFunction = onDestroy;
            this.freeObjs = new Array(initNum);
            for (let i = 0; i < initNum; i++) {
                this.freeObjs[i] = this.creatFunction();
            }
        }
        /**
         * 生成一个对象
         * @returns 对象
         */
        spawn() {
            let obj = null;
            if (this.freeObjs.length > 0) {
                obj = this.freeObjs.pop();
                if (this.resetFunction != null) {
                    this.resetFunction(obj);
                }
            }
            obj = this.creatFunction();
            return obj;
        }
        /**
         * 归还一个对象
         * @param obj 对象
         */
        unSpawn(obj) {
            if (obj == null)
                return;
            this.freeObjs.push(obj);
        }
        /**
         * 获取对象池中空闲对象的数量
         */
        get size() {
            return this.freeObjs.length;
        }
        /**
         * 清除
         */
        clear() {
            this.freeObjs.forEach(obj => {
                this.destroyFunction(obj);
            });
            this.freeObjs.length = 0;
        }
        getFreeObjs() {
            return this.freeObjs;
        }
    }

    /**
     * Tween.js - Licensed under the MIT license
     * https://github.com/tweenjs/tween.js
     * ----------------------------------------------
     *
     * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
     * Thank you all, you're awesome!
     */
    class Sequence {
        static _nextId = 0;
        static nextId() {
            return Sequence._nextId++;
        }
    }
    exports.now = void 0;
    // Include a performance.now polyfill.
    // In node.js, use process.hrtime.
    // eslint-disable-next-line
    // @ts-ignore
    if (typeof self === 'undefined' && typeof process !== 'undefined' && process.hrtime) {
        exports.now = function () {
            // eslint-disable-next-line
            // @ts-ignore
            const time = process.hrtime();
            // Convert [seconds, nanoseconds] to milliseconds.
            return time[0] * 1000 + time[1] / 1000000;
        };
    }
    // In a browser, use self.performance.now if it is available.
    else if (typeof self !== 'undefined' && self.performance !== undefined && self.performance.now !== undefined) {
        // This must be bound, because directly assigning this function
        // leads to an invocation exception in Chrome.
        exports.now = self.performance.now.bind(self.performance);
    }
    // Use Date.now if it is available.
    else if (Date.now !== undefined) {
        exports.now = Date.now;
    }
    // Otherwise, use 'new Date().getTime()'.
    else {
        exports.now = function () {
            return new Date().getTime();
        };
    }
    /**
     *
     */
    const Interpolation = {
        Linear: function (v, k) {
            const m = v.length - 1;
            const f = m * k;
            const i = Math.floor(f);
            const fn = Interpolation.Utils.Linear;
            if (k < 0) {
                return fn(v[0], v[1], f);
            }
            if (k > 1) {
                return fn(v[m], v[m - 1], m - f);
            }
            return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
        },
        Bezier: function (v, k) {
            let b = 0;
            const n = v.length - 1;
            const pw = Math.pow;
            const bn = Interpolation.Utils.Bernstein;
            for (let i = 0; i <= n; i++) {
                b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
            }
            return b;
        },
        CatmullRom: function (v, k) {
            const m = v.length - 1;
            let f = m * k;
            let i = Math.floor(f);
            const fn = Interpolation.Utils.CatmullRom;
            if (v[0] === v[m]) {
                if (k < 0) {
                    i = Math.floor((f = m * (1 + k)));
                }
                return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
            }
            else {
                if (k < 0) {
                    return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
                }
                if (k > 1) {
                    return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
                }
                return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
            }
        },
        Utils: {
            Linear: function (p0, p1, t) {
                return (p1 - p0) * t + p0;
            },
            Bernstein: function (n, i) {
                const fc = Interpolation.Utils.Factorial;
                return fc(n) / fc(i) / fc(n - i);
            },
            Factorial: (function () {
                const a = [1];
                return function (n) {
                    let s = 1;
                    if (a[n]) {
                        return a[n];
                    }
                    for (let i = n; i > 1; i--) {
                        s *= i;
                    }
                    a[n] = s;
                    return s;
                };
            })(),
            CatmullRom: function (p0, p1, p2, p3, t) {
                const v0 = (p2 - p0) * 0.5;
                const v1 = (p3 - p1) * 0.5;
                const t2 = t * t;
                const t3 = t * t2;
                return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
            },
        },
    };
    class Group {
        _tweens = {};
        _tweensAddedDuringUpdate = {};
        getAll() {
            return Object.keys(this._tweens).map(tweenId => {
                return this._tweens[tweenId];
            });
        }
        removeAll() {
            this._tweens = {};
        }
        add(tween) {
            this._tweens[tween.getId()] = tween;
            this._tweensAddedDuringUpdate[tween.getId()] = tween;
        }
        remove(tween) {
            delete this._tweens[tween.getId()];
            delete this._tweensAddedDuringUpdate[tween.getId()];
        }
        update(time = exports.now(), preserve = false) {
            let tweenIds = Object.keys(this._tweens);
            if (tweenIds.length === 0) {
                return false;
            }
            // Tweens are updated in "batches". If you add a new tween during an
            // update, then the new tween will be updated in the next batch.
            // If you remove a tween during an update, it may or may not be updated.
            // However, if the removed tween was added during the current batch,
            // then it will not be updated.
            while (tweenIds.length > 0) {
                this._tweensAddedDuringUpdate = {};
                for (let i = 0; i < tweenIds.length; i++) {
                    const tween = this._tweens[tweenIds[i]];
                    const autoStart = !preserve;
                    if (tween && tween.update(time, autoStart) === false && !preserve) {
                        delete this._tweens[tweenIds[i]];
                    }
                }
                tweenIds = Object.keys(this._tweensAddedDuringUpdate);
            }
            return true;
        }
    }
    const mainGroup = new Group();
    /**
     * The Ease class provides a collection of easing functions for use with tween.js.
     */
    const Easing = {
        Linear: {
            None: function (amount) {
                return amount;
            },
        },
        Quadratic: {
            In: function (amount) {
                return amount * amount;
            },
            Out: function (amount) {
                return amount * (2 - amount);
            },
            InOut: function (amount) {
                if ((amount *= 2) < 1) {
                    return 0.5 * amount * amount;
                }
                return -0.5 * (--amount * (amount - 2) - 1);
            },
        },
        Cubic: {
            In: function (amount) {
                return amount * amount * amount;
            },
            Out: function (amount) {
                return --amount * amount * amount + 1;
            },
            InOut: function (amount) {
                if ((amount *= 2) < 1) {
                    return 0.5 * amount * amount * amount;
                }
                return 0.5 * ((amount -= 2) * amount * amount + 2);
            },
        },
        Quartic: {
            In: function (amount) {
                return amount * amount * amount * amount;
            },
            Out: function (amount) {
                return 1 - --amount * amount * amount * amount;
            },
            InOut: function (amount) {
                if ((amount *= 2) < 1) {
                    return 0.5 * amount * amount * amount * amount;
                }
                return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
            },
        },
        Quintic: {
            In: function (amount) {
                return amount * amount * amount * amount * amount;
            },
            Out: function (amount) {
                return --amount * amount * amount * amount * amount + 1;
            },
            InOut: function (amount) {
                if ((amount *= 2) < 1) {
                    return 0.5 * amount * amount * amount * amount * amount;
                }
                return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
            },
        },
        Sinusoidal: {
            In: function (amount) {
                return 1 - Math.sin(((1.0 - amount) * Math.PI) / 2);
            },
            Out: function (amount) {
                return Math.sin((amount * Math.PI) / 2);
            },
            InOut: function (amount) {
                return 0.5 * (1 - Math.sin(Math.PI * (0.5 - amount)));
            },
        },
        Exponential: {
            In: function (amount) {
                return amount === 0 ? 0 : Math.pow(1024, amount - 1);
            },
            Out: function (amount) {
                return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
            },
            InOut: function (amount) {
                if (amount === 0) {
                    return 0;
                }
                if (amount === 1) {
                    return 1;
                }
                if ((amount *= 2) < 1) {
                    return 0.5 * Math.pow(1024, amount - 1);
                }
                return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
            },
        },
        Circular: {
            In: function (amount) {
                return 1 - Math.sqrt(1 - amount * amount);
            },
            Out: function (amount) {
                return Math.sqrt(1 - --amount * amount);
            },
            InOut: function (amount) {
                if ((amount *= 2) < 1) {
                    return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
                }
                return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
            },
        },
        Elastic: {
            In: function (amount) {
                if (amount === 0) {
                    return 0;
                }
                if (amount === 1) {
                    return 1;
                }
                return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
            },
            Out: function (amount) {
                if (amount === 0) {
                    return 0;
                }
                if (amount === 1) {
                    return 1;
                }
                return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
            },
            InOut: function (amount) {
                if (amount === 0) {
                    return 0;
                }
                if (amount === 1) {
                    return 1;
                }
                amount *= 2;
                if (amount < 1) {
                    return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
                }
                return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
            },
        },
        Back: {
            In: function (amount) {
                const s = 1.70158;
                return amount === 1 ? 1 : amount * amount * ((s + 1) * amount - s);
            },
            Out: function (amount) {
                const s = 1.70158;
                return amount === 0 ? 0 : --amount * amount * ((s + 1) * amount + s) + 1;
            },
            InOut: function (amount) {
                const s = 1.70158 * 1.525;
                if ((amount *= 2) < 1) {
                    return 0.5 * (amount * amount * ((s + 1) * amount - s));
                }
                return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
            },
        },
        Bounce: {
            In: function (amount) {
                return 1 - Easing.Bounce.Out(1 - amount);
            },
            Out: function (amount) {
                if (amount < 1 / 2.75) {
                    return 7.5625 * amount * amount;
                }
                else if (amount < 2 / 2.75) {
                    return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
                }
                else if (amount < 2.5 / 2.75) {
                    return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
                }
                else {
                    return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
                }
            },
            InOut: function (amount) {
                if (amount < 0.5) {
                    return Easing.Bounce.In(amount * 2) * 0.5;
                }
                return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
            },
        },
        generatePow: function (power = 4) {
            power = power < Number.EPSILON ? Number.EPSILON : power;
            power = power > 10000 ? 10000 : power;
            return {
                In: function (amount) {
                    return amount ** power;
                },
                Out: function (amount) {
                    return 1 - (1 - amount) ** power;
                },
                InOut: function (amount) {
                    if (amount < 0.5) {
                        return (amount * 2) ** power / 2;
                    }
                    return (1 - (2 - amount * 2) ** power) / 2 + 0.5;
                },
            };
        },
    };
    class Tween {
        _object;
        _group;
        _isPaused = false;
        _pauseStart = 0;
        _valuesStart = {};
        _valuesEnd = {};
        _valuesStartRepeat = {};
        _duration = 1000;
        _initialRepeat = 0;
        _repeat = 0;
        _repeatDelayTime;
        _yoyo = false;
        _isPlaying = false;
        _reversed = false;
        _delayTime = 0;
        _startTime = 0;
        _easingFunction = Easing.Linear.None;
        _interpolationFunction = Interpolation.Linear;
        // eslint-disable-next-line
        _chainedTweens = [];
        _onStartCallback;
        _onStartCallbackFired = false;
        _onUpdateCallback;
        _onRepeatCallback;
        _onCompleteCallback;
        _onStopCallback;
        _id = Sequence.nextId();
        _isChainStopped = false;
        constructor(_object, _group = mainGroup) {
            this._object = _object;
            this._group = _group;
        }
        getId() {
            return this._id;
        }
        isPlaying() {
            return this._isPlaying;
        }
        isPaused() {
            return this._isPaused;
        }
        to(properties, duration) {
            // TODO? restore this, then update the 07_dynamic_to example to set fox
            // tween's to on each update. That way the behavior is opt-in (there's
            // currently no opt-out).
            // for (const prop in properties) this._valuesEnd[prop] = properties[prop]
            this._valuesEnd = Object.create(properties);
            if (duration !== undefined) {
                this._duration = duration;
            }
            return this;
        }
        duration(d = 1000) {
            this._duration = d;
            return this;
        }
        start(time = exports.now()) {
            if (this._isPlaying) {
                return this;
            }
            // eslint-disable-next-line
            this._group && this._group.add(this);
            this._repeat = this._initialRepeat;
            if (this._reversed) {
                // If we were reversed (f.e. using the yoyo feature) then we need to
                // flip the tween direction back to forward.
                this._reversed = false;
                for (const property in this._valuesStartRepeat) {
                    this._swapEndStartRepeatValues(property);
                    this._valuesStart[property] = this._valuesStartRepeat[property];
                }
            }
            this._isPlaying = true;
            this._isPaused = false;
            this._onStartCallbackFired = false;
            this._isChainStopped = false;
            this._startTime = time;
            this._startTime += this._delayTime;
            this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat);
            return this;
        }
        _setupProperties(_object, _valuesStart, _valuesEnd, _valuesStartRepeat) {
            for (const property in _valuesEnd) {
                const startValue = _object[property];
                const startValueIsArray = Array.isArray(startValue);
                const propType = startValueIsArray ? 'array' : typeof startValue;
                const isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
                // If `to()` specifies a property that doesn't exist in the source object,
                // we should not set that property in the object
                if (propType === 'undefined' || propType === 'function') {
                    continue;
                }
                // Check if an Array was provided as property value
                if (isInterpolationList) {
                    let endValues = _valuesEnd[property];
                    if (endValues.length === 0) {
                        continue;
                    }
                    // handle an array of relative values
                    endValues = endValues.map(this._handleRelativeValue.bind(this, startValue));
                    // Create a local copy of the Array with the start value at the front
                    _valuesEnd[property] = [startValue].concat(endValues);
                }
                // handle the deepness of the values
                if ((propType === 'object' || startValueIsArray) && startValue && !isInterpolationList) {
                    _valuesStart[property] = startValueIsArray ? [] : {};
                    // eslint-disable-next-line
                    for (const prop in startValue) {
                        // eslint-disable-next-line
                        // @ts-ignore FIXME?
                        _valuesStart[property][prop] = startValue[prop];
                    }
                    _valuesStartRepeat[property] = startValueIsArray ? [] : {}; // TODO? repeat nested values? And yoyo? And array values?
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    this._setupProperties(startValue, _valuesStart[property], _valuesEnd[property], _valuesStartRepeat[property]);
                }
                else {
                    // Save the starting value, but only once.
                    if (typeof _valuesStart[property] === 'undefined') {
                        _valuesStart[property] = startValue;
                    }
                    if (!startValueIsArray) {
                        // eslint-disable-next-line
                        // @ts-ignore FIXME?
                        _valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
                    }
                    if (isInterpolationList) {
                        // eslint-disable-next-line
                        // @ts-ignore FIXME?
                        _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
                    }
                    else {
                        _valuesStartRepeat[property] = _valuesStart[property] || 0;
                    }
                }
            }
        }
        stop() {
            if (!this._isChainStopped) {
                this._isChainStopped = true;
                this.stopChainedTweens();
            }
            if (!this._isPlaying) {
                return this;
            }
            // eslint-disable-next-line
            this._group && this._group.remove(this);
            this._isPlaying = false;
            this._isPaused = false;
            if (this._onStopCallback) {
                this._onStopCallback(this._object);
            }
            return this;
        }
        end() {
            this._goToEnd = true;
            this.update(Infinity);
            return this;
        }
        pause(time = exports.now()) {
            if (this._isPaused || !this._isPlaying) {
                return this;
            }
            this._isPaused = true;
            this._pauseStart = time;
            // eslint-disable-next-line
            this._group && this._group.remove(this);
            return this;
        }
        resume(time = exports.now()) {
            if (!this._isPaused || !this._isPlaying) {
                return this;
            }
            this._isPaused = false;
            this._startTime += time - this._pauseStart;
            this._pauseStart = 0;
            // eslint-disable-next-line
            this._group && this._group.add(this);
            return this;
        }
        stopChainedTweens() {
            for (let i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                this._chainedTweens[i].stop();
            }
            return this;
        }
        group(group = mainGroup) {
            this._group = group;
            return this;
        }
        delay(amount = 0) {
            this._delayTime = amount;
            return this;
        }
        repeat(times = 0) {
            this._initialRepeat = times;
            this._repeat = times;
            return this;
        }
        repeatDelay(amount) {
            this._repeatDelayTime = amount;
            return this;
        }
        yoyo(yoyo = false) {
            this._yoyo = yoyo;
            return this;
        }
        easing(easingFunction = Easing.Linear.None) {
            this._easingFunction = easingFunction;
            return this;
        }
        interpolation(interpolationFunction = Interpolation.Linear) {
            this._interpolationFunction = interpolationFunction;
            return this;
        }
        // eslint-disable-next-line
        chain(...tweens) {
            this._chainedTweens = tweens;
            return this;
        }
        onStart(callback) {
            this._onStartCallback = callback;
            return this;
        }
        onUpdate(callback) {
            this._onUpdateCallback = callback;
            return this;
        }
        onRepeat(callback) {
            this._onRepeatCallback = callback;
            return this;
        }
        onComplete(callback) {
            this._onCompleteCallback = callback;
            return this;
        }
        onStop(callback) {
            this._onStopCallback = callback;
            return this;
        }
        _goToEnd = false;
        /**
         * @returns true if the tween is still playing after the update, false
         * otherwise (calling update on a paused tween still returns true because
         * it is still playing, just paused).
         */
        update(time = exports.now(), autoStart = true) {
            if (this._isPaused)
                return true;
            let property;
            let elapsed;
            const endTime = this._startTime + this._duration;
            if (!this._goToEnd && !this._isPlaying) {
                if (time > endTime)
                    return false;
                if (autoStart)
                    this.start(time);
            }
            this._goToEnd = false;
            if (time < this._startTime) {
                return true;
            }
            if (this._onStartCallbackFired === false) {
                if (this._onStartCallback) {
                    this._onStartCallback(this._object);
                }
                this._onStartCallbackFired = true;
            }
            elapsed = (time - this._startTime) / this._duration;
            elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;
            const value = this._easingFunction(elapsed);
            // properties transformations
            this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
            if (this._onUpdateCallback) {
                this._onUpdateCallback(this._object, elapsed);
            }
            if (elapsed === 1) {
                if (this._repeat > 0) {
                    if (isFinite(this._repeat)) {
                        this._repeat--;
                    }
                    // Reassign starting values, restart by making startTime = now
                    for (property in this._valuesStartRepeat) {
                        if (!this._yoyo && typeof this._valuesEnd[property] === 'string') {
                            this._valuesStartRepeat[property] =
                                // eslint-disable-next-line
                                // @ts-ignore FIXME?
                                this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
                        }
                        if (this._yoyo) {
                            this._swapEndStartRepeatValues(property);
                        }
                        this._valuesStart[property] = this._valuesStartRepeat[property];
                    }
                    if (this._yoyo) {
                        this._reversed = !this._reversed;
                    }
                    if (this._repeatDelayTime !== undefined) {
                        this._startTime = time + this._repeatDelayTime;
                    }
                    else {
                        this._startTime = time + this._delayTime;
                    }
                    if (this._onRepeatCallback) {
                        this._onRepeatCallback(this._object);
                    }
                    return true;
                }
                else {
                    if (this._onCompleteCallback) {
                        this._onCompleteCallback(this._object);
                    }
                    for (let i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                        // Make the chained tweens start exactly at the time they should,
                        // even if the `update()` method was called way past the duration of the tween
                        this._chainedTweens[i].start(this._startTime + this._duration);
                    }
                    this._isPlaying = false;
                    return false;
                }
            }
            return true;
        }
        _updateProperties(_object, _valuesStart, _valuesEnd, value) {
            for (const property in _valuesEnd) {
                // Don't update properties that do not exist in the source object
                if (_valuesStart[property] === undefined) {
                    continue;
                }
                const start = _valuesStart[property] || 0;
                let end = _valuesEnd[property];
                const startIsArray = Array.isArray(_object[property]);
                const endIsArray = Array.isArray(end);
                const isInterpolationList = !startIsArray && endIsArray;
                if (isInterpolationList) {
                    _object[property] = this._interpolationFunction(end, value);
                }
                else if (typeof end === 'object' && end) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    this._updateProperties(_object[property], start, end, value);
                }
                else {
                    // Parses relative end values with start as base (e.g.: +10, -3)
                    end = this._handleRelativeValue(start, end);
                    // Protect against non numeric properties.
                    if (typeof end === 'number') {
                        // eslint-disable-next-line
                        // @ts-ignore FIXME?
                        _object[property] = start + (end - start) * value;
                    }
                }
            }
        }
        _handleRelativeValue(start, end) {
            if (typeof end !== 'string') {
                return end;
            }
            if (end.charAt(0) === '+' || end.charAt(0) === '-') {
                return start + parseFloat(end);
            }
            else {
                return parseFloat(end);
            }
        }
        _swapEndStartRepeatValues(property) {
            const tmp = this._valuesStartRepeat[property];
            const endValue = this._valuesEnd[property];
            if (typeof endValue === 'string') {
                this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
            }
            else {
                this._valuesStartRepeat[property] = this._valuesEnd[property];
            }
            this._valuesEnd[property] = tmp;
        }
    }
    const VERSION = '18.6.4';
    const nextId = Sequence.nextId;
    /**
     * Controlling groups of tweens
     *
     * Using the TWEEN singleton to manage your tweens can cause issues in large apps with many components.
     * In these cases, you may want to create your own smaller groups of tweens.
     */
    const TWEEN = mainGroup;
    // This is the best way to export things in a way that's compatible with both ES
    // Modules and CommonJS, without build hacks, and so as not to break the
    // existing API.
    // https://github.com/rollup/rollup/issues/1961#issuecomment-423037881
    const getAll = TWEEN.getAll.bind(TWEEN);
    const removeAll = TWEEN.removeAll.bind(TWEEN);
    const add = TWEEN.add.bind(TWEEN);
    const remove = TWEEN.remove.bind(TWEEN);
    const update = TWEEN.update.bind(TWEEN);

    exports.AIMachine = AIMachine;
    exports.AIState = AIState;
    exports.Action = Action;
    exports.Action1 = Action1;
    exports.Action2 = Action2;
    exports.AnalyticsUtil = AnalyticsUtil;
    exports.Behaviour = Behaviour;
    exports.CallBack = CallBack;
    exports.CameraUtil = CameraUtil;
    exports.DataCenterC = DataCenterC;
    exports.DataCenterS = DataCenterS;
    exports.DataInfo = DataInfo;
    exports.Easing = Easing;
    exports.Effect = Effect;
    exports.EffectData = EffectData;
    exports.EventListenerBatch = EventListenerBatch;
    exports.GoNode = GoNode;
    exports.Group = Group;
    exports.Interpolation = Interpolation;
    exports.MathUtil = MathUtil;
    exports.ModuleC = ModuleC;
    exports.ModuleData = ModuleData;
    exports.ModuleS = ModuleS;
    exports.NetBehaviour = NetBehaviour;
    exports.NetBehaviourCreator = NetBehaviourCreator;
    exports.NetObject = NetObject;
    exports.NetObjectC = NetObjectC;
    exports.NetObjectS = NetObjectS;
    exports.ObjPool = ObjPool;
    exports.OdinGame = OdinGame;
    exports.PanelBase = PanelBase;
    exports.PlayerData = PlayerData;
    exports.PreloadRes = PreloadRes;
    exports.Sequence = Sequence;
    exports.Singleton = Singleton;
    exports.Sound = Sound;
    exports.StringUtil = StringUtil;
    exports.SuperPanelBase = SuperPanelBase;
    exports.TimeUtil = TimeUtil;
    exports.Tween = Tween;
    exports.UI = UI;
    exports.VERSION = VERSION;
    exports.ViewBase = ViewBase;
    exports.add = add;
    exports.getAll = getAll;
    exports.mainGroup = mainGroup;
    exports.nextId = nextId;
    exports.oTrace = oTrace;
    exports.oTraceError = oTraceError;
    exports.oTraceWarning = oTraceWarning;
    exports.remove = remove;
    exports.removeAll = removeAll;
    exports.update = update;

    }(dist));

    class ConfigBase {
      static TAG_KEY = "Key";
      static TAG_LANGUAGE = "Language";
      static TAG_MAINLANGUAGE = "MainLanguage";
      static TAG_CHILDLANGUAGE = "ChildLanguage";
      ELEMENTARR = [];
      ELEMENTMAP = /* @__PURE__ */ new Map();
      KEYMAP = /* @__PURE__ */ new Map();
      static languageIndex = 0;
      static getLanguage;
      constructor(excelData) {
        let headerLine = 2;
        this.ELEMENTARR = new Array(excelData.length - headerLine);
        for (let i = 0; i < this.ELEMENTARR.length; i++) {
          this.ELEMENTARR[i] = {};
        }
        let column = excelData[0].length;
        for (let j = 0; j < column; j++) {
          let name = excelData[0][j];
          let tags = excelData[1][j].split("|");
          if (tags.includes(ConfigBase.TAG_CHILDLANGUAGE))
            continue;
          let jOffect = 0;
          if (tags.includes(ConfigBase.TAG_MAINLANGUAGE)) {
            let index = j + ConfigBase.languageIndex;
            let targetTags = excelData[1][index].split("|");
            if (index < column && targetTags.includes(ConfigBase.TAG_CHILDLANGUAGE)) {
              jOffect = ConfigBase.languageIndex;
            }
          }
          let hasTag_Key = tags.includes(ConfigBase.TAG_KEY);
          let hasTag_Language = tags.includes(ConfigBase.TAG_LANGUAGE);
          for (let i = 0; i < this.ELEMENTARR.length; i++) {
            let ele = this.ELEMENTARR[i];
            let value = excelData[i + headerLine][j + jOffect];
            if (j == 0) {
              this.ELEMENTMAP.set(value, ele);
            } else {
              if (hasTag_Key) {
                this.KEYMAP.set(value, excelData[i + headerLine][0]);
              }
              if (hasTag_Language) {
                value = ConfigBase.getLanguage(value);
              }
            }
            ele[name] = value;
          }
        }
      }
      static initLanguage(languageIndex, getLanguageFun) {
        ConfigBase.languageIndex = languageIndex;
        ConfigBase.getLanguage = getLanguageFun;
        if (ConfigBase.languageIndex < 0) {
          ConfigBase.languageIndex = ConfigBase.getSystemLanguageIndex();
        }
      }
      static getSystemLanguageIndex() {
        let language = require$$5__default["default"].GetDefaultLocale().toString().toLowerCase();
        if (!!language.match("zh")) {
          return 0;
        }
        if (!!language.match("en")) {
          return 1;
        }
        if (!!language.match("ja")) {
          return 2;
        }
        if (!!language.match("de")) {
          return 3;
        }
        return 0;
      }
      getElement(id) {
        let ele = this.ELEMENTMAP.get(Number(id)) || this.ELEMENTMAP.get(this.KEYMAP.get(String(id)));
        if (ele == null) {
          console.error("\u914D\u7F6E\u8868\u4E2D\u627E\u4E0D\u5230\u5143\u7D20 id:" + id);
        }
        return ele;
      }
      findElement(key, value) {
        for (let i = 0; i < this.ELEMENTARR.length; i++) {
          if (this.ELEMENTARR[i][key] == value) {
            return this.ELEMENTARR[i];
          }
        }
      }
      getAllElement() {
        return this.ELEMENTARR;
      }
    }

    var foreign3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        ConfigBase: ConfigBase
    }, Symbol.toStringTag, { value: 'Module' }));

    const EXCELDATA = [
      ["ID", "ModleId", "Name", "Pos", "Scale"],
      ["", "", "", "", ""],
      [10001, "7675", "\u6FC0\u5149\u53D1\u5C04\u5668", [[-12e3, -9345, 250], [-1e4, -12285, 250], [-8e3, -9345, 250], [-6e3, -12285, 250]], [0.5, 0.5, 13]],
      [10002, "1579", "\u94E1\u5200", [[-7663, -5737, 664], [-8518, -5015, 180], [-9473, -4210, 380]], [12, 8, 5]],
      [10003, "", "\u9677\u9631", [[-7528, 2058, 60], [-7028, 2358, 120], [-6528, 2658, 180], [-6028, 2958, 240], [-5528, 3258, 300]], [4, 26, 0.4]]
    ];
    class MonsterConfig extends ConfigBase {
      constructor() {
        super(EXCELDATA);
      }
    }

    var foreign5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        MonsterConfig: MonsterConfig
    }, Symbol.toStringTag, { value: 'Module' }));

    class GameConfig {
      static configMap = /* @__PURE__ */ new Map();
      static initLanguage(languageIndex, getLanguageFun) {
        ConfigBase.initLanguage(languageIndex, getLanguageFun);
      }
      static getConfig(ConfigClass) {
        if (!this.configMap.has(ConfigClass.name)) {
          this.configMap.set(ConfigClass.name, new ConfigClass());
        }
        return this.configMap.get(ConfigClass.name);
      }
      static get Monster() {
        return this.getConfig(MonsterConfig);
      }
    }

    var foreign4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        GameConfig: GameConfig
    }, Symbol.toStringTag, { value: 'Module' }));

    class DyObjUtil {
      static Ins = new DyObjUtil();
      _map = /* @__PURE__ */ new Map();
      _delayIdMap = /* @__PURE__ */ new Map();
      setIds(ids) {
        let arr = ids.split(",");
        arr.forEach((element) => {
          this._map.set(element, true);
        });
      }
      createGo(guid) {
        if (this._map.has(guid) == false) ;
        let go = MWCore__default["default"].GameObject.SpawnGameObject(guid, GamePlay__default["default"].IsServer());
        if (go instanceof GamePlay__default["default"].EffectSystem) {
          let delayId = setTimeout(() => {
            go.Play();
            this._delayIdMap.delete(go.GetGuid());
          }, 100);
          this._delayIdMap.set(go.GetGuid(), delayId);
        }
        return go;
      }
      destoryGo(go) {
        if (!go) {
          return null;
        }
        if (this._delayIdMap.has(go.GetGuid())) {
          let delayId = this._delayIdMap.get(go.GetGuid());
          clearTimeout(delayId);
          this._delayIdMap.delete(go.GetGuid());
        }
        go.Destroy();
        return null;
      }
      checkUIGuid(guid) {
        if (this._map.has(guid) == false) ;
        return guid;
      }
    }

    var foreign16 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        DyObjUtil: DyObjUtil
    }, Symbol.toStringTag, { value: 'Module' }));

    class LinkedListNode {
      list;
      next;
      prev;
      item;
      constructor(value, list) {
        this.list = list;
        this.item = value;
      }
      get Next() {
        return !this.next || this.next == this.list.First ? void 0 : this.next;
      }
      get Prev() {
        return !this.prev || this == this.list.First ? void 0 : this.prev;
      }
      set Value(v) {
        this.item = v;
      }
      get Value() {
        return this.item;
      }
      Invalidate() {
        this.list = void 0;
        this.next = void 0;
        this.prev = void 0;
      }
    }
    class LinkedList {
      head;
      count = 0;
      version = 0;
      get Count() {
        return this.count;
      }
      get First() {
        return this.head;
      }
      get Last() {
        return !this.head ? void 0 : this.head.prev;
      }
      AddAfter(node, value) {
        this.ValidateNode(node);
        let result = new LinkedListNode(value, node.list);
        this.InternalInsertNodeBefore(node.next, result);
        return result;
      }
      AddNodeAfter(node, newNode) {
        this.ValidateNode(node);
        this.ValidateNewNode(newNode);
        this.InternalInsertNodeBefore(node.next, newNode);
        newNode.list = this;
      }
      AddBefore(node, value) {
        this.ValidateNode(node);
        let newNode = new LinkedListNode(value, node.list);
        this.InternalInsertNodeBefore(node, newNode);
        if (node == this.head) {
          this.head = newNode;
        }
        return newNode;
      }
      AddNodeBefore(node, newNode) {
        this.ValidateNode(node);
        this.ValidateNewNode(newNode);
        this.InternalInsertNodeBefore(node, newNode);
        newNode.list = this;
        if (node == this.head) {
          this.head = newNode;
        }
      }
      AddFirst(value) {
        let newNode = new LinkedListNode(value, this);
        if (!this.head) {
          this.InternalInsertNodeToEmptyList(newNode);
        } else {
          this.InternalInsertNodeBefore(this.head, newNode);
          this.head = newNode;
        }
        return newNode;
      }
      AddNodeFirst(node) {
        this.ValidateNewNode(node);
        if (!this.head) {
          this.InternalInsertNodeToEmptyList(node);
        } else {
          this.InternalInsertNodeBefore(this.head, node);
          this.head = node;
        }
        node.list = this;
      }
      AddLast(value) {
        let newNode = new LinkedListNode(value, this);
        if (!this.head) {
          this.InternalInsertNodeToEmptyList(newNode);
        } else {
          this.InternalInsertNodeBefore(this.head, newNode);
        }
        return newNode;
      }
      AddNodeLast(node) {
        if (!this.head) {
          this.InternalInsertNodeToEmptyList(node);
        } else {
          this.InternalInsertNodeBefore(this.head, node);
        }
        node.list = this;
      }
      Remove(value) {
        let node = this.Find(value);
        if (node) {
          this.InternalRemoveNode(node);
          return true;
        }
        return false;
      }
      RemoveNode(node) {
        this.ValidateNode(node);
        this.InternalRemoveNode(node);
      }
      RemoveFirst() {
        if (!this.head) {
          throw new Error("LikedList is Empty");
        }
        this.InternalRemoveNode(this.head);
      }
      RemoveLast() {
        if (this.head == null) {
          throw new Error("LikedList is Empty");
        }
        this.InternalRemoveNode(this.head.prev);
      }
      Clear() {
        let current = this.head;
        while (current) {
          let temp = current;
          current = current.Next;
          temp.Invalidate();
        }
        this.head = void 0;
        this.count = 0;
        this.version++;
      }
      Contains(value) {
        return !!this.Find(value);
      }
      Find(value) {
        let node = this.head;
        if (node) {
          do {
            if (node.Value == value) {
              return node;
            }
            node = node.next;
          } while (node != this.head);
        }
        return void 0;
      }
      FindLast(value) {
        if (this.head) {
          let node = this.head.Prev;
          if (node) {
            do {
              if (node.Value == value) {
                return node;
              }
              node = node.Prev;
            } while (node != this.head.Prev);
          }
        }
        return void 0;
      }
      ValidateNode(node) {
        if (!node) {
          throw new Error("node can not be null or undefined");
        }
        if (node.list != this) {
          throw new Error("node belongs to another list");
        }
      }
      ValidateNewNode(node) {
        if (!node) {
          throw new Error("node can not be null or undefined");
        }
        if (node.list) {
          throw new Error("node is attached");
        }
      }
      InternalInsertNodeToEmptyList(newNode) {
        newNode.next = newNode;
        newNode.prev = newNode;
        this.head = newNode;
        this.version++;
        this.count++;
      }
      InternalInsertNodeBefore(node, newNode) {
        newNode.next = node;
        newNode.prev = node.prev;
        node.prev.next = newNode;
        node.prev = newNode;
        this.version++;
        this.count++;
      }
      InternalRemoveNode(node) {
        if (node.next == node) {
          if (!(this.count == 1 && this.head == node)) {
            console.log("this should only be true for a list with only one node");
          }
          this.head = null;
        } else {
          node.next.prev = node.prev;
          node.prev.next = node.next;
          if (this.head == node) {
            this.head = node.next;
          }
        }
        node.Invalidate();
        this.count--;
        this.version++;
      }
      [Symbol.iterator]() {
        let iterartor = { next };
        let current = this.head;
        let version = this.version;
        let list = this;
        function next() {
          if (version != list.version) {
            throw new Error("cannot modify list when interate it");
          }
          if (current) {
            var value = current.Value;
            current = current.Next;
            return { done: false, value };
          }
          return { done: true, value: void 0 };
        }
        return iterartor;
      }
    }

    var foreign17 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        LinkedListNode: LinkedListNode,
        LinkedList: LinkedList
    }, Symbol.toStringTag, { value: 'Module' }));

    var gameTag;
    ((gameTag2) => {
      gameTag2.SCENE_TRIGGER = "SCENE_TRIGGER";
      gameTag2.MON = "MON";
    })(gameTag || (gameTag = {}));
    var obj;
    ((obj2) => {
      obj2.BOX_TRI = "113";
      obj2.MON_EFF = "14324";
      obj2.MON_DEAD_EFF = "13417";
      obj2.BULLET = "20968";
      obj2.BULLET_EFF = "13602";
      obj2.BUFF_EFF = "7747";
      obj2.PORTAL_EFF = "29497";
      obj2.FIRE_ANIM = "15226";
      obj2.GREEN_HEAD = "15319";
      obj2.BEAR_DOLL = "15323";
      obj2.ART_TEACHER = "15640";
      obj2.RED_CLOTH = "15614";
      obj2.TREASURE_BOX = "20910";
      obj2.TREASURE_EFF = "13710";
    })(obj || (obj = {}));
    var sound;
    ((sound2) => {
      sound2.SOUND_FIRE = "SOUND_FIRE";
      sound2.SOUND_FIREID = "20530";
    })(sound || (sound = {}));
    var c2cEvents;
    ((c2cEvents2) => {
      c2cEvents2.LOGIN = "Login";
      c2cEvents2.HP_CHANGE = "HpChange";
      c2cEvents2.WATER_IN = "WaterAreaIn";
      c2cEvents2.TIPS = "Tips";
      c2cEvents2.GET_WEAPON = "GetWeapon";
      c2cEvents2.MON_HP = "MonHp";
      c2cEvents2.GET_SKILL = "GetSkill";
      c2cEvents2.GET_JUMP = "GetJump";
      c2cEvents2.UNEQUIP_SKILL = "UnEquipSkill";
    })(c2cEvents || (c2cEvents = {}));
    var configId;
    ((configId2) => {
      configId2.MONSTER_ID = "10001";
      configId2.BLADE_ID = "10002";
      configId2.TRIGGER_ID = "10003";
    })(configId || (configId = {}));
    var util;
    ((util2) => {
      function setVisible(ui, flag) {
        if (flag) {
          ui.SetVisibility(MWGameUI__default["default"].ESlateVisibility.Visible);
        } else {
          ui.SetVisibility(MWGameUI__default["default"].ESlateVisibility.Hidden);
        }
      }
      util2.setVisible = setVisible;
      function getTargetPos(uiPos) {
        let toPos = this.uiPos2WorldPos(uiPos.x, uiPos.y, 5e3);
        toPos.x = Math.round(toPos.x);
        toPos.y = Math.round(toPos.y);
        toPos.z = Math.round(toPos.z);
        return toPos;
      }
      util2.getTargetPos = getTargetPos;
      function getTargetId(uiPos) {
        let hits = GamePlay__default["default"].GetClickGameobjectByScene(uiPos.x, uiPos.y, 5e3, true, false);
        let len = hits.length;
        for (let index = 0; index < len; index++) {
          if (util2.checkId(hits[index].GameObject)) {
            return hits[index].GameObject.GetGuid();
          }
        }
      }
      util2.getTargetId = getTargetId;
      function getClickGameobjectByScene(SceneX, SceneY, Distance) {
        let hits = GamePlay__default["default"].GetClickGameobjectByScene(SceneX, SceneY, Distance, false, false);
        let len = hits.length;
        let player = GamePlay__default["default"].GetCurrentPlayer();
        for (let index = 0; index < len; index++) {
          if (util2.checkCanSetAttackTarget(player, hits[index].GameObject, hits[index].Location)) {
            if (hits[index].GameObject) ;
            return hits[index].Location;
          }
        }
        return null;
      }
      util2.getClickGameobjectByScene = getClickGameobjectByScene;
      function checkId(go) {
        if (GamePlay__default["default"].IsCharacter(go))
          return false;
        if (go.GetTag() == gameTag.MON) {
          return true;
        }
        return false;
      }
      util2.checkId = checkId;
      function checkCanSetAttackTarget(player, go, goLoc) {
        if (go == null) {
          return false;
        }
        if (player.Character == go) {
          return false;
        }
        if (GamePlay__default["default"].IsBoxTrigger(go) || GamePlay__default["default"].IsSphereTrigger(go))
          return false;
        if (!checkCanFightByTag(go)) {
          return false;
        }
        return true;
      }
      util2.checkCanSetAttackTarget = checkCanSetAttackTarget;
      function checkCanFightByTag(go) {
        if (!go) {
          return false;
        }
        if (!GamePlay__default["default"].IsCharacter(go)) {
          let goTag = go.GetTag();
          if (goTag != null) {
            if (goTag == gameTag.SCENE_TRIGGER) {
              return false;
            }
          }
        }
        return true;
      }
      util2.checkCanFightByTag = checkCanFightByTag;
      function uiPos2WorldPos(SceneX, SceneY, Distance) {
        let WorldLocation = new UE__namespace.Vector(0);
        let WorldDirection = new UE__namespace.Vector(0);
        const WorldLocationRef = puerts__namespace.$ref(WorldLocation);
        const WorldDirectionRef = puerts__namespace.$ref(WorldDirection);
        let character = GamePlay__default["default"].GetCurrentPlayer().Character.Actor;
        character.GetPlayerController().DeprojectScreenPositionToWorld(SceneX, SceneY, WorldLocationRef, WorldDirectionRef);
        WorldLocation = puerts__namespace.$unref(WorldLocationRef);
        WorldDirection = puerts__namespace.$unref(WorldDirectionRef);
        const EndLocation = new Type__default["default"].Vector(WorldDirection.X * Distance + WorldLocation.X, WorldDirection.Y * Distance + WorldLocation.Y, WorldDirection.Z * Distance + WorldLocation.Z);
        return EndLocation;
      }
      util2.uiPos2WorldPos = uiPos2WorldPos;
    })(util || (util = {}));
    var schedule;
    ((schedule2) => {
      const updateList = new LinkedList();
      function updateCall(callback, check) {
        if (check && updateList.Find(callback)) {
          return;
        }
        updateList.AddLast(callback);
      }
      schedule2.updateCall = updateCall;
      function cancleUpdateCall(callback) {
        return updateList.Remove(callback);
      }
      schedule2.cancleUpdateCall = cancleUpdateCall;
      function tick(dt) {
        tickUpdate(dt);
      }
      schedule2.tick = tick;
      function tickUpdate(dt) {
        let node = updateList.First;
        while (node) {
          try {
            node.Value(dt);
          } catch (error) {
            dist.oTrace(error);
          }
          node = node.Next;
        }
      }
    })(schedule || (schedule = {}));
    var posUtil;
    ((posUtil2) => {
      function getCanvasPointByWorld(v3, valueV2, out) {
        valueV2.value.X = valueV2.value.Y = 0;
        let pc = getPlayerController();
        pc.ProjectWorldLocationToScreen(v3, valueV2);
        let canvassize = new Type__default["default"].Vector2(1920, 1080);
        let windSize = this.GetWindowSize();
        let scaleX = canvassize.x / windSize.X;
        let scaleY = canvassize.y / windSize.Y;
        valueV2.value.X *= scaleX;
        valueV2.value.Y *= scaleY;
        out.x = valueV2.value.X;
        out.y = valueV2.value.Y;
      }
      posUtil2.getCanvasPointByWorld = getCanvasPointByWorld;
      function getPlayerController() {
        let pc = null;
        pc = GamePlay__default["default"].GetCurrentPlayer().Character.Actor.GetPlayerController();
        return pc;
      }
      posUtil2.getPlayerController = getPlayerController;
      function uiPos2WorldPos(SceneX, SceneY, Distance) {
        let WorldLocation = new UE__namespace.Vector(0);
        let WorldDirection = new UE__namespace.Vector(0);
        const WorldLocationRef = puerts__namespace.$ref(WorldLocation);
        const WorldDirectionRef = puerts__namespace.$ref(WorldDirection);
        let character = GamePlay__default["default"].GetCurrentPlayer().Character.Actor;
        character.GetPlayerController().DeprojectScreenPositionToWorld(SceneX, SceneY, WorldLocationRef, WorldDirectionRef);
        WorldLocation = puerts__namespace.$unref(WorldLocationRef);
        WorldDirection = puerts__namespace.$unref(WorldDirectionRef);
        const EndLocation = new Type__default["default"].Vector(WorldDirection.X * Distance + WorldLocation.X, WorldDirection.Y * Distance + WorldLocation.Y, WorldDirection.Z * Distance + WorldLocation.Z);
        return EndLocation;
      }
      posUtil2.uiPos2WorldPos = uiPos2WorldPos;
      function getWindowSize() {
        const inst = puerts__namespace.argv.getByName("Proxy");
        let ret = UE__namespace.WidgetLayoutLibrary.GetViewportSize(inst.Game);
        return ret;
      }
      posUtil2.getWindowSize = getWindowSize;
      function arr2Vec3(arr) {
        if (arr == null || arr.length != 3) {
          return null;
        }
        let vec = new Type__default["default"].Vector(arr[0], arr[1], arr[2]);
        return vec;
      }
      posUtil2.arr2Vec3 = arr2Vec3;
      function distance(a, b) {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) + (a.z - b.z) * (a.z - b.z));
      }
      posUtil2.distance = distance;
    })(posUtil || (posUtil = {}));

    var foreign18 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        get gameTag () { return gameTag; },
        get obj () { return obj; },
        get sound () { return sound; },
        get c2cEvents () { return c2cEvents; },
        get configId () { return configId; },
        get util () { return util; },
        get schedule () { return schedule; },
        get posUtil () { return posUtil; }
    }, Symbol.toStringTag, { value: 'Module' }));

    class Bullet {
      _go;
      _trigger;
      _oriLocaiton;
      _toLocation;
      _dir;
      _tag;
      _flySpeed = 50;
      _time;
      constructor(oriLocaiton, toLocation) {
        dist.oTrace("\u521B\u5EFA\u4F4D\u7F6E\uFF1A", this._oriLocaiton);
        this._oriLocaiton = oriLocaiton;
        this._toLocation = toLocation;
        this.creatGo();
      }
      creatGo() {
        this._go = DyObjUtil.Ins.createGo(obj.BULLET);
        this._go.location = this._oriLocaiton;
        this._go.SetCollision(Type__default["default"].PropertyStatus.Off);
        this._go.rotation = new Type__default["default"].Rotation(new Type__default["default"].Vector(90, 0, 90));
        this._trigger = DyObjUtil.Ins.createGo(obj.BOX_TRI);
        this._trigger.AttachToGameObject(this._go);
        this._trigger.scale = new Type__default["default"].Vector(0.4, 0.4, 0.4);
        this._trigger.SetRelativeLocation(Type__default["default"].Vector.ZERO);
        this._trigger.SetTag(gameTag.SCENE_TRIGGER);
        if (this._trigger) {
          dist.oTrace("\u89E6\u53D1\u5668\u521B\u5EFA\u5B8C\u6BD5\uFF01\uFF01");
        }
        this._trigger.OnEnter.Add(this.onTriggerIn.bind(this));
        this.startMove();
      }
      startMove() {
        this._dir = this._toLocation.Subtraction(this._oriLocaiton);
        dist.oTrace("\u65B9\u5411\uFF1A", this._dir.toString());
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
        } else if (Math.abs(max) == Math.abs(y)) {
          this._time = Math.abs(y) / this._flySpeed;
          let movex = x / this._time;
          let moveZ = z / this._time;
          if (y > 0) {
            this.move(movex, this._flySpeed, moveZ);
          } else {
            this.move(movex, -this._flySpeed, moveZ);
          }
        } else if (Math.abs(max) == Math.abs(z)) {
          this._time = Math.abs(z) / this._flySpeed;
          let movex = x / this._time;
          let movey = y / this._time;
          if (z > 0) {
            this.move(movex, movey, this._flySpeed);
          } else {
            this.move(movex, movey, -this._flySpeed);
          }
        } else {
          dist.oTrace("error @!!!!!!");
        }
      }
      move(x, y, z) {
        this._tag = setInterval(() => {
          let loc = this._go.location;
          loc.x = loc.x + x;
          loc.y = loc.y + y;
          loc.z = loc.z + z;
          this._go.location = loc;
        }, 10);
      }
      destroy() {
        if (this._tag) {
          clearInterval(this._tag);
        }
        let eff = dist.EffectManager.instance.playEffectInPos(obj.BULLET_EFF, this._go.location, 1);
        setTimeout(() => {
          dist.EffectManager.instance.stopEffect(eff);
        }, 2e3);
        if (this._trigger)
          DyObjUtil.Ins.destoryGo(this._trigger);
        if (this._go)
          DyObjUtil.Ins.destoryGo(this._go);
      }
      onTriggerIn(go) {
        if (GamePlay__default["default"].IsCharacter(go) || GamePlay__default["default"].IsBoxTrigger(go) || GamePlay__default["default"].IsSphereTrigger(go)) {
          return;
        }
        if (go) {
          dist.oTrace("\u5B50\u5F39\u63A5\u89E6\u5BF9\u8C61\uFF1A", go.GetName());
          if (go.GetTag() && go.GetTag() == gameTag.MON) {
            dist.ModuleManager.instance.getModule(MonsterModuleS).delMonHp(go.GetGuid());
          }
          this.destroy();
        }
      }
    }

    var foreign13 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        Bullet: Bullet
    }, Symbol.toStringTag, { value: 'Module' }));

    class RoleModuleC extends dist.ModuleC {
      bInWater = false;
      onAwake() {
      }
      loginSuccess() {
        dist.oTrace(GamePlay__default["default"].GetCurrentPlayer().Character.CharacterName + "ReqCanMove!");
        GamePlay__default["default"].GetCurrentPlayer().Character.CanMove = true;
      }
      getData() {
        return this.data;
      }
      net_HpChange() {
        Events__default["default"].DispatchLocal(c2cEvents.HP_CHANGE);
      }
      fire(pos) {
        let uipos = util.getTargetPos(pos);
        dist.oTrace("\u76EE\u6807\u4F4D\u7F6E\uFF01", uipos.toString());
        GamePlay__default["default"].GetCurrentPlayer().Character.PlayAnimation(obj.FIRE_ANIM);
        dist.SoundManager.instance.playSound(sound.SOUND_FIREID, 1);
        this.server.net_FireABullet(uipos);
      }
      net_GasTrapIn() {
        let player = GamePlay__default["default"].GetCurrentPlayer();
        player.Character.SetCloth(GamePlay__default["default"].BodyPartType.E_Body, obj.BEAR_DOLL);
        Events__default["default"].DispatchLocal(c2cEvents.TIPS, "\u4E2D\u6BD2\uFF01\u9677\u5165\u6C89\u77613S\uFF01");
      }
      net_JumpAreaIn() {
        let player = GamePlay__default["default"].GetCurrentPlayer();
        player.Character.SetCloth(GamePlay__default["default"].BodyPartType.E_Body, obj.ART_TEACHER);
        player.Character.MaxJumpHeight = 1e3;
        Events__default["default"].DispatchLocal(c2cEvents.GET_JUMP);
      }
    }
    class RoleModuleS extends dist.ModuleS {
      changePortal(player, portal) {
        let playerData = this.getPlayerData(player);
        playerData.dataInfo.indexPortal = portal;
        playerData.saveData(true);
      }
      delHP(player, dur) {
        let playerData = this.getPlayerData(player);
        if (playerData.dataInfo.buff)
          return;
        let hp = playerData.dataInfo.hp - dur;
        if (!playerData.dataInfo.isDead) {
          playerData.dataInfo.hp = hp;
          playerData.saveData(true);
          dist.ModuleManager.instance.getModule(GameModuleS).setData(player, playerData.dataInfo);
          this.callClientFun(player, this.client.net_HpChange());
        }
      }
      playerInWater(player) {
        this.delHP(player, 100);
      }
      net_FireABullet(pos, player) {
        let oriLoc = player.Character.location;
        let dir = player.Character.GetForwardVector().Multiply(100);
        dir.z = 40;
        oriLoc = oriLoc.Addition(dir);
        new Bullet(oriLoc, pos);
      }
      addBuff(player) {
        let playerData = this.getPlayerData(player);
        playerData.dataInfo.buff = true;
      }
      delBuff(player) {
        let playerData = this.getPlayerData(player);
        playerData.dataInfo.buff = false;
      }
      gasTrapIn(player) {
        this.callClientFun(player, this.client.net_GasTrapIn());
      }
      jumpAreaIn(player) {
        this.callClientFun(player, this.client.net_JumpAreaIn());
      }
    }

    var foreign7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        RoleModuleC: RoleModuleC,
        RoleModuleS: RoleModuleS
    }, Symbol.toStringTag, { value: 'Module' }));

    class Blade {
      id;
      location;
      go;
      _hp = "100";
      _guid;
      _trigger;
      angel = 10;
      originZ = 180;
      toZ = 600;
      constructor(_guid, location) {
        this._guid = _guid;
        this.location = location;
        this.creatGo();
      }
      getId() {
        return this.id;
      }
      creatGo() {
        this._hp = "100";
        this.go = DyObjUtil.Ins.createGo(this._guid);
        dist.ModuleManager.instance.getModule(MonsterModuleS).monsterReborn(this.id, this.go.GetGuid());
        this.id = this.go.GetGuid();
        dist.oTrace("  \u521B\u5EFA\u94E1\u5200\uFF01  ", this.id);
        this.go.location = this.location;
        this.go.SetTag(gameTag.MON);
        let ele = GameConfig.Monster.getElement(configId.BLADE_ID);
        this.go.scale = new Type__default["default"].Vector(ele.Scale[0], ele.Scale[1], ele.Scale[2]);
        this.go.rotation = new Type__default["default"].Rotation(new Type__default["default"].Vector(0, 0, 50));
        this.id = this.go.GetGuid();
        this._trigger = DyObjUtil.Ins.createGo(obj.BOX_TRI);
        this._trigger.AttachToGameObject(this.go);
        this._trigger.SetTag(gameTag.SCENE_TRIGGER);
        this._trigger.OnEnter.Add(this.OnTriggerIn.bind(this));
        this._trigger.OnLeave.Add(this.OnTriggerOut.bind(this));
        this._trigger.SetRelativeLocation(new Type__default["default"].Vector(100, 5, 10));
        this._trigger.SetRelativeRotation(new Type__default["default"].Rotation(new Type__default["default"].Vector(0, 0, 0)));
        this._trigger.scale = new Type__default["default"].Vector(24, 1.2, 1.2);
        setTimeout(() => {
          this.onUpdate();
        }, 2e3);
      }
      gameTag;
      updateCallback = () => {
        if (this.go.location.z >= this.toZ) {
          this.angel = -10;
        } else if (this.go.location.z <= this.originZ) {
          this.angel = 10;
        }
        let loc = this.go.location;
        loc.z = loc.z + this.angel;
        this.go.location = loc;
      };
      onUpdate() {
        schedule.updateCall(this.updateCallback);
      }
      ReBorn() {
        this.creatGo();
      }
      destroy() {
        dist.oTrace("\u53D6\u6D88\uFF01\uFF01\uFF01\uFF01", schedule.cancleUpdateCall(this.updateCallback));
        setTimeout(() => {
          if (this._trigger)
            DyObjUtil.Ins.destoryGo(this._trigger);
          if (this.go)
            DyObjUtil.Ins.destoryGo(this.go);
          setTimeout(() => {
            this.ReBorn();
          }, 3e3);
        }, 50);
      }
      getHP() {
        return this._hp;
      }
      delHP(dur) {
        let hp = +this.getHP() - dur;
        if (hp <= 0) {
          this._hp = "0";
          this.destroy();
        } else {
          this._hp = hp.toString();
        }
      }
      OnTriggerIn(go) {
        if (GamePlay__default["default"].IsCharacter(go)) {
          let cha = go;
          let player = cha.Player;
          dist.ModuleManager.instance.getModule(RoleModuleS).delHP(player, 100);
        }
      }
      OnTriggerOut(go) {
        if (GamePlay__default["default"].IsCharacter(go)) ;
      }
    }

    var foreign8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        Blade: Blade
    }, Symbol.toStringTag, { value: 'Module' }));

    class Monster {
      id;
      location;
      go;
      _hp = "100";
      _guid;
      _trigger;
      _angel = 20;
      _originX;
      _toX;
      _effId;
      constructor(guid, location) {
        this._guid = guid;
        this.location = location;
        dist.oTrace("  \u521B\u5EFA\u602A\u7269\uFF01\uFF01");
        this._originX = location.x;
        this._toX = this._originX + 2e3;
        this.creatMonster();
      }
      getId() {
        return this.id;
      }
      creatMonster() {
        this._hp = "100";
        this.go = DyObjUtil.Ins.createGo(this._guid);
        dist.ModuleManager.instance.getModule(MonsterModuleS).monsterReborn(this.id, this.go.GetGuid());
        this.id = this.go.GetGuid();
        this.go.location = this.location;
        this.go.SetTag(gameTag.MON);
        this._trigger = DyObjUtil.Ins.createGo(obj.BOX_TRI);
        this._trigger.AttachToGameObject(this.go);
        this._trigger.SetTag(gameTag.SCENE_TRIGGER);
        let di2go = DyObjUtil.Ins.createGo(this._guid);
        di2go.AttachToGameObject(this.go);
        this._trigger.OnEnter.Add(this.OnTriggerIn.bind(this));
        this._trigger.OnLeave.Add(this.OnTriggerOut.bind(this));
        let ele = GameConfig.Monster.getElement(configId.MONSTER_ID);
        this._trigger.scale = new Type__default["default"].Vector(ele.Scale[0], ele.Scale[1], ele.Scale[2]);
        if (this.location.y == -9345) {
          this.go.rotation = new Type__default["default"].Rotation(new Type__default["default"].Vector(-90, 0, 0));
          this._trigger.SetRelativeLocation(new Type__default["default"].Vector(0, 0, 1e3));
          this._effId = dist.EffectManager.instance.playEffectInGameObject(obj.MON_EFF, this.go, 0, Type__default["default"].Vector.ZERO, new Type__default["default"].Vector(0, 180, 0));
        } else {
          this.go.rotation = new Type__default["default"].Rotation(new Type__default["default"].Vector(90, 0, 0));
          this._trigger.SetRelativeLocation(new Type__default["default"].Vector(0, 0, 1e3));
          this._effId = dist.EffectManager.instance.playEffectInGameObject(obj.MON_EFF, this.go, 0, Type__default["default"].Vector.ZERO, new Type__default["default"].Vector(0, -180, 0));
        }
        setTimeout(() => {
          this.onUpdate();
        }, 2e3);
      }
      updateCallback = () => {
        if (this.go.location.x >= this._toX) {
          this._angel = -5;
        } else if (this.go.location.x <= this._originX) {
          this._angel = 5;
        }
        let loc = this.go.location;
        loc.x = loc.x + this._angel;
        this.go.location = loc;
      };
      onUpdate() {
        schedule.updateCall(this.updateCallback);
      }
      reBorn() {
        this.creatMonster();
      }
      destroy() {
        dist.oTrace("\u53D6\u6D88\uFF01\uFF01\uFF01\uFF01", schedule.cancleUpdateCall(this.updateCallback));
        dist.EffectManager.instance.stopEffect(this._effId);
        let eff = dist.EffectManager.instance.playEffectInPos(obj.MON_DEAD_EFF, this.go.location, 1, new Type__default["default"].Vector(0, 180, 0));
        if (eff) {
          setTimeout(() => {
            dist.EffectManager.instance.stopEffect(eff);
          }, 2e3);
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
          }, 5e3);
        }, 50);
      }
      getHP() {
        return this._hp;
      }
      delHP(dur) {
        let hp = +this.getHP() - dur;
        if (hp <= 0) {
          this._hp = "0";
          this.destroy();
        } else {
          this._hp = hp.toString();
        }
      }
      timeMap = /* @__PURE__ */ new Map();
      OnTriggerIn(go) {
        if (GamePlay__default["default"].IsCharacter(go)) {
          let cha = go;
          let player = cha.Player;
          dist.ModuleManager.instance.getModule(RoleModuleS).delHP(player, 20);
          let num = setInterval(() => {
            if (this._trigger.InArea(player.Character)) {
              dist.ModuleManager.instance.getModule(RoleModuleS).delHP(player, 20);
            }
          }, 1e3);
          this.timeMap.set(player.GetPlayerID(), num);
        }
      }
      OnTriggerOut(go) {
        if (GamePlay__default["default"].IsCharacter(go)) {
          let cha = go;
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

    var foreign9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        Monster: Monster
    }, Symbol.toStringTag, { value: 'Module' }));

    class MonsterModuleC extends dist.ModuleC {
      aimed(str) {
        this.server.net_ReqMonHp(str);
      }
      net_RspMonHp(hp) {
        Events__default["default"].DispatchLocal(c2cEvents.MON_HP, hp);
      }
      net_RspMonTag(id) {
        MWCore__default["default"].GameObject.AsyncFind(id).then((value) => {
          dist.oTrace("\u627E\u5230\u4E86\uFF01\uFF01\uFF01\uFF01");
          let go = value;
          go.SetTag(gameTag.MON);
        });
      }
      net_RspBulletEff(loc) {
        let eff = DyObjUtil.Ins.createGo(obj.BULLET_EFF);
        if (eff) {
          dist.oTrace("\u521B\u5EFA\u5B50\u5F39\u7206\u70B8\u7279\u6548\uFF01");
          eff.scale = new Type__default["default"].Vector(0.2, 0.2, 0.2);
          eff.location = loc;
          eff.SetLoop(false);
          eff.Play();
          setTimeout(() => {
            DyObjUtil.Ins.destoryGo(eff);
          }, 2e3);
        }
      }
      net_SetBladeTag(id) {
        MWCore__default["default"].GameObject.AsyncFind(id).then((value) => {
          dist.oTrace("\u5BA2\u6237\u7AEF\u8BBE\u7F6Eblade Tag", id);
          value.SetTag(gameTag.MON);
        });
      }
    }
    class MonsterModuleS extends dist.ModuleS {
      _monMap = /* @__PURE__ */ new Map();
      onAwake() {
        let ele = GameConfig.Monster.getElement(configId.MONSTER_ID);
        for (let index = 0; index < ele.Pos.length; index++) {
          let monster = new Monster(ele.ModleId, new Type__default["default"].Vector(ele.Pos[index][0], ele.Pos[index][1], ele.Pos[index][2]));
          this._monMap.set(monster.getId(), monster);
        }
        ele = GameConfig.Monster.getElement(configId.BLADE_ID);
        for (let index = 0; index < ele.Pos.length; index++) {
          let blade = new Blade(ele.ModleId, new Type__default["default"].Vector(ele.Pos[index][0], ele.Pos[index][1], ele.Pos[index][2]));
          this._monMap.set(blade.getId(), blade);
        }
      }
      delMonHp(str) {
        if (this._monMap.has(str)) {
          let mon = this._monMap.get(str);
          mon.delHP(100);
        }
      }
      monsterReborn(oldNum, newNum) {
        if (this._monMap.has(oldNum)) {
          dist.oTrace("\u5220\u6389\u65E7\u7684id\uFF1A", oldNum);
          let mon = this._monMap.get(oldNum);
          this._monMap.set(newNum, mon);
          this._monMap.delete(oldNum);
        }
      }
      rspMonsterTag(player) {
        let itr = this._monMap.values();
        for (let i = 0; i < this._monMap.size; i++) {
          let batRole = itr.next().value;
          this.callClientFun(player, this.client.net_RspMonTag(batRole.getId()));
        }
      }
      rspBulletEff(player, loc) {
        this.callClientFun(player, this.client.net_RspBulletEff(loc));
      }
      setBladeTag(player, id) {
        this.callClientFun(player, this.client.net_SetBladeTag(id));
      }
      net_ReqMonHp(str, player) {
        if (this._monMap.has(str)) {
          let mon = this._monMap.get(str);
          let hp = mon.getHP();
          this.callClientFun(player, this.client.net_RspMonHp(hp));
        }
      }
    }

    var foreign12 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        MonsterModuleC: MonsterModuleC,
        MonsterModuleS: MonsterModuleS
    }, Symbol.toStringTag, { value: 'Module' }));

    class RoleInfo extends dist.DataInfo {
      hp;
      maxHp;
      attack;
      isDead;
      buff;
      indexPortal;
    }
    class RoleDataHelper extends dist.ModuleData {
      initDefaultData() {
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

    var foreign6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        RoleInfo: RoleInfo,
        RoleDataHelper: RoleDataHelper
    }, Symbol.toStringTag, { value: 'Module' }));

    class UI_InitUIBase extends dist.SuperPanelBase {
      btnFire;
      btnSkill;
      playerHP;
      monsterHP;
      text;
      mpic;
      btnJump;
      constructor() {
        super("InitUI");
      }
      buildSelf() {
        this.btnFire = this.findChildByPath(MWGameUI__default["default"].MWUIButton, "RootCanvas/btnFire");
        this.btnSkill = this.findChildByPath(MWGameUI__default["default"].MWUIButton, "RootCanvas/btnSkill");
        this.playerHP = this.findChildByPath(MWGameUI__default["default"].MWUIProgressbar, "RootCanvas/playerHP");
        this.monsterHP = this.findChildByPath(MWGameUI__default["default"].MWUIProgressbar, "RootCanvas/monsterHP");
        this.text = this.findChildByPath(MWGameUI__default["default"].MWUITextblock, "RootCanvas/text");
        this.mpic = this.findChildByPath(MWGameUI__default["default"].MWUIImage, "RootCanvas/mpic");
        this.btnJump = this.findChildByPath(MWGameUI__default["default"].MWUIButton, "RootCanvas/btnJump");
        this.btnFire.SetFocusable(false);
        this.btnFire.OnClicked().Add(() => {
          Events__default["default"].DispatchLocal("PlayButtonClick", "btnFire");
        });
        this.btnSkill.SetFocusable(false);
        this.btnSkill.OnClicked().Add(() => {
          Events__default["default"].DispatchLocal("PlayButtonClick", "btnSkill");
        });
        this.btnJump.SetFocusable(false);
        this.btnJump.OnClicked().Add(() => {
          Events__default["default"].DispatchLocal("PlayButtonClick", "btnJump");
        });
      }
    }
    class UI_MonsterHpBase extends dist.SuperPanelBase {
      monsterHp;
      constructor() {
        super("MonsterHp");
      }
      buildSelf() {
        this.monsterHp = this.findChildByPath(MWGameUI__default["default"].MWUIProgressbar, "MWCanvas_2147482460/monsterHp");
      }
    }
    class UI_TipsUIBase extends dist.SuperPanelBase {
      root;
      constructor() {
        super("TipsUI");
      }
      buildSelf() {
        this.root = this.findChildByPath(MWGameUI__default["default"].MWUICanvas, "root");
      }
    }
    class UI_UIRootBase extends dist.SuperPanelBase {
      constructor() {
        super("UIRoot");
      }
      buildSelf() {
      }
    }

    var foreign1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        UI_InitUIBase: UI_InitUIBase,
        UI_MonsterHpBase: UI_MonsterHpBase,
        UI_TipsUIBase: UI_TipsUIBase,
        UI_UIRootBase: UI_UIRootBase
    }, Symbol.toStringTag, { value: 'Module' }));

    class InitUI extends UI_InitUIBase {
      skillCd = 0;
      fireCd = 0;
      getWeapon = false;
      onStart() {
        util.setVisible(this.btnFire, false);
        util.setVisible(this.btnSkill, false);
        util.setVisible(this.playerHP, false);
        util.setVisible(this.monsterHP, false);
        util.setVisible(this.text, false);
        util.setVisible(this.btnJump, false);
        setInterval(() => {
          this.setFireCd();
          this.setSkillCd();
        }, 100);
        Events__default["default"].AddLocalListener(c2cEvents.TIPS, (str) => {
          this.tips(str);
        });
        Events__default["default"].AddLocalListener(c2cEvents.LOGIN, (playerData) => {
          this.playerHP.SetPercent(playerData.dataInfo.hp / playerData.dataInfo.maxHp);
          util.setVisible(this.playerHP, true);
          this.tips("\u8BD5\u70BC\u5F00\u59CB\uFF01");
          dist.ModuleManager.instance.getModule(RoleModuleC).loginSuccess();
        });
        Events__default["default"].AddLocalListener(c2cEvents.HP_CHANGE, () => {
          let roleInfo = dist.DataCenterC.instance.getModuleData(RoleDataHelper).dataInfo;
          let per = roleInfo.hp / roleInfo.maxHp;
          this.playerHP.SetPercent(per);
        });
        Events__default["default"].AddLocalListener(c2cEvents.GET_WEAPON, () => {
          if (this.getWeapon)
            return;
          this.getWeapon = true;
          util.setVisible(this.btnFire, true);
          this.tips("\u83B7\u5F97\u98DE\u9556\u6B66\u5668!");
        });
        Events__default["default"].AddLocalListener(c2cEvents.GET_SKILL, () => {
          if (this.btnSkill.GetVisibility() != MWGameUI__default["default"].ESlateVisibility.Hidden)
            return;
          util.setVisible(this.btnSkill, true);
          this.tips("\u83B7\u5F97\u65E0\u654C\u6280\u80FD!");
        });
        Events__default["default"].AddLocalListener(c2cEvents.GET_JUMP, () => {
          if (this.btnJump.GetVisibility() != MWGameUI__default["default"].ESlateVisibility.Hidden)
            return;
          util.setVisible(this.btnJump, true);
          this.tips("\u83B7\u5F97\u8DF3\u8DC3\u6280\u80FD!");
        });
        Events__default["default"].AddLocalListener(c2cEvents.MON_HP, (hp) => {
          if (hp) {
            util.setVisible(this.monsterHP, true);
            let per = +hp / 100;
            this.monsterHP.SetPercent(per);
          }
        });
        Events__default["default"].AddLocalListener(c2cEvents.UNEQUIP_SKILL, () => {
          util.setVisible(this.btnSkill, false);
        });
        this.btnSkill.OnClicked().Add(() => {
          dist.oTrace("\u52A0 buff");
          this.skillCd = 6;
          dist.ModuleManager.instance.getModule(BuffModuleC).addBuff();
        });
        this.btnJump.OnClicked().Add(() => {
          let player = GamePlay__default["default"].GetCurrentPlayer();
          player.Character.Jump();
        });
        this.btnFire.OnClicked().Add(async () => {
          this.fire();
        });
        dist.InputManager.instance.onKeyDown(Type__default["default"].Keys.T).add(() => {
          this.fire();
        });
        this.check();
      }
      onShow(...params) {
      }
      uiPos;
      aimed = () => {
        const inst = puerts__namespace.argv.getByName("Proxy");
        let ret = UE__namespace.WidgetLayoutLibrary.GetViewportSize(inst.Game);
        this.uiPos = new Type__default["default"].Vector(ret.X * 0.51, ret.Y * 0.45, 0);
        let pos = util.getTargetId(this.uiPos);
        if (pos) {
          dist.ModuleManager.instance.getModule(MonsterModuleC).aimed(pos);
        } else {
          this.hideMonHP();
        }
      };
      hideMonHP() {
        util.setVisible(this.monsterHP, false);
      }
      check() {
        setInterval(this.aimed, 200);
      }
      tips(str) {
        this.text.SetText(str);
        util.setVisible(this.text, true);
        setTimeout(() => {
          util.setVisible(this.text, false);
        }, 3e3);
      }
      fire() {
        if (!this.getWeapon) {
          return;
        }
        this.fireCd = 0.5;
        let rmc = dist.ModuleManager.instance.getModule(RoleModuleC);
        if (rmc) {
          rmc.fire(this.uiPos);
        }
      }
      setFireCd() {
        if (this.fireCd && this.fireCd > 0) {
          this.btnFire.SetIsEnabled(false);
          this.btnFire.SetButtonString(this.fireCd.toFixed(1));
          this.fireCd -= 0.1;
        } else {
          this.btnFire.SetIsEnabled(true);
          this.btnFire.SetButtonString("\u53D1\u5C04");
        }
      }
      setSkillCd() {
        if (this.skillCd && this.skillCd > 0) {
          this.btnSkill.SetIsEnabled(false);
          this.btnSkill.SetButtonString(this.skillCd.toFixed(1));
          this.skillCd -= 0.1;
        } else {
          this.btnSkill.SetIsEnabled(true);
          this.btnSkill.SetButtonString("buff");
        }
      }
    }

    var foreign10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        'default': InitUI
    }, Symbol.toStringTag, { value: 'Module' }));

    class GameModuleC extends dist.ModuleC {
      _player;
      async onStart() {
        dist.UI.instance.openPanel(InitUI);
        GamePlay__default["default"].AsyncGetCurrentPlayer().then((player) => {
          this._player = player;
          this._player.Character.CharacterName = "";
        });
        let res = await this.server.net_Login();
        dist.oTrace("\u767B\u5F55\u8FD4\u56DEC\u7AEF ", res);
      }
      onEnterScene(sceneType) {
        Events__default["default"].DispatchLocal(c2cEvents.LOGIN, dist.ModuleManager.instance.getModule(RoleModuleC).getData());
      }
      net_RagDollTrue() {
        let player = GamePlay__default["default"].GetCurrentPlayer();
        player.Character.Ragdoll(true);
      }
      net_RagDollFalse(playerData) {
        let player = GamePlay__default["default"].GetCurrentPlayer();
        player.Character.Ragdoll(false);
        dist.ModuleManager.instance.getModule(RoleModuleC).bInWater = false;
        if (playerData)
          Events__default["default"].DispatchLocal(c2cEvents.HP_CHANGE, playerData);
      }
    }
    class GameModuleS extends dist.ModuleS {
      _arrPlayers = new Array();
      _effMap = /* @__PURE__ */ new Map();
      onStart() {
        dist.DataCenterS.instance.onPlayerJoined.add(this.onPlayerJoinGame, this);
        dist.DataCenterS.instance.onPlayerLeft.add(this.onPlayerLeftGame, this);
      }
      onPlayerLeftGame(player) {
        let index = this._arrPlayers.findIndex((p) => p.GetPlayerID() === player.GetPlayerID());
        if (index >= 0) {
          dist.oTrace("left game index ", index);
          this._arrPlayers.splice(index, 1);
        }
      }
      onPlayerJoinGame(player) {
        this._arrPlayers.push(player);
      }
      net_Login(player) {
        dist.oTrace("net_Login this.playerDataMap size ", this._arrPlayers.length);
        dist.ModuleManager.instance.getModule(MonsterModuleS).rspMonsterTag(player);
        return player;
      }
      setData(player, data) {
        if (data.hp <= 0) {
          data.isDead = true;
          this.ragDollTrue(player);
          setTimeout(() => {
            this.reBorn(player);
          }, 3e3);
        }
      }
      reBorn(player) {
        let pdata = dist.DataCenterS.instance.getPlayerData(player).getModuleData(RoleDataHelper);
        switch (pdata.dataInfo.indexPortal) {
          case 0:
            player.Character.location = new Type__default["default"].Vector(-13006.133, -10572.19, 268.807);
            break;
          case 1:
            player.Character.location = new Type__default["default"].Vector(-5610, -6213, 120.32);
            break;
          case 2:
            player.Character.location = new Type__default["default"].Vector(-9475.878, 1537.402, 160.531);
            break;
        }
        pdata.dataInfo.hp = pdata.dataInfo.maxHp;
        pdata.dataInfo.isDead = false;
        pdata.saveData(true);
        this.ragDollFalse(player, pdata.dataInfo);
      }
      getPlayers() {
        return this._arrPlayers;
      }
      ragDollTrue(player) {
        this.callClientFun(player, this.client.net_RagDollTrue());
      }
      ragDollFalse(player, pdata) {
        this.callClientFun(player, this.client.net_RagDollFalse(pdata));
      }
      addBuffEff(player) {
        let effId = dist.EffectManager.instance.playEffectInGameObject(obj.BUFF_EFF, player.Character, 0, new Type__default["default"].Vector(0, 0, -100));
        this._effMap.set(player.GetPlayerID(), effId);
      }
      delBuffEff(player) {
        let pid = player.GetPlayerID();
        if (this._effMap.has(pid)) {
          dist.EffectManager.instance.stopEffect(this._effMap.get(pid));
          this._effMap.delete(pid);
        }
      }
    }

    var foreign22 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        GameModuleC: GameModuleC,
        GameModuleS: GameModuleS
    }, Symbol.toStringTag, { value: 'Module' }));

    class BuffModuleC extends dist.ModuleC {
      addBuff() {
        this.server.net_ReqAddBuff();
      }
    }
    class BuffModuleS extends dist.ModuleC {
      net_ReqAddBuff(player) {
        dist.ModuleManager.instance.getModule(RoleModuleS).addBuff(player);
        dist.ModuleManager.instance.getModule(GameModuleS).addBuffEff(player);
        setTimeout(() => {
          dist.ModuleManager.instance.getModule(RoleModuleS).delBuff(player);
          dist.ModuleManager.instance.getModule(GameModuleS).delBuffEff(player);
        }, 3e3);
      }
    }

    var foreign2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        BuffModuleC: BuffModuleC,
        BuffModuleS: BuffModuleS
    }, Symbol.toStringTag, { value: 'Module' }));

    class Portal {
      _locaiton;
      _targetLoc;
      _trigger;
      _portalIndex = 0;
      constructor(index, location, targetLoc) {
        this._portalIndex = index;
        this._locaiton = location;
        this._targetLoc = targetLoc;
        this.creatGo();
      }
      creatGo() {
        this._trigger = DyObjUtil.Ins.createGo(obj.BOX_TRI);
        this._trigger.location = this._locaiton;
        this._trigger.scale = new Type__default["default"].Vector(2, 2, 2);
        dist.EffectManager.instance.playEffectInGameObject(obj.PORTAL_EFF, this._trigger, 0, new Type__default["default"].Vector(0, 0, -40));
        this._trigger.SetTag(gameTag.SCENE_TRIGGER);
        this._trigger.OnEnter.Add(this.onTriggerIn.bind(this));
      }
      getId() {
        return this._trigger.GetGuid();
      }
      getGo() {
        return this._trigger;
      }
      onTriggerIn(go) {
        if (GamePlay__default["default"].IsCharacter(go)) {
          let cha = go;
          let transform = cha.GetTransform();
          transform.SetLocation(this._targetLoc);
          dist.ModuleManager.instance.getModule(RoleModuleS).changePortal(cha.Player, this._portalIndex + 1);
          cha.SetTransform(transform);
        }
      }
    }

    var foreign14 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        Portal: Portal
    }, Symbol.toStringTag, { value: 'Module' }));

    class PortalModuleC extends dist.ModuleC {
      onAwake() {
      }
    }
    class PortalModuleS extends dist.ModuleS {
      onAwake() {
        new Portal(0, new Type__default["default"].Vector(-3259, -10621, 200), new Type__default["default"].Vector(-5610, -6213, 200));
        new Portal(1, new Type__default["default"].Vector(-9888.36, -2557.49, 108.32), new Type__default["default"].Vector(-9475.88, 1537.4, 160.53));
        new Portal(2, new Type__default["default"].Vector(-4843.76, 3857.39, 312), new Type__default["default"].Vector(-3840.2, 8479.89, 279.47));
      }
    }

    var foreign15 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        PortalModuleC: PortalModuleC,
        PortalModuleS: PortalModuleS
    }, Symbol.toStringTag, { value: 'Module' }));

    class SkillTreasure {
      _locaiton;
      _go;
      _trigger;
      constructor(location) {
        this._locaiton = location;
        this.creatGo();
      }
      creatGo() {
        this._go = DyObjUtil.Ins.createGo(obj.TREASURE_BOX);
        this._go.location = this._locaiton;
        this._go.rotation = new Type__default["default"].Rotation(0, 0, 45);
        dist.EffectManager.instance.playEffectInGameObject(obj.TREASURE_EFF, this._go, 0, new Type__default["default"].Vector(0, 0, 50));
        this._trigger = DyObjUtil.Ins.createGo(obj.BOX_TRI);
        this._trigger.location = this._locaiton;
        this._trigger.scale = new Type__default["default"].Vector(2, 2, 2);
        this._trigger.SetTag(gameTag.SCENE_TRIGGER);
        this._trigger.OnEnter.Add(this.onTriggerIn.bind(this));
      }
      getId() {
        return this._trigger.GetGuid();
      }
      onTriggerIn(go) {
        let player = GamePlay__default["default"].GetCurrentPlayer();
        if (go == player.Character) {
          Events__default["default"].DispatchLocal(c2cEvents.GET_SKILL);
        }
      }
    }

    var foreign23 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        SkillTreasure: SkillTreasure
    }, Symbol.toStringTag, { value: 'Module' }));

    class WeaponTreasure {
      _locaiton;
      _go;
      _trigger;
      constructor(location) {
        this._locaiton = location;
        this.creatGo();
      }
      creatGo() {
        this._go = DyObjUtil.Ins.createGo(obj.TREASURE_BOX);
        this._go.location = this._locaiton;
        this._go.rotation = new Type__default["default"].Rotation(0, 0, -90);
        dist.EffectManager.instance.playEffectInGameObject(obj.TREASURE_EFF, this._go, 0, new Type__default["default"].Vector(0, 0, 50));
        this._trigger = DyObjUtil.Ins.createGo(obj.BOX_TRI);
        this._trigger.location = this._locaiton;
        this._trigger.scale = new Type__default["default"].Vector(2, 2, 2);
        this._trigger.SetTag(gameTag.SCENE_TRIGGER);
        this._trigger.OnEnter.Add(this.onTriggerIn.bind(this));
      }
      getId() {
        return this._trigger.GetGuid();
      }
      onTriggerIn(go) {
        let player = GamePlay__default["default"].GetCurrentPlayer();
        if (go == player.Character) {
          Events__default["default"].DispatchLocal(c2cEvents.GET_WEAPON);
        }
      }
    }

    var foreign25 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        WeaponTreasure: WeaponTreasure
    }, Symbol.toStringTag, { value: 'Module' }));

    class TreasureModuleC extends dist.ModuleC {
      onAwake() {
        new WeaponTreasure(new Type__default["default"].Vector(-13207, -10890, 169));
        new SkillTreasure(new Type__default["default"].Vector(-4517, -5383, 2));
      }
    }
    class TreasureModuleS extends dist.ModuleS {
      onAwake() {
      }
    }

    var foreign24 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        TreasureModuleC: TreasureModuleC,
        TreasureModuleS: TreasureModuleS
    }, Symbol.toStringTag, { value: 'Module' }));

    class TriggerEvents {
      id;
      Trigger;
      constructor(loc) {
        this.Trigger = DyObjUtil.Ins.createGo(obj.BOX_TRI);
        this.Trigger.location = loc;
        let ele = GameConfig.Monster.getElement(configId.TRIGGER_ID);
        this.Trigger.scale = new Type__default["default"].Vector(ele.Scale[0], ele.Scale[1], ele.Scale[2]);
        this.Trigger.rotation = new Type__default["default"].Rotation(new Type__default["default"].Vector(0, 0, 30));
        this.Trigger.OnEnter.Add(this.OnTriggerIn.bind(this));
      }
      OnTriggerIn(go) {
        if (!GamePlay__default["default"].IsCharacter(go))
          return;
        let cha = go;
        let player = cha.Player;
        if (this.id == 1 || this.id == 3 || this.id == 5) {
          if (!this.x) {
            this.x = 0;
            dist.ModuleManager.instance.getModule(GameModuleS).ragDollTrue(player);
            dist.ModuleManager.instance.getModule(RoleModuleS).gasTrapIn(player);
            dist.oTrace("\u65F6\u95F4\u7684\uFF1A", this.x);
            this.SetPoisonDamage(player);
            setTimeout(() => {
              dist.ModuleManager.instance.getModule(GameModuleS).ragDollFalse(player);
            }, 3e3);
          }
        } else if (this.id == 2) {
          dist.ModuleManager.instance.getModule(RoleModuleS).jumpAreaIn(player);
        }
      }
      GetID() {
        return this.id;
      }
      SetID(num) {
        this.id = num;
      }
      x;
      SetPoisonDamage(player) {
        if (this.x != null) {
          if (this.x < 3) {
            this.x += 1;
            dist.ModuleManager.instance.getModule(RoleModuleS).delHP(player, 10);
            setTimeout(() => {
              this.SetPoisonDamage(player);
            }, 1e3);
          } else {
            setTimeout(() => {
              this.x = null;
            }, 200);
          }
        } else {
          return;
        }
      }
    }

    var foreign19 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        TriggerEvents: TriggerEvents
    }, Symbol.toStringTag, { value: 'Module' }));

    class WaterTrigger {
      _locaiton;
      _trigger;
      constructor(location) {
        this._locaiton = location;
        this.creatGo();
      }
      creatGo() {
        this._trigger = DyObjUtil.Ins.createGo(obj.BOX_TRI);
        this._trigger.location = this._locaiton;
        this._trigger.scale = new Type__default["default"].Vector(115, 30, 1);
        this._trigger.SetTag(gameTag.SCENE_TRIGGER);
        this._trigger.OnEnter.Add(this.onTriggerIn.bind(this));
      }
      getId() {
        return this._trigger.GetGuid();
      }
      onTriggerIn(go) {
        if (GamePlay__default["default"].IsCharacter(go)) {
          let cha = go;
          dist.ModuleManager.instance.getModule(RoleModuleS).playerInWater(cha.Player);
        }
      }
    }

    var foreign21 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        WaterTrigger: WaterTrigger
    }, Symbol.toStringTag, { value: 'Module' }));

    class TriggerModuleC extends dist.ModuleC {
      onAwake() {
      }
    }
    class TriggerModuleS extends dist.ModuleS {
      onAwake() {
        new WaterTrigger(new Type__default["default"].Vector(-8637, -10826, 10));
        let ele = GameConfig.Monster.getElement(configId.TRIGGER_ID);
        for (let index = 0; index < ele.Pos.length; index++) {
          let trigger = new TriggerEvents(new Type__default["default"].Vector(ele.Pos[index][0], ele.Pos[index][1], ele.Pos[index][2]));
          trigger.SetID(index);
        }
      }
    }

    var foreign20 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        TriggerModuleC: TriggerModuleC,
        TriggerModuleS: TriggerModuleS
    }, Symbol.toStringTag, { value: 'Module' }));

    var __defProp$1 = Object.defineProperty;
    var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
    var __decorateClass$1 = (decorators, target, key, kind) => {
      var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
      for (var i = decorators.length - 1, decorator; i >= 0; i--)
        if (decorator = decorators[i])
          result = (kind ? decorator(target, key, result) : decorator(result)) || result;
      if (kind && result)
        __defProp$1(target, key, result);
      return result;
    };
    let GameLauncher = class extends dist.OdinGame {
      preloadAssets = "";
      OnStart() {
        super.OnStart();
        this.bUseUpdate = true;
        dist.oTrace("game launcher !!!!!");
      }
      OnUpdate(dt) {
        super.OnUpdate(dt);
        schedule.tick(dt);
      }
      onRegisterModule() {
        dist.ModuleManager.instance.register(MonsterModuleS, MonsterModuleC, null);
        dist.ModuleManager.instance.register(BuffModuleS, BuffModuleC, null);
        dist.ModuleManager.instance.register(RoleModuleS, RoleModuleC, RoleDataHelper);
        dist.ModuleManager.instance.register(TriggerModuleS, TriggerModuleC, null);
        dist.ModuleManager.instance.register(TreasureModuleS, TreasureModuleC, null);
        dist.ModuleManager.instance.register(PortalModuleS, PortalModuleC, null);
        dist.ModuleManager.instance.register(GameModuleS, GameModuleC, null);
        dist.oTrace("onRegisterModule ");
      }
      onPreloadAssets() {
        let soundDataArr = [];
        soundDataArr.push({ resName: sound.SOUND_FIRE, resId: sound.SOUND_FIREID });
        dist.PreloadRes.addSound(soundDataArr);
      }
      async initClient() {
        await super.initClient();
        dist.oTrace("initClient start");
        dist.ModuleManager.instance.startAllModule();
        dist.ModuleManager.instance.enterSceneAllModule(2);
        dist.oTrace("initClient end");
      }
    };
    __decorateClass$1([
      MWCore__default["default"].MWProperty()
    ], GameLauncher.prototype, "preloadAssets", 2);
    GameLauncher = __decorateClass$1([
      MWCore__default["default"].MWClass
    ], GameLauncher);
    var GameLauncher$1 = GameLauncher;

    var foreign0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        'default': GameLauncher$1
    }, Symbol.toStringTag, { value: 'Module' }));

    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __decorateClass = (decorators, target, key, kind) => {
      var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
      for (var i = decorators.length - 1, decorator; i >= 0; i--)
        if (decorator = decorators[i])
          result = (kind ? decorator(target, key, result) : decorator(result)) || result;
      if (kind && result)
        __defProp(target, key, result);
      return result;
    };
    let UIRoot = class extends dist.UI {
      selfShow = false;
      loading;
      progressBar;
      msg_txt;
      targetPercent = 0;
      loadingCompleteCallback;
      onStart() {
        this.loading = this.findChildByPath(MWGameUI__default["default"].MWUICanvas, "Canvas/Loading");
        this.progressBar = this.findChildByPath(MWGameUI__default["default"].MWUIProgressbar, "Canvas/Loading/ProgressBar");
        this.msg_txt = this.findChildByPath(MWGameUI__default["default"].MWUITextblock, "Canvas/Loading/Msg_txt");
      }
      onUpdate(dt) {
        if (!this.selfShow)
          return;
        let value = this.progressBar.GetCurrentValue();
        if (value >= this.targetPercent) {
          if (this.loadingCompleteCallback != null) {
            this.loadingCompleteCallback();
            this.loadingCompleteCallback = null;
          }
          return;
        }
        value += dt * 0.4;
        this.progressBar.SetCurrentValue(value);
      }
      onShowLoading(msg, targetPercent, complete) {
        this.selfShow = true;
        if (this.loading.GetVisibility() == MWGameUI__default["default"].ESlateVisibility.Hidden) {
          this.progressBar.SetCurrentValue(0);
          this.loading.SetVisibility(MWGameUI__default["default"].ESlateVisibility.Visible);
          this.loading.GetSlot().SetZOrder(Number.MAX_VALUE);
        }
        this.targetPercent = Math.min(1, targetPercent);
        this.loadingCompleteCallback = complete;
        this.msg_txt.SetText(msg);
      }
      onHideLoading() {
        this.selfShow = false;
        if (this.progressBar.GetCurrentValue() >= 1) {
          this.loading.SetVisibility(MWGameUI__default["default"].ESlateVisibility.Hidden);
        }
      }
    };
    UIRoot = __decorateClass([
      MWGameUI__default["default"].MWUIMono
    ], UIRoot);

    var foreign11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        get default () { return UIRoot; }
    }, Symbol.toStringTag, { value: 'Module' }));

    var foreign26 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null
    }, Symbol.toStringTag, { value: 'Module' }));

    const MWModuleMap = {
      "JavaScripts/GameLauncher": foreign0,
      "JavaScripts/UITemplate": foreign1,
      "JavaScripts/buff/BuffModule": foreign2,
      "JavaScripts/config/ConfigBase": foreign3,
      "JavaScripts/config/GameConfig": foreign4,
      "JavaScripts/config/Monster": foreign5,
      "JavaScripts/role/RoleDataHelper": foreign6,
      "JavaScripts/role/RoleModule": foreign7,
      "JavaScripts/monster/Blade": foreign8,
      "JavaScripts/monster/Monster": foreign9,
      "JavaScripts/ui/InitUI": foreign10,
      "JavaScripts/ui/UIRoot": foreign11,
      "JavaScripts/monster/MonsterModule": foreign12,
      "JavaScripts/bullet/Bullet": foreign13,
      "JavaScripts/portal/Portal": foreign14,
      "JavaScripts/portal/PortalModule": foreign15,
      "JavaScripts/tool/DyObjUtil": foreign16,
      "JavaScripts/tool/LinkedList": foreign17,
      "JavaScripts/tool/Util": foreign18,
      "JavaScripts/trigger/TriggerEvents": foreign19,
      "JavaScripts/trigger/TriggerModule": foreign20,
      "JavaScripts/trigger/WaterTrigger": foreign21,
      "JavaScripts/game/GameModule": foreign22,
      "JavaScripts/treasure/SkillTreasure": foreign23,
      "JavaScripts/treasure/TreasureModule": foreign24,
      "JavaScripts/treasure/WeaponTreasure": foreign25,
      "JavaScripts/interface/BattleRole": foreign26
    };

    exports.MWModuleMap = MWModuleMap;

    Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

}));
//# sourceMappingURL=game.js.map
