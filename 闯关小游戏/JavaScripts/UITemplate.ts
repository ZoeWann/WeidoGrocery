//工具自动生成请勿修改
import { SuperPanelBase } from "odin";
export class UI_InitUIBase extends SuperPanelBase {
	public btnFire: MWGameUI.MWUIButton;
	public btnSkill: MWGameUI.MWUIButton;
	public playerHP: MWGameUI.MWUIProgressbar;
	public monsterHP: MWGameUI.MWUIProgressbar;
	public text: MWGameUI.MWUITextblock;
	public mpic: MWGameUI.MWUIImage;
	public btnJump: MWGameUI.MWUIButton;

    constructor() {
        super("InitUI");
    }
    protected buildSelf(): void {
		this.btnFire = this.findChildByPath(MWGameUI.MWUIButton, "RootCanvas/btnFire");
		this.btnSkill = this.findChildByPath(MWGameUI.MWUIButton, "RootCanvas/btnSkill");
		this.playerHP = this.findChildByPath(MWGameUI.MWUIProgressbar, "RootCanvas/playerHP");
		this.monsterHP = this.findChildByPath(MWGameUI.MWUIProgressbar, "RootCanvas/monsterHP");
		this.text = this.findChildByPath(MWGameUI.MWUITextblock, "RootCanvas/text");
		this.mpic = this.findChildByPath(MWGameUI.MWUIImage, "RootCanvas/mpic");
		this.btnJump = this.findChildByPath(MWGameUI.MWUIButton, "RootCanvas/btnJump");
		this.btnFire.SetFocusable(false);
		this.btnFire.OnClicked().Add(() => {
			Events.DispatchLocal("PlayButtonClick", "btnFire");
		});
		this.btnSkill.SetFocusable(false);
		this.btnSkill.OnClicked().Add(() => {
			Events.DispatchLocal("PlayButtonClick", "btnSkill");
		});
		this.btnJump.SetFocusable(false);
		this.btnJump.OnClicked().Add(() => {
			Events.DispatchLocal("PlayButtonClick", "btnJump");
		});

    }
}
export class UI_MonsterHpBase extends SuperPanelBase {
	public monsterHp: MWGameUI.MWUIProgressbar;

    constructor() {
        super("MonsterHp");
    }
    protected buildSelf(): void {
		this.monsterHp = this.findChildByPath(MWGameUI.MWUIProgressbar, "MWCanvas_2147482460/monsterHp");

    }
}
export class UI_TipsUIBase extends SuperPanelBase {
	public root: MWGameUI.MWUICanvas;

    constructor() {
        super("TipsUI");
    }
    protected buildSelf(): void {
		this.root = this.findChildByPath(MWGameUI.MWUICanvas, "root");

    }
}
export class UI_UIRootBase extends SuperPanelBase {

    constructor() {
        super("UIRoot");
    }
    protected buildSelf(): void {

    }
}