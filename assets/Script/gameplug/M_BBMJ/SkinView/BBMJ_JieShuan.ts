import { enHuCardType, BBMJ } from "../ConstDef/BBMJMahjongDef";
import M_BBMJClass from "../M_BBMJClass";
import { M_BBMJ_GameMessage } from "../../../CommonSrc/M_BBMJ_GameMessage";
import M_BBMJView from "../M_BBMJView";
import BBMJEvent from "../BBMJEvent";
import BBMJ_SinglePlayerBalance from "./BBMJ_SinglePlayerBalance";
import M_BBMJVoice from "../M_BBMJVoice";
import { BBMJMahjongAlgorithm1 } from "../BBMJMahjongAlgorithm/BBMJMahjongAlgorithm1";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_JieShuan extends cc.Component {


    // @property(cc.Label)
    // lbl_gameid: cc.Label=null;
    // @property(cc.Label)
    // lbl_tableRule: cc.Label=null;
    @property([cc.Label])
    lbl_HuCardType: cc.Label[] = [];
    @property(cc.Sprite)
    img_banker: cc.Sprite=null;
    @property(cc.Sprite)
    img_creator: cc.Sprite=null;

    @property(cc.Sprite)
    img_dianpao: cc.Sprite=null;

    @property(cc.Sprite)
    img_zimo: cc.Sprite=null;

    @property([cc.Sprite])
    img_hu: cc.Sprite[]=[];

    // @property(cc.Button)
    // btn_exit: cc.Button=null;

    @property(cc.Button)
    btn_goon: cc.Button=null;

    @property(cc.Button)
    btn_LookZongJieSuan: cc.Button=null;


    // @property(cc.Button)
    // btn_share: cc.Button=null;

    @property(cc.Button)
    btn_close: cc.Button=null;
    //中码图标
     @property([cc.Sprite])
    img_zhongma: cc.Sprite[]=[];
    //牌面
     @property([cc.Sprite])
    bmp_cardbackAry: cc.Sprite[]=[];
    //花色
     @property([cc.Sprite])
    bmp_cardcolorAry: cc.Sprite[]=[];
    //查看牌桌
    @property(cc.Button)
    btn_checkPaiZhuo: cc.Button=null;

     //返回结算
    @property(cc.Button)
    btn_fanHui: cc.Button=null;
 
     //输赢图标
    @property(cc.Sprite)
    img_ying: cc.Sprite=null;
    @property(cc.Sprite)
    img_ping: cc.Sprite=null;
    @property(cc.Sprite)
    img_shu: cc.Sprite=null;
    //除了底下的按钮都放这里面
    @property(cc.Node)
    node_background: cc.Node=null;

    @property([BBMJ_SinglePlayerBalance])
    balanceAry: BBMJ_SinglePlayerBalance[]=[];

    private huType:string;
    onLoad() {
        // init logic
        
    }
    
    public isVisible() : boolean{
        return this.node.active;
    }

    private static BankerPos: Array<{ x: number,y: number }> = [
         { x: -520,y: 460 },          
        { x: -520,y: 337 },
        { x: -520,y: 210 },
        { x: -520,y: 85 }    
    ];   
    // { x: 95,y: 130 },
    //         { x: 95,y: 490 },
    //         { x: 95,y: 250 },
    //         { x: 95,y: 370 }
    private static DianPaoORZiMoPos: Array<{ x: number,y: number }> = [
        { x: -50,y: 450 },        
        { x: -50,y: 340 },
        { x: -50,y: 210 },
        { x: -50,y: 90 }
    ]; 
    private static PaiXingPos: Array<{ x: number,y: number }> = [
        { x: -50,y: 515 },        
        { x: -50,y: 395 },
        { x: -50,y: 275 },
        { x: -50,y: 155 }
    ]; 

    //是否打满设置局数
    private _isPlayEnoughGameNum:boolean;    

    public init():void{
        this.btn_fanHui.node.active = false;
        this.btn_checkPaiZhuo.node.active = true;
        this._isPlayEnoughGameNum=false;
        this.huType = "";
        for(let i=0;i<this.balanceAry.length;i++)
        {
            this.balanceAry[i].init();
        }
        this.node.active=false;
    }

    private sharebtn():void{
        M_BBMJClass.ins.ScreenCapture(true);
    } 

    private goonbtn():void{
        
            if(M_BBMJClass.ins.isSelfCreateRoom && this._isPlayEnoughGameNum){
                M_BBMJView.ins.PlayFenXiang.startShow(()=>{
                    M_BBMJClass.ins.ExitGame();
                },this);
            }else{
                console.log("111111111111111111111111111111111111111111")
                this.node.dispatchEvent(new BBMJEvent(BBMJEvent.msg_goongame));
            }
        
        
    }
    private LookZongJieSuanbtn():void{
        this.scheduleOnce(()=>{           
                M_BBMJView.ins.PlayFenXiang.startShow(()=>{                    
                    M_BBMJClass.ins.ExitGame();
                },this);      
        },0.2);      
    }

     //查看牌桌
    private checkPaiZhuobtn():void{
        this.node_background.active=false; 
        this.btn_fanHui.node.active=true; 
        this.btn_checkPaiZhuo.node.active=false;    
    }
     //返回结算
    private fanHuibtn():void{
        this.node_background.active=true;
        this.btn_checkPaiZhuo.node.active=true;
        this.btn_fanHui.node.active=false;     
    }
    private exitbtn():void{
        
            BBMJ.ins.iclass.stopTimer();
            BBMJ.ins.iclass.exit();
        
    }

    private closebtn():void{
        this.scheduleOnce(()=>{
            if(BBMJ.ins.iclass.getTableConfig().isValid){
                if(M_BBMJClass.ins.isSelfCreateRoom && this._isPlayEnoughGameNum){
                    M_BBMJView.ins.PlayFenXiang.startShow(()=>{
                        M_BBMJClass.ins.ExitGame();
                    },this);
                }else{
                    this.node.dispatchEvent(new BBMJEvent(BBMJEvent.msg_goongame));
                }
            }else{
                BBMJ.ins.iclass.stopTimer();
                BBMJ.ins.iclass.exit();
            }
        },0.2);
    }
    public closeJieSuan():void{
        // egret.Tween.get(this).to({ y: -840 },150,egret.Ease.sineInOut).call(() => {
        //     this._btn_open.visible = true;
        //     this._btn_yinCang.visible = false;
        // },this);
    }

    public openJieSuan():void{
        // egret.Tween.get(this).to({ y: 0 },150,egret.Ease.sineInOut).call(() => {
        //     this._btn_open.visible = false;
        //     this._btn_yinCang.visible = true;
        // },this);
    }
    /**
     * 显示结算
     * */
    public showJieShuan(balanceData: M_BBMJ_GameMessage.CMD_S_Balance):void{
        this.node.active=true;
        this.node_background.active=true;
        
        this.lbl_HuCardType[0].node.active=false;
        this.lbl_HuCardType[1].node.active=false;
        this.lbl_HuCardType[2].node.active=false;
        this.lbl_HuCardType[3].node.active=false;

        this.img_zimo.node.active=false;
        this.img_dianpao.node.active=false;
        this.img_hu[0].node.active=false;
        this.img_hu[1].node.active=false;
        this.img_hu[2].node.active=false;
        this.img_hu[3].node.active=false;

     //   this.lbl_gameid.string = BBMJ.ins.iclass.getGameID();
     //   let msg=`底分${BBMJ.ins.iclass.getTableConfig().cellScore}|`;
        // msg+=BBMJ.ins.iclass.getTableConfig().IsGangKai?"杠后开花加番|":"";
        // msg+=BBMJ.ins.iclass.getTableConfig().IsQiDui?"七对加番|":"";
        // msg+=BBMJ.ins.iclass.getTableConfig().IsBuKao?"十三不靠加番|":"";
        // msg+=BBMJ.ins.iclass.getTableConfig()._ifCanTianHu?"天胡|":"";
        // msg+=BBMJ.ins.iclass.getTableConfig()._ifCanHu7Dui?"七对|":"";
        // msg+=BBMJ.ins.iclass.getTableConfig().IsChuHunJiaFan?"出会加番|":"";


   //     this.lbl_tableRule.string=msg; 
        //显示庄家位置,相对于自己
        var bankerpos=(M_BBMJClass.ins.BankerChair-M_BBMJClass.ins.SelfChair+4)%4;
       
          this.img_banker.node.y = BBMJ_JieShuan.BankerPos[bankerpos].y + 65;
           let creatorPos = (M_BBMJClass.ins.getTableConfig().tableCreatorChair - M_BBMJClass.ins.SelfChair + 4)%4;
            this.img_creator.node.y = BBMJ_JieShuan.BankerPos[creatorPos].y + 25;

        //显示玩家结算数据,本家，对家,上家，下家
        var me=M_BBMJClass.ins.SelfChair;
                if(balanceData.playerBalance[me].TotalScore>0){
            M_BBMJVoice.PlayCardType(`/sound/win.mp3`);     
            this.img_ying.node.active = true;
            this.img_shu.node.active = false;
            this.img_ping.node.active = false;
        }
         if(balanceData.playerBalance[me].TotalScore<0){
            M_BBMJVoice.PlayCardType(`/sound/lost.mp3`);     
            this.img_ying.node.active = false;
            this.img_shu.node.active = true;
            this.img_ping.node.active = false;
        }
         if(balanceData.playerBalance[me].TotalScore==0){
            M_BBMJVoice.PlayCardType(`/sound/audio_liuju.mp3`); 
            this.img_ying.node.active = false;
            this.img_shu.node.active = false;
            this.img_ping.node.active = true;
        }
        if(balanceData.playerBalance[me].HuType>0){
        if(balanceData.playerBalance[me].HuType==1){
            this.huType = "自摸+2 ";
             }else if(balanceData.playerBalance[me].HuType==5){
            this.huType = "抢杠胡 ";
             }else{
                 this.huType = "胡牌+1 ";
             }
        }else{
            this.huType = "";
        }
        this.balanceAry[0].showBalance(M_BBMJClass.ins.TablePlayer[me].NickName,balanceData.playerCard[me],balanceData.playerBalance[me],M_BBMJClass.ins.TablePlayer[me].FaceID);
        this.lbl_HuCardType[0].string =  this.huType+this.GetHuTypeString(balanceData.playerBalance[me]);
         this.huType = "";
        this.lbl_HuCardType[0].node.active = true;
        this.balanceAry[0].showFlowerCard(balanceData.playerCard[me]);
        if(balanceData.playerBalance[me].FangPao>0)
        {
            this.img_dianpao.node.active=true;
            //this._img_dianpao.x=BBMJ_JieShuan.DianPaoORZiMoPos[0].x;
            this.img_dianpao.node.y=BBMJ_JieShuan.DianPaoORZiMoPos[0].y;
        }
        else if(balanceData.playerBalance[me].HuType>0)
        {
            if(balanceData.playerBalance[me].HuType==enHuCardType.HuCardType_ZiMo||balanceData.playerBalance[me].HuType==enHuCardType.HuCardType_GangShangHua)
            {
                this.img_zimo.node.active=true;
                //this._img_zimo.x=BBMJ_JieShuan.DianPaoORZiMoPos[0].x;
                this.img_zimo.node.y=BBMJ_JieShuan.DianPaoORZiMoPos[0].y;
            }
            else
            {
                this.img_hu[0].node.active=true;
            }
        }

        var dui=(me+1)%4;
        if(balanceData.playerBalance[dui].HuType>0){
        if(balanceData.playerBalance[dui].HuType==1){
            this.huType = "自摸+2 ";
             }else if(balanceData.playerBalance[dui].HuType==5){
            this.huType = "抢杠胡 ";
             }else{
                 this.huType = "胡牌+1 ";
             }
        }else{
            this.huType = "";
        }
        this.balanceAry[1].showBalance(M_BBMJClass.ins.TablePlayer[dui].NickName,balanceData.playerCard[dui],balanceData.playerBalance[dui],M_BBMJClass.ins.TablePlayer[dui].FaceID);  
        this.balanceAry[1].showFlowerCard(balanceData.playerCard[dui]);
       this.lbl_HuCardType[1].string = this.huType+this.GetHuTypeString(balanceData.playerBalance[dui]);
        this.huType = "";
        this.lbl_HuCardType[1].node.active = true;
        if(balanceData.playerBalance[dui].FangPao>0)
        {
            this.img_dianpao.node.active=true;
            //this._img_dianpao.x=BBMJ_JieShuan.DianPaoORZiMoPos[1].x;
            this.img_dianpao.node.y=BBMJ_JieShuan.DianPaoORZiMoPos[1].y;
        }
        else if(balanceData.playerBalance[dui].HuType>0)
        {
            if(balanceData.playerBalance[dui].HuType==enHuCardType.HuCardType_ZiMo||balanceData.playerBalance[dui].HuType==enHuCardType.HuCardType_GangShangHua)
            {
                this.img_zimo.node.active=true;
                //this._img_zimo.x=BBMJ_JieShuan.DianPaoORZiMoPos[1].x;
                this.img_zimo.node.y=BBMJ_JieShuan.DianPaoORZiMoPos[1].y;
            }
            else
            {
                this.img_hu[1].node.active=true;
            }
          
        }
        var shang=(me+2)%4;
         if(balanceData.playerBalance[shang].HuType>0){
        if(balanceData.playerBalance[shang].HuType==1){
            this.huType = "自摸+2 ";
             }else if(balanceData.playerBalance[shang].HuType==5){
            this.huType = "抢杠胡 ";
             }else{
                 this.huType = "胡牌+1 ";
             }
        }else{
            this.huType = "";
        }
        this.balanceAry[2].showBalance(M_BBMJClass.ins.TablePlayer[shang].NickName,balanceData.playerCard[shang],balanceData.playerBalance[shang],M_BBMJClass.ins.TablePlayer[shang].FaceID);
        this.balanceAry[2].showFlowerCard(balanceData.playerCard[shang]);
       this.lbl_HuCardType[2].string =  this.huType+this.GetHuTypeString(balanceData.playerBalance[shang]);
        this.huType = "";
        this.lbl_HuCardType[2].node.active = true;
        if(balanceData.playerBalance[shang].FangPao>0)
        {
            this.img_dianpao.node.active=true;
            //this._img_dianpao.x=BBMJ_JieShuan.DianPaoORZiMoPos[2].x;
            this.img_dianpao.node.y=BBMJ_JieShuan.DianPaoORZiMoPos[2].y;
        }
        else if(balanceData.playerBalance[shang].HuType>0)
        {
            if(balanceData.playerBalance[shang].HuType==enHuCardType.HuCardType_ZiMo||balanceData.playerBalance[shang].HuType==enHuCardType.HuCardType_GangShangHua)
            {
                this.img_zimo.node.active=true;
                //this._img_zimo.x=BBMJ_JieShuan.DianPaoORZiMoPos[2].x;
                this.img_zimo.node.y=BBMJ_JieShuan.DianPaoORZiMoPos[2].y;
            }
            else
            {
                this.img_hu[2].node.active=true;
            }
        }
        var xia=(me+3)%4;
         if(balanceData.playerBalance[xia].HuType>0){
             if(balanceData.playerBalance[xia].HuType==1){
            this.huType = "自摸+2 ";
             }else if(balanceData.playerBalance[xia].HuType==5){
            this.huType = "抢杠胡 ";
             }else{
                 this.huType = "胡牌+1 ";
             }
        }else{
            this.huType = "";
        }
        this.balanceAry[3].showBalance(M_BBMJClass.ins.TablePlayer[xia].NickName,balanceData.playerCard[xia],balanceData.playerBalance[xia],M_BBMJClass.ins.TablePlayer[xia].FaceID);
        this.balanceAry[3].showFlowerCard(balanceData.playerCard[xia]);
        this.lbl_HuCardType[3].string =  this.huType+this.GetHuTypeString(balanceData.playerBalance[xia]);
         this.huType = "";
        this.lbl_HuCardType[3].node.active = true;
        if(balanceData.playerBalance[xia].FangPao>0)
        {
            this.img_dianpao.node.active=true;
            //this._img_dianpao.x=BBMJ_JieShuan.DianPaoORZiMoPos[3].x;
            this.img_dianpao.node.y=BBMJ_JieShuan.DianPaoORZiMoPos[3].y;
        }
        else if(balanceData.playerBalance[xia].HuType>0)
        {
            if(balanceData.playerBalance[xia].HuType==enHuCardType.HuCardType_ZiMo||balanceData.playerBalance[xia].HuType==enHuCardType.HuCardType_GangShangHua)
            {
                this.img_zimo.node.active=true;
                //this._img_zimo.x=BBMJ_JieShuan.DianPaoORZiMoPos[3].x;
                this.img_zimo.node.y=BBMJ_JieShuan.DianPaoORZiMoPos[3].y;
            }
            else
            {
                this.img_hu[3].node.active=true;
            }
            
        }

        this.node.x=0;
        this.node.y=0;
        this._isPlayEnoughGameNum = balanceData.isPlayEnougnGameNum != 0;
        if(M_BBMJClass.ins.isSelfCreateRoom && this._isPlayEnoughGameNum) {
            M_BBMJClass.ins.ignoreForceLeft = true;
             this.btn_LookZongJieSuan.node.active=true; 
          this.btn_goon.node.active=false;      
        }
         this.btn_LookZongJieSuan.node.active=false;
          this.btn_goon.node.active=true;       

        console.log("jiesuan");
        if(balanceData.MaPai.length==0){
            this.bmp_cardbackAry[0].node.active = false;
            this.bmp_cardbackAry[1].node.active = false;
            this.bmp_cardbackAry[2].node.active = false;
            this.bmp_cardbackAry[3].node.active = false;
            this.bmp_cardbackAry[4].node.active = false;
            this.bmp_cardbackAry[5].node.active = false;
        }else{
             this.bmp_cardbackAry[0].node.active = true;
            this.bmp_cardbackAry[1].node.active = true;
        }
        // if(M_BBMJClass.ins.TableConfig._MaShu>4){
        //     for(var i = 0;i<this.bmp_cardbackAry.length;i++){
        //         this.bmp_cardbackAry[i].node.active = true;
        //     }           
        // }else if(M_BBMJClass.ins.TableConfig._MaShu>2){
        //     this.bmp_cardbackAry[2].node.active = true;
        //     this.bmp_cardbackAry[3].node.active = true;
        // }
        // for(var i = 0;i<balanceData.MaPai.length;i++){
        //     this.bmp_cardcolorAry[i].spriteFrame = BBMJ.ins.iclass.getMahjongPaiHuaRes(balanceData.MaPai[i]);
        //     this.bmp_cardcolorAry[i].node.active = true;
        //     this.bmp_cardbackAry[i].node.active = true;
        //     if(this.ZhongMa(balanceData.MaPai[i])){
        //         this.img_zhongma[i].node.active = true;
        //     }else{
        //         this.img_zhongma[i].node.active = false;
        //     }
        // }
    }
    private ZhongMa(card:number):boolean{
        if((BBMJMahjongAlgorithm1.GetMahjongValue(card)==1)||(BBMJMahjongAlgorithm1.GetMahjongValue(card)==5)||(BBMJMahjongAlgorithm1.GetMahjongValue(card)==9)||(card==53)){
            return true
        }
        return false;
    }

    private GetHuTypeString(balanceData: M_BBMJ_GameMessage.PlayerBalance): string {
        var lbl = "";

        if (balanceData.JieSuan[8] > 0) {
            this.huType = "";
        if(balanceData.JieSuan[0]>0){
            lbl += "天胡+5 ";
        }else{
            lbl+= "地胡+5 ";
        }
            
    }
        if(balanceData.JieSuan[1]>0){
            lbl+="捧手+2 ";
        }

        if(balanceData.JieSuan[9]>0){
            lbl+="夹边吊+1 "
        }
        if(balanceData.JieSuan[10]>0){
            this.huType = "";
            lbl+="抢杠+5 "
        }    
        if(balanceData.JieSuan[11]>0){
            lbl+="杠后炮 "
        }
        if(balanceData.JieSuan[12]>0){
            lbl+="跑中+2 "
        }
        if(balanceData.JieSuan[13]>0){
            this.huType = "";
            lbl+="四中+10 "
        }
        if(balanceData.JieSuan[14]>0){
            lbl+="素牌+2 "
        }
        if(balanceData.JieSuan[15]>0){
            lbl+="庄分+"+balanceData.JieSuan[15]+" ";
        }
        if(balanceData.JieSuan[4]>0){
            lbl+="放杠-"+balanceData.JieSuan[4]*3+" ";
        }
        if(balanceData.JieSuan[3]>0){
             lbl+="明杠+"+balanceData.JieSuan[3]+" ";
        }
        if(balanceData.JieSuan[5]>0){
             lbl+="补杠+"+balanceData.JieSuan[5]+" ";
        }
        if(balanceData.JieSuan[6]>0){
             lbl+="暗杠+"+balanceData.JieSuan[6]*2+" ";
        }
        if(balanceData.JieSuan[7]>0){
            lbl+="杠后开花x2 "
        }
        
        return lbl;
    }
}
