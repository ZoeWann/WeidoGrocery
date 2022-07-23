/*
 * @Author: your name
 * @Date: 2022-04-15 17:23:47
 * @LastEditTime: 2022-04-21 11:49:32
 * @LastEditors: Please set LastEditors
 * @Description: Loading UI
 * @FilePath: \JavaScripts\UIRoot.ts
 */
import { UI } from "odin";



@MWGameUI.MWUIMono
export default class UIRoot extends UI {
    private selfShow: boolean = false;//姿势是否处于显示状态
    private loading: MWGameUI.MWUICanvas;
    private progressBar: MWGameUI.MWUIProgressbar;
    private msg_txt: MWGameUI.MWUITextblock;

    private targetPercent: number = 0;
    private loadingCompleteCallback: Function;


    onStart(): void {
        this.loading = this.findChildByPath(MWGameUI.MWUICanvas, "Canvas/Loading");
        this.progressBar = this.findChildByPath(MWGameUI.MWUIProgressbar, "Canvas/Loading/ProgressBar");
        this.msg_txt = this.findChildByPath(MWGameUI.MWUITextblock, "Canvas/Loading/Msg_txt");
    }

    onUpdate(dt: number) {
        if (!this.selfShow) return;
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

    //显示loading
    onShowLoading(msg: string, targetPercent: number, complete: Function) {
        this.selfShow = true;
        if (this.loading.GetVisibility() == MWGameUI.ESlateVisibility.Hidden) {
            this.progressBar.SetCurrentValue(0);
            this.loading.SetVisibility(MWGameUI.ESlateVisibility.Visible);
            this.loading.GetSlot().SetZOrder(Number.MAX_VALUE);
        }
        this.targetPercent = Math.min(1, targetPercent);
        this.loadingCompleteCallback = complete;
        this.msg_txt.SetText(msg);
    }

    //隐藏loading
    onHideLoading() {
        this.selfShow = false;
        if (this.progressBar.GetCurrentValue() >= 1) {
            this.loading.SetVisibility(MWGameUI.ESlateVisibility.Hidden);
        }
    }
}