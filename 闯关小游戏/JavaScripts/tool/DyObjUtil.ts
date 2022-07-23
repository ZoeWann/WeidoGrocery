/*
 * @Author: your name
 * @Date: 2022-01-18 16:48:43
 * @LastEditTime: 2022-07-22 09:55:16
 * @LastEditors: Please set LastEditors
 * @Description: 动态创建通用方法类
 * @FilePath: \JavaScripts\DyObjUtil.ts
 */
export class DyObjUtil {


    public static Ins = new DyObjUtil();
    private _map: Map<string, boolean> = new Map();
    private _delayIdMap: Map<string, number> = new Map();
    public setIds(ids: string) {
        let arr = ids.split(",");
        arr.forEach(element => {
            this._map.set(element, true);
        });
    }

    public createGo<T extends MWCore.GameObject>(guid: string) {
        if (this._map.has(guid) == false) {
            //Events.DispatchLocal(C2CEvent.TestIds, guid);
            //return null;
        }

        let go = MWCore.GameObject.SpawnGameObject(guid, GamePlay.IsServer());
        // let go = GameObjPool.Gain<MWCore.GameObject>(guid);
        if (go instanceof GamePlay.EffectSystem) {
            /**
             * setTimeout有返回值，表示当前setTimeout在页面中的所有setTimeout中的序号
             * 作用:当使用clearTimeout的时候，就可以直接传入序号，准确结束掉某个setTimeout
             */
            let delayId = setTimeout(() => {
                (go as GamePlay.EffectSystem).Play();
                this._delayIdMap.delete(go.GetGuid());
            }, 100);
            this._delayIdMap.set(go.GetGuid(), delayId);
        }
        return go as T;
    }

    public destoryGo(go: MWCore.GameObject) {
        if (!go) {
            return null;
        }
        if (this._delayIdMap.has(go.GetGuid())) {
            let delayId = this._delayIdMap.get(go.GetGuid());
            clearTimeout(delayId);
            this._delayIdMap.delete(go.GetGuid());
        }
        //GameObjPool.Revert(go);
        go.Destroy();
        return null;
    }

    public checkUIGuid(guid: string) {
        if (this._map.has(guid) == false) {
        }
        return guid;
    }

}