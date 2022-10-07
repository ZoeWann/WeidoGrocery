import { Tween, oTrace, UI, UILayer, Easing } from "odin";

import { EmTipsColor } from "../../../const/Enums";

import { UI_Tips } from "../../../UI/UITemplate";

export class Tip {

​    constructor(str: string, color: EmTipsColor) {

​        this.str = str;

​        this.color = color;

​    }

​    str: string;

​    color: EmTipsColor;

}

export class TipAniTween {

​    private _inTween: Tween<any>;

​    private _outTween: Tween<any>;

​    constructor() {

​        this._inTween = new Tween({ val: 0 }).to({ val: 1 }, 500).easing(Easing.Sinusoidal.In);

​        this._outTween = new Tween({ val: 1 }).to({ val: 0 }, 500).easing(Easing.Sinusoidal.Out).delay(3000);

​        this._inTween.chain(this._outTween);

​    }

​    start(onUpdate: (object: any, elapsed: number) => void, onComplete: (object: any) => void) {

​        this._inTween.onUpdate(onUpdate);

​        this._outTween.onUpdate(onUpdate);

​        this._outTween.onComplete(onComplete);

​        this._inTween.start();

​    }

}

export class FlyTips extends UI_Tips {

​    public static flyTips: Array<Tip> = [];

​    private _freeBlocks: Array<MWGameUI.MWUITextblock> = [];

​    private _activeBlocks: Array<MWGameUI.MWUITextblock> = [];

​    private _offset: Type.Vector2;

​    private _originPos: Type.Vector2;

​    private _freeAniTween: Array<TipAniTween> = [];

​    private _activeAniTween: Array<TipAniTween> = [];

​    getLayer(): UILayer {

​        return UILayer.Top;

​    }

​    onStart(): void {

​        this._freeBlocks.push(this.txt_FlyTip);

​        this._freeBlocks.push(this.txt_FlyTip_1);

​        this._freeAniTween.push(new TipAniTween());

​        this._freeAniTween.push(new TipAniTween());

​        this._offset = new Type.Vector2(0,this.txt_FlyTip.getSlot().getSize().y);   //移动的距离为文字的高度

​        this._originPos = this.txt_FlyTip.getSlot().getPosition().clone();  

​    }

​    private _timer: number = 0;

​    onUpdate(dt: number): void {

​        this._timer += dt;

​        if (this._timer < 0.1)

​            return;

​        this._timer = 0;    //100ms调用一次

​        this.checkAndShowTip();

​    }

​    

​    checkAndShowTip() {

​        if (FlyTips.flyTips.length > 0 && this._freeBlocks.length > 0) {

​            let curTip = FlyTips.flyTips.shift();

​            let curTxt = this._freeBlocks.shift();

​            let curAniTween = this._freeAniTween.shift();

​            //所有活跃的文本块向上移

​            for (let i = 0; i < this._activeBlocks.length; i++) {

​                let slot = this._activeBlocks[i].getSlot();

​                slot.setPosition(slot.getPosition().subtract(this._offset));

​            }

​            this._activeBlocks.push(curTxt);

​            this._activeAniTween.push(curAniTween);

​            curTxt.setText(curTip.str);

​            curTxt.setFontColorByHex(curTip.color);

​            curAniTween.start(

​                (t) => { curTxt.setRenderOpacity(t.val); }, //update

​                () => {                                     //onComplete回调

​                    curTxt.getSlot().setPosition(this._originPos);  //回到原位

​                    this._activeBlocks.shift();

​                    this._activeAniTween.shift();

​                    this._freeBlocks.push(curTxt);

​                    this._freeAniTween.push(curAniTween);

​                }

​            );

​        } else if (!FlyTips.flyTips.length && !this._activeBlocks.length) {

​            UI.instance.hidePanel(FlyTips);

​        }

​    }

​    onShow(): void {

​    }

​    onDestroy(): void {

​    }

}

export class AreaTips extends UI_Tips {

​    getLayer(): UILayer {

​        return UILayer.Top;

​    }

​    private _curInTween: Tween<any>;

​    private _curOutTween: Tween<any>;

​    onStart(): void {

​        this._curOutTween = new Tween({ val: 1 }).to({ val: 0 }, 500).easing(Easing.Sinusoidal.Out).onUpdate(t => {

​            this.txt_AreaTip.setRenderOpacity(t.val);

​        }).onComplete(() => {

​            UI.instance.hidePanel(AreaTips);

​        }).delay(3000);

​        this._curInTween = new Tween({ val: 0 }).to({ val: 1 }, 500).easing(Easing.Sinusoidal.In).onUpdate(t => {

​            this.txt_AreaTip.setRenderOpacity(t.val);

​        });

​        this._curInTween.chain(this._curOutTween);

​    }

​    onShow(str: string, color: EmTipsColor): void {

​        this.showAreaTip(str, color);

​    }

​    onDestroy(): void {

​    }

​    /** 进入区域时的tip播报 */

​    private showAreaTip(str: string, color: EmTipsColor) {

​        this._curInTween.stopChainedTweens();

​        this._curInTween.stop();

​        this.txt_AreaTip.setRenderOpacity(0);

​        this.txt_AreaTip.setText(str);

​        this.txt_AreaTip.setFontColorByHex(color);

​        this._curInTween.start();

​    }

}