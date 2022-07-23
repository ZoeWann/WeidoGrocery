/*
 * @Author: your name
 * @Date: 2022-04-18 15:54:02
 * @LastEditTime: 2022-07-22 18:41:30
 * @LastEditors: Please set LastEditors
 * @Description: 主UI
 * @FilePath: \JavaScripts\interface.ts
 */

import { DataCenterC, InputManager, ModuleManager, oTrace } from "odin";
import * as puerts from "puerts";
import * as UE from "ue";
import { BuffModuleC } from "../buff/BuffModule";
import { MonsterModuleC } from "../monster/MonsterModule";
import { RoleDataHelper, RoleInfo } from "../role/RoleDataHelper";
import { RoleModuleC } from "../role/RoleModule";
import { c2cEvents, util } from "../tool/Util";
import { UI_InitUIBase } from "../UITemplate";

class InitUI extends UI_InitUIBase {
    skillCd: number = 0;
    fireCd: number = 0;
    getWeapon: boolean = false;

    protected onStart(): void {
        util.setVisible(this.btnFire, false);
        util.setVisible(this.btnSkill, false);
        util.setVisible(this.playerHP, false);
        util.setVisible(this.monsterHP, false);
        util.setVisible(this.text, false);
        util.setVisible(this.btnJump, false);

        //自定义刷新，0.1s刷新一次，用来设置技能循环时间
        setInterval(() => {
            //oTrace("循环 间隔 100 ms")
            this.setFireCd();
            this.setSkillCd();
        }, 100);

        Events.AddLocalListener(c2cEvents.TIPS, (str: string) => {

            this.tips(str);
        })

        Events.AddLocalListener(c2cEvents.LOGIN, (playerData: RoleDataHelper) => {
            this.playerHP.SetPercent((playerData.dataInfo.hp / playerData.dataInfo.maxHp));
            util.setVisible(this.playerHP, true);

            this.tips("试炼开始！");

            ModuleManager.instance.getModule(RoleModuleC).loginSuccess();

        });

        Events.AddLocalListener(c2cEvents.HP_CHANGE, (/*playerData: RoleInfo*/) => {
            let roleInfo: RoleInfo = DataCenterC.instance.getModuleData(RoleDataHelper).dataInfo
            let per = roleInfo.hp / roleInfo.maxHp;

            this.playerHP.SetPercent(per);
        });

        Events.AddLocalListener(c2cEvents.GET_WEAPON, () => {
            if (this.getWeapon)
                return;

            this.getWeapon = true;
            util.setVisible(this.btnFire, true);

            this.tips("获得飞镖武器!");
        });

        Events.AddLocalListener(c2cEvents.GET_SKILL, () => {
            if (this.btnSkill.GetVisibility() != MWGameUI.ESlateVisibility.Hidden)
                return;

            util.setVisible(this.btnSkill, true);

            this.tips("获得无敌技能!");
        });

        Events.AddLocalListener(c2cEvents.GET_JUMP, () => {
            if (this.btnJump.GetVisibility() != MWGameUI.ESlateVisibility.Hidden)
                return;

            util.setVisible(this.btnJump, true);

            this.tips("获得跳跃技能!");
        });


        Events.AddLocalListener(c2cEvents.MON_HP, (hp: string) => {
            if (hp) {
                util.setVisible(this.monsterHP, true);
                let per = +hp / 100;
                this.monsterHP.SetPercent(per);

            }
        });
        Events.AddLocalListener(c2cEvents.UNEQUIP_SKILL, () => {

            util.setVisible(this.btnSkill, false);

        })

        this.btnSkill.OnClicked().Add(() => {
            oTrace("加 buff")
            this.skillCd = 6;
            ModuleManager.instance.getModule(BuffModuleC).addBuff();
        });

        this.btnJump.OnClicked().Add(() => {
            let player = GamePlay.GetCurrentPlayer();
            player.Character.Jump();

        })

        this.btnFire.OnClicked().Add(async () => {
            this.fire();
        })

        // 键盘按键案例
        InputManager.instance.onKeyDown(Type.Keys.T).add(() => {
            this.fire();
            // let tmp = MWCore.GameObject.Find("5BF7804E40C3C51A7DECA19B01C770FD").Clone();
            // oTrace("4444444444444 guid ", tmp.GetGuid())
            // ResManager.instance.loadGoNode(tmp.GetGuid()).then(function (val) {
            //     oTrace("4444444444444 ", JSON.stringify(val))
            // })
        })

        // 鼠标点击结果案例
        // InputManager.instance.onTouch.add((hitRes: Array<GamePlay.HitResult>) => {
        //     hitRes.forEach(ele => {
        //         if (util.checkId(ele.GameObject)) {
        //             ModuleManager.instance.getModule(MonsterModuleC).aimed(ele.GameObject.GetGuid());
        //         }
        //     });
        // })

        this.check();
    }

    onShow(...params: any[]): void {
    }

    private uiPos: Type.Vector;;
    private aimed = () => {
        const inst = puerts.argv.getByName("Proxy");
        let ret = UE.WidgetLayoutLibrary.GetViewportSize((inst as any).Game);

        this.uiPos = new Type.Vector(ret.X * 0.51, ret.Y * 0.45, 0);

        let pos = util.getTargetId(this.uiPos);
        if (pos) {
            ModuleManager.instance.getModule(MonsterModuleC).aimed(pos);
            //oTrace("瞄准位置：", pos.toString());
        }
        else {
            this.hideMonHP();
        }
    }

    hideMonHP() {
        util.setVisible(this.monsterHP, false);
    }

    check() {
        setInterval(
            this.aimed
            , 200);
    }

    private tips(str: string) {
        this.text.SetText(str);
        util.setVisible(this.text, true);
        setTimeout(() => {
            util.setVisible(this.text, false);
        }, 3000);
    }

    private fire() {
        if (!this.getWeapon) {
            return;
        }

        this.fireCd = 0.5;    //设置技能冷却时间
        let rmc = ModuleManager.instance.getModule(RoleModuleC);
        if (rmc) {
            rmc.fire(this.uiPos);
        }
    }

    private setFireCd() {
        if (this.fireCd && this.fireCd > 0) {
            this.btnFire.SetIsEnabled(false);
            this.btnFire.SetButtonString(this.fireCd.toFixed(1));
            this.fireCd -= 0.1;
        } else {
            this.btnFire.SetIsEnabled(true);
            this.btnFire.SetButtonString("发射");
        }
    }

    private setSkillCd() {
        //  oTrace("buff的cd：", this.skillCd);
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
export default InitUI;
