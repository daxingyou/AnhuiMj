
import { GameVideoBase } from "../base/GameVideoBase";
import { IHQMJClass, HQMJTableConfig, HQMJTimer, enGamePhase,TingCardTip,HQMJOutCardPlayer,HQMJRecordCard, HQMJMahjongDef, HQMJ, HQMJTimerDef, enHuCardType, enHQMJAniType, enFixedCardType } from "./ConstDef/HQMJMahjongDef";
import { GameIF } from "../../CommonSrc/GameIF";
import { ShareParam } from "../../CustomType/ShareParam";
// import { String, set, Label, update, property } from '../../../../creator';
import SendMessage from '../../Global/SendMessage';

import Global from "../../Global/Global";
import M_HQMJView from './M_HQMJView';
import HQMJ_GameInfo from"./SkinView/HQMJ_GameInfo"
import { HQMJMahjongAlgorithm } from "./HQMJMahjongAlgorithm/HQMJMahjongAlgorithm";
import { AudioType, VoiceType } from "../../CustomType/Enum";
import { M_HQMJ_GameMessage } from "../../CommonSrc/M_HQMJ_GameMessage";
import { GameRuleData, M_HQMJ_GameData } from './M_HQMJSetting';
import HQMJEvent from './HQMJEvent';
import M_HQMJVoice from "./M_HQMJVoice";
import HQMJ_SingleFixedBase from './PlayerCard/single/HQMJ_SingleFixedBase';
// import { enFixedCardType } from "../M_HQMJ/ConstDef/HQMJMahjongDef";
import { SetTextureRes } from "../MJCommon/MJ_Function";
import HQMJ_MsgBox from "./SkinView/HQMJ_MsgBox";
import { TranslateMoneyTypeName } from "../../Tools/Function";
import HQMJ_CardView from './SkinView/HQMJ_CardView';
import HQMJ_BanlanceActive from "./PlayerCard/banlanceShow/HQMJ_BanlanceActive";
import HQMJ_BanlanceFixed from "./PlayerCard/banlanceShow/HQMJ_BanlanceFixed";
import HQMJ_JiFenBan from "./SkinView/HQMJ_JiFenBan";
import HQMJ_TingTip from "./SkinView/HQMJ_TingTip"; 
import HQMJ_SelChi from './SkinView/HQMJ_SelChi';
import HQMJ_BaoTing from './SkinView/HQMJ_Bao';
import HQMJ_PaiWalls from './SkinView/HQMJ_PaiWalls';
import { QL_Common } from "../../CommonSrc/QL_Common";
import M_HQMJVideoView from './M_HQMJVideoView';
import HBMJ_SinglePlayerFX from '../M_HZMJ/SkinView/HZMJ_SinglePlayerFX';
import HQMJ_FenXiang from './SkinView/HQMJ_FenXiang';
import HQMJ_OppoSinglePool from './PlayerCard/single/pool/HQMJ_OppoSinglePool';
import HQMJ_OppoPool from './PlayerCard/pool/HQMJ_OppoPool';
import M_HQMJClass from './M_HQMJClass';
const { ccclass, property } = cc._decorator;



@ccclass
export default class M_HQMJVideoClass extends GameVideoBase implements IHQMJClass {

    private static _ins: M_HQMJVideoClass;
    public static get ins(): M_HQMJVideoClass { return this._ins; }

    private videostart:boolean= true;
    // @property(cc.Label)
    // label: cc.Label;

    // @property(cc.Node)
    // GameInfoView:cc.Node;
    // private HQMJ_GameInfoView:HQMJ_GameInfo;
    
    //牌蹲预制体
    @property(cc.Prefab)
    private prefabPai:cc.Prefab=null;

    @property(cc.SpriteAtlas)
    private paihua:cc.SpriteAtlas=null;

    @property(cc.SpriteAtlas)
    private paibei:cc.SpriteAtlas=null;
    @property(cc.SpriteAtlas)
    private paibei3d:cc.SpriteAtlas=null;
    
    // @property(M_HQMJVideoView)
    // GameView:M_HQMJView;
    // private gameView:M_HQMJVideoView=null;

    //
    //游戏信息
    //
    public _shareContext:string;
    /**
    * 设置分享标题
    * */
    public set ShareTitle(value:string){this._shareContext=value;}
    public get ShareTitle():string{
        return this._shareContext;
    }
            /**
     * 是否2D
    */
    public is2D():boolean{
        return false;
    }      
        //当前桌子人数
        public _currentPlayer:number = 0;

        //因为吃牌加的参数 
        public _sendMsg : boolean = false;
        public _eventMsg : any = null;

        //方向盘位置
        // private posX : number = M_HQMJVideoView.ins.TimerView.node.x;
        // private posY : number = M_HQMJVideoView.ins.TimerView.node.y;

        //牌桌配置
        private _tableConfig : HQMJTableConfig;
        /**
         * 牌桌配置
         * */
        public get TableConfig():HQMJTableConfig{
            return this._tableConfig;
        }
        
        private _timer : HQMJTimer;
        
        //本局庄家椅子号
        private _bankerChair : number;
        //本局庄家连庄数
        public _lianBanker : number;
        /**
         * 庄家椅子号
         * */
        public get BankerChair():number{return this._bankerChair;};
        
        //当前游戏阶段
        private _gamePhase:enGamePhase;
        /**
         * 游戏阶段
         * */
        public get GamePhase():enGamePhase{return this._gamePhase};
        
        //当前活动玩家
        private _activePlayer:number;
        //打牌玩家
        private _outCardPlayer : HQMJOutCardPlayer;
        //骰子1点数
        private _sz1:number;
        /**
         * 骰子1
         * */
        public get SZ1():number{
            return this._sz1;
        }
            public _hunPiCard:number;
        
        private _index = 0;
    /**
     * 翻开的混皮牌
     */
    public get HunPiHunPiCard():number{
        return this._hunPiCard;
    }
        
        //骰子2点数
        private _sz2:number;
        /**
         * 骰子2
         * */
        public get SZ2():number{
            return this._sz2;
        }
        
        //本局局号
        private _gameid:string;
        /**
         * 游戏id
         * */
        public get GameID():string{
            return this._gameid;
        }
        //
        //个人数据
        //
        public fankai:boolean = true;
        //手牌数据
        private _handCard:Array<number>;
        //本次可以抢的牌
        private _gangCard:Array<number>;
        //我的投票权限
        private _voteRight: number;
        //是否可以抢杠
        private _ifCanQiangGang:boolean;
        
        //当前时间
        private _curTime:number;
        //是否已经胡牌
        private _alreadyHu:boolean;
        /**
         * 是否已经胡牌
         * */
        public get AlreadyHu(){return this._alreadyHu;};
        //是否听牌
        private _isTing;
        /**
         * 是否听牌
         * */
        public get isTing():boolean{return this._isTing;};
        
        private _recordCard:HQMJRecordCard;
        /**
         * 临泉麻将计牌器
         * */
        public get RecordCard():HQMJRecordCard{
            return this._recordCard;
        }
        private _haveGameScene:boolean;
        //解散房间成功标记
        private _isIgnoreForceLeft:boolean = false;
        public set ignoreForceLeft(value:boolean){
            this._isIgnoreForceLeft=value;
        }
        /**
         * 自己的椅子号
         * */
        public get SelfChair():number{
            return this.ChairID;
        }
        /**
         * 自己是否是房主
         * */
        public get SelfIsTableOwener():boolean{
            return this.ChairID == this._tableConfig.tableCreatorChair;
        }
        /**
         * 手牌数据
         * */
        public get HandCardData():Array<number>{
            return this._handCard;
        }
        /**
         * 检查余额是否可以继续游戏
         * */
        public get checkMoneyCanGame():boolean{
            //如果不够,开始求助
            // if(this.SelfRoomMoney < this.gameMoneyNum) {//this.gameMoneyNum
            //     return false;
            // }
            return true;
        }
         /**
         * 游戏所需钱数
         * */
        public get gameMoneyNum():number{
            var checkMoney: number = 0;
            
            //自建房
            if(this.isSelfCreateRoom) {
                if(this.TableConfig.IsTableCreatorPay && this.TableConfig.alreadyGameNum < 1)
                {
                    checkMoney=this.TableConfig.tableCost;
                }
                
            } else {//自动匹配场
                checkMoney = this.RoomClient.BaseMoney * this.RoomClient.JoinMultiNum;
            }
            
            return checkMoney;
        }
        
        /**
         * 我的场地余额
         * */
        // public get SelfRoomMoney():number{
        //     if(this.isSelfCreateRoom) {
        //         return this.UserBagEntity(this.RoomClient.TableCostMoneyType);
        //     }
        //     else{
        //         return this.UserBagEntity(this.RoomClient.CheckMoneyType);
        //     }
        // }

        public get ifCanPao():boolean{
            if(enGamePhase.GamePhase_Pao == this._gamePhase){
                return true;
            }
            return false;
        }

        public get ifCanLa():boolean{
            if(enGamePhase.GamePhase_La == this._gamePhase){
                return true;
            }
            return false;
        }
        /**
         * 自己是否可以操作:打出牌,自摸,暗杠
         * */
        public get ifCanOp():boolean{
            if((enGamePhase.GamePhase_PlayerOP == this._gamePhase) && (this.SelfChair == this._activePlayer)){
                return true;
            }
            return false;
        }
        /**
         * 是否可以打出某张牌
         * */
        public IfCanOutACard(card:number):boolean{
            if(HQMJMahjongDef.gInvalidMahjongValue == card){
                return false;
            }
            return true;
        }
        /**
         * 自己是否可以投票碰
         * */
        public get ifCanVotePeng():boolean{
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && HQMJMahjongAlgorithm.CheckVoteRight_Peng(this._voteRight)) {
                return true;
            }
            
            return false;
        }
        /**
         * 是否可以投票杠
         * */
        public get ifCanVoteGang():boolean{
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && HQMJMahjongAlgorithm.CheckVoteRight_Gang(this._voteRight)) {
                return true;
            }
            return false;
        }
        /**
         * 是否可以投票吃
         * */
        public get ifCanVoteChi():boolean{
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && HQMJMahjongAlgorithm.CheckVoteRight_Chi(this._voteRight)) {
                return true;
            }
            return false;
        }
        /**
         * 是否可以投票豹
         * */
        public get ifCanVoteBao():boolean{
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && HQMJMahjongAlgorithm.CheckVoteRight_Bao(this._voteRight)) {
                return true;
            }
            return false;
        }
        /**
         * 自己是否可以杠
         * */
        public get ifCanGang(): boolean {

            if(this.ifCanOp && (this._gangCard.length > 0)){
                return true;
            }

            return false;
        }
        /**
         * 自己是否可以投票胡
         * */
        public get ifCanVoteHu(): boolean {
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && HQMJMahjongAlgorithm.CheckVoteRight_Hu(this._voteRight)) {
                return true;
            }

            return false;
        }
        /**
         * 是否自己投票
         * */
        public get isSelfVote():boolean{
            cc.log("...."+this._gamePhase);
            if((enGamePhase.GamePhase_Vote == this._gamePhase) && (HQMJMahjongDef.gVoteRightMask_Null != this._voteRight)) {
                return true;
            }
            return false;
        }
        /**
         * 是否可以抢杠
         * */
        public get ifCanQiangGang():boolean{
            if(this._ifCanQiangGang && (enGamePhase.GamePhase_QiangGang == this._gamePhase)){
                return true;
            }
            
            return false;
        }
          public showHideCard(outCard:number):void{
      //  M_HQMJVideoView.ins.CardView.refreshHideCard(outCard);
    }

        /**
         * 最后一张有效的牌
         * */
        public get lastValidCard():number{
            return this._handCard[this._handCard.length - 1];
        }

        /**
         * 显示听牌
         * */
        public showTingCard(outCard:number,pos:number,tips:boolean):void{
            
            var checkAry:Array<number> = new Array<number>();
            for(var i:number=0; i<this._handCard.length; i++){
                if(HQMJMahjongDef.gInvalidMahjongValue != this._handCard[i]){
                    checkAry.push(this._handCard[i]);
                }
            }
            HQMJMahjongAlgorithm.delCard(checkAry,[outCard]);
            
            var tingAry: Array<number> = HQMJMahjongAlgorithm.GetTingCardArray(checkAry);    
            console.log("听牌长度"+tingAry.length);
                   
            var tingTip: Array<TingCardTip> = new Array<TingCardTip>();
            
            if(tingAry.length > 0){
                
                for(var j:number=0; j<tingAry.length; j++){
                    checkAry.push(tingAry[j]);
                    console.log("听牌"+tingAry[j]);
                    tingTip.push(new TingCardTip(tingAry[j],0,this.RecordCard.getCardLeftNum(tingAry[j],this._handCard)));

                    HQMJMahjongAlgorithm.delCard(checkAry,[tingAry[j]]);
                }
            }
            
            M_HQMJVideoView.ins.TingTip.showTingTip(tingTip,tips);
            
        }

 
        /**
         * 计时器事件
         * */
        private onTimerEvent(timerid: number,chair: number,leftTickNum: number):void{
            // M_HQMJVideoView.ins.TimerView.timerNum = leftTickNum;
            if(chair != this.SelfChair){
                return;
            }
            switch(timerid){
                //玩家操作
                case HQMJTimerDef.timer_id_playerop:{
                    if((0 == leftTickNum) && this.ifCanOp && !this.isSelfCreateRoom) {
                        
                        // M_HQMJVideoView.ins.CardView.selfVideoActive.activeEnable(false);
                        this.outCard(this.lastValidCard);
                    }
                    break;
                }
                //投票
                case HQMJTimerDef.timer_id_vote:{
                    if((0 == leftTickNum) && this.isSelfVote&& !this.isSelfCreateRoom) {
                        M_HQMJVideoView.ins.OperatorView.node.active=false;
                        this.vote(HQMJMahjongDef.gVoteResult_GiveUp);
                    }
                    break;
                }
                //抢杠
                case HQMJTimerDef.timer_id_qianggang:{
                    // if((0 == leftTickNum) && this.ifCanQiangGang&& !this.isSelfCreateRoom) {
                    //     M_HQMJVideoView.ins.QiangGangView.node.active=false;
                    //     this.qiangGang(1);
                    // }
                    // break;
                }
                //准备
                case HQMJTimerDef.timer_id_ready:{
                    if((0 == leftTickNum) && (chair == this.SelfChair)){

                    }
                    break;
                }
            }
        }
   
        /**
         * 玩家打牌
         * */
        private outCard(card:number):void{
            
            this._gamePhase = enGamePhase.GamePhase_Unknown;

            // M_HQMJVideoView.ins.CardView.selfVideoActive.activeEnable(false);
            M_HQMJVideoView.ins.OperatorView.node.active=false;
            // M_HQMJVideoView.ins.SelGangView.node.active=false;

            M_HQMJVideoView.ins.TimerView.hideArrow();
  
            // M_HQMJVideoView.ins.CardView.selfVideoActive.showTingCardToken(null);
            M_HQMJVideoView.ins.TingTip.showTingTip(null,true);
            
            var outCard: M_HQMJ_GameMessage.CMD_C_OutCard = new M_HQMJ_GameMessage.CMD_C_OutCard();
            outCard.outCard = card;
            // this.SendGameData(outCard);

            //M_HQMJVideoView.ins.TipMsgView.showTip("出了一张牌，4秒钟后自动隐藏",true,4);
            //console.log("======================================出了一张牌============================");
            //M_HQMJVideoView.ins.MsgBox.showMsgBox("出了一张牌，多写很多字，看是否能够自动换行，出了一张牌，多写很多字，看是否能够自动换行，出了一张牌，多写很多字，看是否能够自动换行，出了一张牌，多写很多字，看是否能够自动换行，出了一张牌，多写很多字，看是否能够自动换行，");
        }
        
        /**
         * 投票
         * */
        private vote(voteResult : number):void{
            
            this._voteRight = HQMJMahjongDef.gVoteRightMask_Null;
            this._gamePhase = enGamePhase.GamePhase_Unknown;
            this.stopTimer();
            // M_HQMJVideoView.ins.CardView.selfVideoActive.allDown();
            // M_HQMJVideoView.ins.CardView.selfVideoActive.showTingCardToken(null);
            M_HQMJVideoView.ins.TingTip.showTingTip(null,true);
            
            var vote: M_HQMJ_GameMessage.CMD_C_Vote = new M_HQMJ_GameMessage.CMD_C_Vote();
            vote.voteResult = voteResult;
            // this.SendGameData(vote);
        }
        
        /**
         * 抢杠
         * */
        private qiangGang(qiang:number):void{
            
            this._gamePhase = enGamePhase.GamePhase_Unknown;
            this._ifCanQiangGang = false;
            this.stopTimer();

            var qiangGang: M_HQMJ_GameMessage.CMD_C_QiangGang = new M_HQMJ_GameMessage.CMD_C_QiangGang();
            qiangGang.qiangGang = qiang;
            // this.SendGameData(qiangGang);
        }

        /**
         * 清理数据
         * */
        private clear():void{
            this._bankerChair = HQMJMahjongDef.gInvalidChar;
            this._gamePhase = enGamePhase.GamePhase_Unknown;
            this._activePlayer = HQMJMahjongDef.gInvalidChar;
            this._outCardPlayer.clear();
            this._recordCard.init();
            this._sz1 = 0;
            this._sz2 = 0;
            this._sendMsg = false;
            this._gameid="";
            this._alreadyHu=false;
            this._handCard.splice(0,this._handCard.length);
            this._gangCard.splice(0,this._gangCard.length);
            this._voteRight = HQMJMahjongDef.gVoteRightMask_Null;
            this._ifCanQiangGang = false;
            this._isTing=false;
            this._isIgnoreForceLeft=false;
        }

    onLoad() {
        super.onLoad();
        M_HQMJVideoClass._ins = this;
        // HQMJ.ins.iclass = this;
        M_HQMJVideoView.ins.ReadyStatusUserInfo.HQMJClass = M_HQMJVideoClass.ins;
        M_HQMJVideoView.ins.GameStatusUserInfo.HQMJClass = M_HQMJVideoClass.ins;
        M_HQMJVideoView.ins.PlayFenXiang.HQMJClass = M_HQMJVideoClass.ins;
        M_HQMJVideoView.ins.CardView.HQMJClass = M_HQMJVideoClass.ins;
        //this._shareContext ="我正在玩《霍邱麻将》，已经建好游戏房间，就等你来战！";

        this._haveGameScene=false;
        //
        //初始化
        //
        this._timer = new HQMJTimer();
        this._tableConfig = new HQMJTableConfig();
        this._outCardPlayer = new HQMJOutCardPlayer();
        this._recordCard = new HQMJRecordCard();
        this._handCard = new Array<number>();
        this._gangCard = new Array<number>();
        // HQMJ.ins.iclass = this;

        this.node.on(HQMJEvent.HQMJ_EVENT_TYPE,this.onGameViewEvent,this);
        
    }

    update(){
        super.update();
        this._timer.tick(Date.now() - this._curTime);
        this._curTime = Date.now();
    }

    // /**测试显示房号 */
    // private test():void{
    //     this.HQMJ_GameInfoView = this.GameInfoView.getComponent<HQMJ_GameInfo>(HQMJ_GameInfo);
    //     this.HQMJ_GameInfoView.tableCode="123456";
    // }


    public GetGameID(): number{
        return HQMJMahjongDef.gameID;
    }

   protected OnGameMessage(sendChair: number,cm: GameIF.CustomMessage): void {
        switch(cm.wSubCmdID){
                //桌子配置
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_TableConfig: {
                    // this.Handle_CMD_S_TableConfig(cm);
                    break;
                }
                //游戏开始
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_Start:{
                    this.Handle_CMD_S_Start(cm);
                    break;
                }
                //骰子庄家信息
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_SZInfo:{
                    this.Handle_CMD_S_SZInfo(cm);
                    break;
                }        
                //初始化牌
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_InitCard: {
                    this.Handle_CMD_S_InitCard(cm);
                    break;
                }
                //游戏ID
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_GameID: {
                    this.Handle_CMD_S_GameID(cm);
                    break;
                }
                //玩家抓了一张牌
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerHoldCard: {
                    this.Handle_CMD_S_PlayerHoldCard(cm);
                    break;
                }
                //当前活动玩家
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_ActivePlayer: {
                    this.Handle_CMD_S_ActivePlayer(cm);
                    break;
                }
                //投票权限
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_VoteRight: {
                    this.Handle_CMD_S_VoteRight(cm);
                    break;
                }
                //玩家打出了一张牌
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerOutCard: {
                    this.Handle_CMD_S_PlayerOutCard(cm);
                    break;
                }
                //删除玩家牌池的最后一张牌
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_DelPoolCard: {
                    this.Handle_CMD_S_DelPoolCard(cm);
                    break;
                }
                //玩家吃牌
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerChiCard: {
                    this.Handle_CMD_S_PlayerChiCard(cm);
                    break;
                }
                //玩家碰牌
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerPengCard: {
                    this.Handle_CMD_S_PlayerPengCard(cm);
                    break;
                }
                //玩家暗杠牌
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerAnGangCard: {
                    this.Handle_CMD_S_PlayerAnGangCard(cm);
                    break;
                }
                //玩家明杠牌
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerMingGang: {
                    this.Handle_CMD_S_PlayerMingGang(cm);
                    break;
                }
                //玩家补杠牌
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerBuGangCard: {
                    this.Handle_CMD_S_PlayerBuGangCard(cm);
                    break;
                }
                //玩家胡牌
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerHuCard: {
                    this.Handle_CMD_S_PlayerHuCard(cm);
                    break;
                }
                //操作玩家
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_OpPlayer: {
                    this.Handle_CMD_S_OpPlayer(cm);
                    break;
                }
                //开始发牌
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_StartSendCard: {
                    this.Handle_CMD_S_StartSendCard(cm);
                    break;
                }
                //玩家断线
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerOffline: {
                    this.Handle_CMD_S_PlayerOffline(cm);
                    break;
                }
                //玩家断线重连进入
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerOfflineCome: {
                    this.Handle_CMD_S_PlayerOfflineCome(cm);
                    break;
                }
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_ORC_GameScoreChange:{
                    this.Handle_CMD_S_ORC_GameScoreChange(cm);
                    break;
                }
                //抢杠信息
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_QiangGang: {
                    this.Handle_CMD_S_QiangGang(cm);
                    break;
                }
                //删除抢杠牌
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_DelQiangGangCard:{
                    this.Handle_CMD_S_DelQiangGangCard(cm);
                    break;
                }
                //玩家手牌数据
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerCardData: {
                    this.Handle_CMD_S_PlayerCardData(cm);
                    break;
                }
                //结算信息
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_Balance: {
                    this.Handle_CMD_S_Balance(cm);
                    break;
                }
                //手牌数据
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_HandCardData:{
                    this.Handle_CMD_S_HandCardData(cm);
                    break;
                }
                //断线重连游戏信息
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_ORC_GameInfo:{
                    this.Handle_CMD_S_ORC_GameInfo(cm);
                    break;
                }
                //强退成功
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_ForceLeftSuccess: {
                    this.Handle_CMD_S_ForceLeftSuccess(cm);
                    break;
                }
                //桌子创建成功
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_CreateTableSuccess: {
                    //this.Handle_CMD_S_CreateTableSuccess(cm);
                    break;
                }
                //开始创建桌子
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_StartCreateTable: {
                    this.Handle_CMD_S_StartCreateTable(cm);
                    break;
                }
                //房主信息
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_TableCreatorInfo: {
                    this.Handle_CMD_S_TableCreatorInfo(cm);
                    break;
                }
                //强退玩家
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_ForceUserLeft:{
                    this.Handle_CMD_S_ForceUserLeft(cm);
                    break;
                }
                //显示提示信息
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_ShowMsg: {
                    this.Handle_CMD_S_ShowMsg(cm);
                    break;
                }
                //好友拒绝帮忙
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_FriendReject: {
                    //this.Handle_CMD_S_FriendReject(cm);
                    break;
                }
                //好友帮助成功
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_FriendHelpSuccess: {
                    //this.Handle_CMD_S_FriendHelpSuccess(cm);
                    break;
                }
                //好友请求信息
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_FriendHelpInfo: {
                    //this.Handle_CMD_S_FriendHelpInfo(cm);
                    break;
                }
                //新的一个回合
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_NewGameRound: {
                    this.Handle_CMD_S_NewGameRound(cm);
                    break;
                }
                //计分板结果
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_GameRecordResult: {
                    this.Handle_CMD_S_GameRecordResult(cm);
                    break;
                }
                //玩家余额
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerMoney:{
                    //this.Handle_CMD_S_PlayerMoney(cm);
                    break;
                }
                //有玩家申请解散桌子
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerDissTable: {
                    this.Handle_CMD_S_PlayerDissTable(cm);
                    break;
                }
                //玩家投票解散桌子结果
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerVoteDissTable: {
                    this.Handle_CMD_S_PlayerVoteDissTable(cm);
                    break;
                }
                //桌子解散成功
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_DissTableSuccess:{
                    this.Handle_CMD_S_DissTableSuccess(cm);
                    break;
                }

                //玩家准备
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_UseReady:{
                    this.Handle_CMD_S_UseReady(cm);
                    break;
                }
                //玩家保留桌子成功
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_SaveTableSuccess:{
                    this.Handle_CMD_S_SaveTableSuccess(cm);
                    break;
                }
                //听牌玩家相关判断
                 case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_Ting:{
                    this.Handle_CMD_S_Ting(cm);
                    break;
                }
                //解散房间时操作频繁相关信息
                 case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_IsDissolution:{
                    this.Handle_CMD_S_IsDissolution(cm);
                    break;
                }
                //显示服务端的版本号
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_Version:{
                    this.Handle_CMD_S_Version(cm);
                    break;
                }
                //开始跑
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_StartPao:{
                    this.Handle_CMD_S_StartPao(cm);
                    break;
                }
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_FanKaiHun:{
                this.Handle_CMD_S_FanKaiHun(cm);
                break;
                }
                //跑信息
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerPaoInfo:{
                    this.Handle_CMD_S_PlayerPaoInfo(cm);
                    break;
                }
                //豹子听（玩家可选豹听）
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerBaoTing:{
                    this.Handle_CMD_S_PlayerBaoTing(cm);
                    break;
                }
                //玩家选择了豹听
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_PlayerBao:{
                    this.Handle_CMD_S_PlayerBao(cm);
                    break;
                }
                //圈主钻石不足 将玩家踢出房间
                case M_HQMJ_GameMessage.HQMJMsgID_s2c.CMD_S_QuitCreator:{
                    this.Hanle_CMD_S_QuitCreator();
                }

                default:{
                    console.log(`未处理的指令:${cm.wMainCmdID} -- ${cm.wSubCmdID}`);
                    break;
                }
            }
            // return true;
    }

    private Hanle_CMD_S_QuitCreator():void{
        M_HQMJVideoView.ins._setting.onExit();
        M_HQMJVideoView.ins.MsgBox.showMsgBox("圈主钻石不足,创建房间失败！");
    }
    /**
     * 把混皮牌发送到客户端
     * @param msg 
     */
    private Handle_CMD_S_FanKaiHun(msg: GameIF.CustomMessage):void{
        var hunpi:M_HQMJ_GameMessage.CMD_S_FanKaiHun=<M_HQMJ_GameMessage.CMD_S_FanKaiHun>msg;
        this._hunPiCard=hunpi.card;
        if(this.fankai){
              this.scheduleOnce(function () {
                M_HQMJVideoView.ins.CardView.hunPi.ShowCard(this._hunPiCard);             
                 M_HQMJVideoView.ins.CardView.hunPi.ShowCardHaveZZ(this._hunPiCard);
                console.log("--------延时翻牌-------")
            }.bind(this), 0.5)

        }else{
            M_HQMJVideoView.ins.CardView.hunPi.ShowCard(this._hunPiCard);             
            M_HQMJVideoView.ins.CardView.hunPi.ShowCardHaveZZ(this._hunPiCard);
        }
            
       

        
        
        //this._recordCard.outACard(hunpi.card);//这是听牌提示中显示剩余牌的结果
        //剩余牌显示
       // M_HQMJVideoView.ins.GameInfo.holdACard();//这张牌算在20张牌里面
        
        //this._outCardPlayer.playerOutCard(playerOutCard.chair, playerOutCard.card);
        //this._recordCard.outACard(hunpi.card);


        
        console.log(`此局混皮牌为${this._hunPiCard}`);
    }
    /**
     * 销毁游戏
     */
    // protected DestryGameClass(): boolean{
    //     M_HQMJVideoView.ins.DestroyView();
    //     //销毁游戏场景
    //     return true;
    // }
      /**
     * 销毁游戏
     */
    protected DestryGameClass(): boolean{
        // M_HQMJVideoView.ins.DestroyView();
        for(let i=0;i<4;i++){
            HQMJ_CardView._freeActiveNode[i].clear();
            HQMJ_CardView._freeFixedNode[i].clear();
            HQMJ_CardView._freePoolNode[i].clear();
        }
        HQMJ_BanlanceActive._freeNode.clear();
        HQMJ_BanlanceFixed._freeNode.clear();
        HQMJ_JiFenBan._freeNode.clear();
        HQMJ_TingTip._freeNode.clear();
        //销毁游戏场景
        return true;
    }


    // /**
    //  * 初始化游戏 有参数 用于初始化，会被多次调用
    //  */
    // protected OnInitClass(): void{
    //     console.log("init");
    //     //M_HQMJVideoView.ins.showGameNum(16,8,0);
    //     M_HQMJVideoView.ins.Init();
    // }
        /**
     * 初始化游戏 有参数 用于初始化，会被多次调用
     */
    protected OnInitClass(): void{
        console.log("init");
        //M_HQMJVideoView.ins.showGameNum(16,8,0);
        this.clear();
        M_HQMJVideoView.ins.Init();
    //     let timenode=this.UiManager.GetTimerForm();
    //    // timenode.x=570;
    //    timenode.x=-590;
    //     timenode.y=340;
    //     this.node.addChild(timenode); 
    //当前时间
    let timenode=this.UiManager.GetTimerForm();
        timenode.x=600;
        timenode.y=342;
        timenode.width = 1.2;
        timenode.height = 3;
        timenode.scale = 0.7;
        timenode.color=cc.color().fromHEX("#fedbc7");
        this.node.addChild(timenode); 
    }

    protected CanSkipReplayMessage(message:GameIF.CustomMessage):boolean{
        return this.videostart;
    }

    /**
     * 初始化游戏 有参数 用于初始化，每次游戏中断线重连都会被调用
     */
    protected ReInitClass():void{
        this.clear();
        M_HQMJVideoView.ins.Init();
    }
    // /**
    //  * 每次调用OnInitClass之前，会调用OnResetGameClass
    //  * @returns {} 
    //  */
    // protected OnResetGameClass(): void {
    //     this.clear();
    // }

    public GetChatMsg(): string[] {
        return this.MsgArray;
    }

    /**
     * 游戏开始
     */
    protected OnGameStart(): void {

    }

    /**
     * 游戏结束
     * */
    protected OnGameOver(): void {

    }

    /**
     * 玩家坐下:自己坐下和自己坐下后又有新的玩家进入坐下,默认状态为SitDown状态,以防万一最好再处理一下状态
     * */
    protected OnPlayerSitDown(chairID: number, player: QL_Common.TablePlayer): void {
        //cc.log("OnPlayerSitDown:" + chairID.toString() + "," + player.FaceID + "," + player.NickName + "," + player.PlayerState);
        //var a  = this.TablePlayer;
        if(this.TablePlayer[chairID].PlayerState != QL_Common.GState.Gaming)
            this.showCheckIP();
        let tmp = M_HQMJVideoView.ins;
        M_HQMJVideoView.ins.ReadyStatusUserInfo.OnPlayerSitDown(chairID,player);
        M_HQMJVideoView.ins.GameStatusUserInfo.OnPlayerSitDown(chairID,player);
        //踢人按钮
        // if(M_HQMJVideoClass.ins.SelfIsTableOwener){
        //     M_HQMJVideoView.ins.ReadyStatusUserInfo.kickBtn1.node.active = true;
        //     M_HQMJVideoView.ins.ReadyStatusUserInfo.kickBtn2.node.active = true;
        //     M_HQMJVideoView.ins.ReadyStatusUserInfo.kickBtn3.node.active = true;
        // }else{
        //     M_HQMJVideoView.ins.ReadyStatusUserInfo.kickBtn1.node.active = false;
        //     M_HQMJVideoView.ins.ReadyStatusUserInfo.kickBtn2.node.active = false;
        //     M_HQMJVideoView.ins.ReadyStatusUserInfo.kickBtn3.node.active = false;
        // }
    }
    /**
     * IP检测提示
     */
    protected showCheckIP(){
        var sameIPPlayer :Array<string> = new Array<string>();           
            for(var i:number=0; i<HQMJMahjongDef.gPlayerNum-1; i++){              
                var checkIPPlayer :string = i.toString();               
                for(var j:number=i+1; j<HQMJMahjongDef.gPlayerNum; j++){
                    if(null != this.TablePlayer[i] && null != this.TablePlayer[j] && i != this.SelfChair && j != this.SelfChair){
                        if(this.TablePlayer[i].UserIP == this.TablePlayer[j].UserIP){
                            checkIPPlayer+=`,${j}`;
                        }
                    }
                }          
                //检查本次收到的是否全部包含在其他集合中
                if(checkIPPlayer.length > 1){                  
                    var add:boolean=true;                
                    for(var m:number=0; m<sameIPPlayer.length; m++){
                        if(sameIPPlayer[m].indexOf(checkIPPlayer) >= 0){
                            add=false;
                            break;
                        }
                    }                
                    if(add){
                        sameIPPlayer.push(checkIPPlayer);
                    }
                }
            }        
            if(this._tableConfig.alreadyGameNum == 0 && sameIPPlayer.length > 0){           
                var tipMsg:string[] = [];       
                // for(var n:number=0; n<sameIPPlayer.length; n++){
                //     var chairAry: Array<string> = sameIPPlayer[n].split(",");
                //     if(chairAry.length > 1){
                //         for(var x:number=0; x<chairAry.length; x++){
                //             if(this.TablePlayer[parseInt(chairAry[x])].NickName.length > 6)
                //                 tipMsg += this.TablePlayer[parseInt(chairAry[x])].NickName.substr(0,6)+" ";
                //             else
                //                 tipMsg += this.TablePlayer[parseInt(chairAry[x])].NickName+" ";
                //             tipMsg += x == (chairAry.length - 1) ? "":",";
                //             //tipMsg += `玩家:${this.TablePlayer[parseInt(chairAry[x])].NickName}${x == (chairAry.length - 1) ? "":","}`;
                //         }
                //         // tipMsg+="  IP相同"+"\n"; 
                //     }
                //     if(n != (sameIPPlayer.length - 1)){
                //         tipMsg+=" | ";
                //     }
                // }
                let playerCount:number = 0;
                for(var i=0;i<4;i++) {
                    if(null != this.TablePlayer[i])
                        playerCount++;
                }
                if(playerCount == 4){
                    var sameIps = sameIPPlayer[0].split(",");
                    if(sameIps.length == 2){
                        if(this.TablePlayer[parseInt(sameIps[0])].NickName.length > 4){
                            this.TablePlayer[parseInt(sameIps[0])].NickName = this.TablePlayer[parseInt(sameIps[0])].NickName.substr(0,4);
                        }
                        if(this.TablePlayer[parseInt(sameIps[1])].NickName.length > 4){
                            this.TablePlayer[parseInt(sameIps[1])].NickName = this.TablePlayer[parseInt(sameIps[1])].NickName.substr(0,4);
                        }
                        tipMsg[0] = "玩家:"+this.TablePlayer[parseInt(sameIps[0])].NickName+" 与 "+"玩家:"+this.TablePlayer[parseInt(sameIps[1])].NickName
                    }
                    if(sameIps.length == 3){
                        if(this.TablePlayer[parseInt(sameIps[0])].NickName.length > 4){
                            this.TablePlayer[parseInt(sameIps[0])].NickName = this.TablePlayer[parseInt(sameIps[0])].NickName.substr(0,4);
                        }
                        if(this.TablePlayer[parseInt(sameIps[1])].NickName.length > 4){
                            this.TablePlayer[parseInt(sameIps[1])].NickName = this.TablePlayer[parseInt(sameIps[1])].NickName.substr(0,4);
                        }
                        if(this.TablePlayer[parseInt(sameIps[2])].NickName.length > 4){
                            this.TablePlayer[parseInt(sameIps[2])].NickName = this.TablePlayer[parseInt(sameIps[2])].NickName.substr(0,4);
                        }
                        tipMsg[0] = "玩家:"+this.TablePlayer[parseInt(sameIps[0])].NickName+" 与 "+"玩家:"+this.TablePlayer[parseInt(sameIps[1])].NickName
                        tipMsg[1] = "玩家:"+this.TablePlayer[parseInt(sameIps[0])].NickName+" 与 "+"玩家:"+this.TablePlayer[parseInt(sameIps[2])].NickName
                        tipMsg[2] = "玩家:"+this.TablePlayer[parseInt(sameIps[1])].NickName+" 与 "+"玩家:"+this.TablePlayer[parseInt(sameIps[2])].NickName
                    }
                    // M_HQMJVideoView.ins.cheatBox.showCheatBox(tipMsg);
                }   
            }
    }
    /**
     * 玩家坐下后告诉坐下的玩家,这个桌子上之前已经有哪些玩家了,这个函数需要同时处理玩家的状态显示
     * */
    protected OnTablePlayer(chairID: number, player: QL_Common.TablePlayer): void {
        //cc.log("OnPlayerSitDown:" + chairID.toString() + "," + player.FaceID + "," + player.NickName + "," + player.PlayerState);
        if(this.TablePlayer[chairID].PlayerState != QL_Common.GState.Gaming)
            this.showCheckIP();
        M_HQMJVideoView.ins.ReadyStatusUserInfo.OnTablePlayer(chairID,player);
        //踢人按钮
        // if(M_HQMJVideoClass.ins.SelfIsTableOwener){
        //     M_HQMJVideoView.ins.ReadyStatusUserInfo.kickBtn1.node.active = true;
        //     M_HQMJVideoView.ins.ReadyStatusUserInfo.kickBtn2.node.active = true;
        //     M_HQMJVideoView.ins.ReadyStatusUserInfo.kickBtn3.node.active = true;
        // }else{
        //     M_HQMJVideoView.ins.ReadyStatusUserInfo.kickBtn1.node.active = false;
        //     M_HQMJVideoView.ins.ReadyStatusUserInfo.kickBtn2.node.active = false;
        //     M_HQMJVideoView.ins.ReadyStatusUserInfo.kickBtn3.node.active = false;
        // }
    }

    /**
     * 玩家状态发生改变,如新的玩家坐下后默认状态为SitDown,然后玩家准备,新状态就是Ready状态
     * */
    protected OnPlayerStatusChange(chairID: number, newStatus: QL_Common.GState): void {
     
        M_HQMJVideoView.ins.ReadyStatusUserInfo.OnPlayerStatusChange(chairID,newStatus);
    }

    /**
     * 玩家离开,玩家从这个桌子上离开,游戏需要将玩家的信息从指定位置清除
     * */
    protected OnPlayerLeave(chairID: number): void {
        M_HQMJVideoView.ins.ReadyStatusUserInfo.OnPlayerLeave(chairID);
    }

    /**
     * 玩家被从桌子上拉起（开始被换桌） 此时换桌刚刚开始，玩家处于起立状态，没有椅子号
     * @returns {} 
     */
    protected OnPlayerChangeTable() {
    }

    /**
     * 玩家聊天
     * */
    protected OnPlayerChat(chairID: number, player: QL_Common.TablePlayer, chatMsg: string): void {
        M_HQMJVideoView.ins.ReadyStatusUserInfo.playerChat(chairID,chatMsg);
        M_HQMJVideoView.ins.GameStatusUserInfo.playerChat(chairID,chatMsg);
    }

    /**
     * 玩家聊天
     * */
    protected OnPlayerChatIndex(chairID: number, player: QL_Common.TablePlayer, idx: number): void {
        console.log("收到编号为" + idx + "的消息");
        M_HQMJVideoView.ins.ReadyStatusUserInfo.playerChat(chairID,this.MsgArray[idx]);
        M_HQMJVideoView.ins.GameStatusUserInfo.playerChat(chairID,this.MsgArray[idx]);
        // M_HQMJVoice.PlayChatVoice(idx, player.Gender,this.AudioManager.VoiceType);
    }

    /**
     * 玩家聊天
     * */
    protected OnPlayerChatEmoji(chairID: number, player: QL_Common.TablePlayer, clip: cc.AnimationClip): void {
        //console.log(url);
        M_HQMJVideoView.ins.ReadyStatusUserInfo.playerLook(chairID,clip);
        M_HQMJVideoView.ins.GameStatusUserInfo.playerLook(chairID,clip);
    }
    /**
     * 聊天框里的语句
     */
    public get MsgArray() {
        return [
            "大家好,很高兴见到各位",
            "快点吧,我等的花都谢了",
            "不要走,决战到天亮",
            "你的牌打的也太好了",
            "不要吵啦,不要吵啦,专心玩游戏",
            "不好意思，我要离开一会儿",
            "下次咱们再玩吧，我要走了",
            "再见了，我会想念大家的",
            "怎么又掉线了啊,网络怎么差",
            "你是MM还是GG",         
        ];
    }



    /**
     * 游戏场景
     * */
    protected OnGameScene(status: number): void {
        console.log("** 场景消息 **");
        if(this._haveGameScene){
            return;
        }
        this._haveGameScene=true;
        //播放背景音乐
        // M_HQMJVoice.PlayBgm(); 
        
        //清理数据
        this.clear();
        
        //通知玩家进入
        //this.node.dispatchEvent(new HQMJEvent(HQMJEvent.msg_playerComeing));
        M_HQMJVideoView.ins.playerComeing();
    }

    /**
     * 玩家余额发生改变
     * */
    protected OnPlayerScoreChange(): void {
        M_HQMJVideoView.ins.ReadyStatusUserInfo.refreshSelfScore();
    }

    /**
     * 准备倒计时通知
     * @param timeTick 
     * @returns {} 
     */
    protected OnPlayerReadyTimer(timeTick: number): void {
        if(!this._tableConfig.isValid && this.GameStatus!=QL_Common.TableStatus.gameing)
        {
            this.stopTimer();
            if(timeTick==-1)
            {
                M_HQMJVideoView.ins.TimerView.node.active = false;
            }
            else{
                this.regTimer(HQMJTimerDef.timer_id_ready,timeTick,this.SelfChair);
                M_HQMJVideoView.ins.TimerView.hideArrow();
            }
        }
    }

    /**
     * 一个玩家语音开始播放
     * @param chairID 
     * @returns {} 
     */
    protected OnPlayerVoiceStart(chairID: number) {
        M_HQMJVideoView.ins.ReadyStatusUserInfo.playerPlayVoice(chairID);
        M_HQMJVideoView.ins.GameStatusUserInfo.playerPlayVoice(chairID);
    }

    /**
     * 语音播放结束
     * @param chairID 
     * @returns {} 
     */
    protected OnPlayerVoiceEnd(chairID: number) {
        M_HQMJVideoView.ins.ReadyStatusUserInfo.playerStopVoice(chairID);
        M_HQMJVideoView.ins.GameStatusUserInfo.playerStopVoice(chairID);
    }

    /**
     * native环境下，玩家点击开启播放背景声音
     * @returns {} 
     */
    protected OnTurnOnMusic() {
        //由于egret出现bug，我们临时使用这种方法重新播放声音
        //在这里，调用 this.PlaySound() 播放背景音乐
        // M_HQMJVoice.PlayBgm();
    }

    /**
     * 当程序从后台返回，网络状态有响应时
     */
    protected OnNetResponding() {
        // super.OnNetResponding();
        // var reSet: M_HQMJ_GameMessage.CMD_C_ReSetScene = new M_HQMJ_GameMessage.CMD_C_ReSetScene();
        // this.SendGameData(reSet);
    }

    /**
     * 当玩家点击微信分享，但是并没有安装微信时候调用
     * @return 如果处理了这个事件返回true,否则返回false
     */
    protected OnNoInstallWx(): boolean {
        return false;
    }

    /**
     * 按键事件
     */
    protected OnKeyPressed(key: cc.KEY) {
        // if (this.isSelfCreateRoom && !this.IsCanExitGame(this.ChairID))
        //     return false;
        // if (key == cc.KEY.escape || key == cc.KEY.back) {
        //     M_HQMJVideoView.ins.OnButtonExit();
        //     return true;
        // }
        // return false;
    }

    public OnChiSel(chiNum:number,chiType:number){                  
          var chi : M_HQMJ_GameMessage.CMD_C_Chi = new M_HQMJ_GameMessage.CMD_C_Chi();
          chi.chiCard = chiNum;
          chi.chiType = chiType;
        //   this.SendGameData(chi);   
          this._sendMsg = true;
          this.chiFun(this._eventMsg);
    }
    public OnGangSel(gangCard:number){
        var gang : M_HQMJ_GameMessage.CMD_C_Gang = new M_HQMJ_GameMessage.CMD_C_Gang();
        gang.gangCard = gangCard;
        // this.SendGameData(gang);
    }

    /**
     * GameView事件
     * */
    private onGameViewEvent(e:HQMJEvent):void{
        
        switch(e.msgCode){
            //继续游戏
            case HQMJEvent.msg_goongame: {
                this.clear();
                //if(this._timer.isRuning() && this._timer.TimerID==HQMJTimerDef.timer_id_ready){
                M_HQMJVideoView.ins.TimerView.node.active = true;
                //}
                e.stopPropagation();
                this.stopTimer();
                //隐藏邀请好友按钮
                M_HQMJVideoView.ins.ReadyStatusUserInfo.btn_invite.node.active = false;

                // M_HQMJVideoView.ins.TimerView.node.active = false;
                //玩家点击继续游戏 清除所有的牌蹲
                // M_HQMJVideoView.ins.CardView.PaiWallView.hidePaiWall();
                //继续游戏时 隐藏踢人按钮
                // M_HQMJVideoView.ins.ReadyStatusUserInfo.kickBtn1.node.active = false;
                // M_HQMJVideoView.ins.ReadyStatusUserInfo.kickBtn2.node.active = false;
                // M_HQMJVideoView.ins.ReadyStatusUserInfo.kickBtn3.node.active = false;
                break;
            }
            //发送准备
            case HQMJEvent.msg_ready:{
                // this.SendUserReady();
                this.stopTimer();
                M_HQMJVideoView.ins.TimerView.node.active = false;
                e.stopPropagation();
                break;
            }
            //牌阵整理完毕
            case HQMJEvent.msg_arrangeHandCardComplete:{
                if(this.GameStatus != enGamePhase.GamePhase_SendCard){
                    return;
                }
                // this.SendGameData(new M_HQMJ_GameMessage.CMD_C_HoldCardComplete());
                e.stopPropagation();
                break;
            }
            //玩家打出牌
            case HQMJEvent.msg_outACard:{
                this.outCard(<number>e.parm);
                e.stopPropagation();
                break;
            }
            //投票
            case HQMJEvent.msg_vote:{
                this.vote(<number>e.parm);
                e.stopPropagation();
                break;
            }
            //杠牌
            case HQMJEvent.msg_gangCard:{              
                this._gamePhase = enGamePhase.GamePhase_Unknown;
                // M_HQMJVideoView.ins.CardView.selfVideoActive.showTingCardToken(null);
                M_HQMJVideoView.ins.TingTip.showTingTip(null,true);
                if(this._gangCard.length == 1){
                    var gang : M_HQMJ_GameMessage.CMD_C_Gang = new M_HQMJ_GameMessage.CMD_C_Gang();
                    gang.gangCard = this._gangCard[0];
                    // this.SendGameData(gang);
                }else{
                    // M_HQMJVideoView.ins.SelGangView.showGang(this._gangCard);
                }
                e.stopPropagation();
                break;
            }
             //吃牌
            case HQMJEvent.msg_chiCard:{
                
                this._gamePhase = enGamePhase.GamePhase_Unknown;
                // M_HQMJVideoView.ins.CardView.selfVideoActive.showTingCardToken(null);
                M_HQMJVideoView.ins.TingTip.showTingTip(null,true);
                
                var chi : M_HQMJ_GameMessage.CMD_C_Chi = new M_HQMJ_GameMessage.CMD_C_Chi();
                let leftChi = false;
                let midChi = false;
                let rightChi = false;
                let chiStyle = 0;
                if(this._handCard.indexOf(this._outCardPlayer.Card-2) > -1 && this._handCard.indexOf(this._outCardPlayer.Card-1) > -1){
                    leftChi = true;
                    chi.chiType = 0;
                    chiStyle++;
                }
                if(this._handCard.indexOf(this._outCardPlayer.Card+1) > -1 && this._handCard.indexOf(this._outCardPlayer.Card-1) > -1){
                    midChi = true;
                    chi.chiType = 1;
                    chiStyle++;
                }
                if(this._handCard.indexOf(this._outCardPlayer.Card+2) > -1 && this._handCard.indexOf(this._outCardPlayer.Card+1) > -1){
                    rightChi = true;
                    chi.chiType = 2;
                    chiStyle++;
                }
                if((leftChi && !midChi && !rightChi) || (!leftChi && midChi && !rightChi) || (!leftChi && !midChi && rightChi)){
                    chi.chiCard = this._outCardPlayer.Card;
                    // this.SendGameData(chi);

                    this.vote(<number>e.parm);
                    e.stopPropagation();
                    //e.stopPropagation();
                    break;
                    // chi.chiType = -1;
                }else if(chiStyle > 1){
                    //如果吃的选择大于一种 调预制体
                    cc.log("玩家有"+chiStyle+"种吃法,chiType分别为:leftChi|midChi|right| = "+ leftChi+"|"+midChi+"|"+rightChi);
                    // M_HQMJVideoView.ins.SelChiView.showChi(chiStyle,leftChi,midChi,rightChi,this._outCardPlayer.Card);
                    this._eventMsg = e;
                    this.chiFun(this._eventMsg);           
                    
                }

            }
            case HQMJEvent.msg_baoting:{
                // M_HQMJVideoView.ins.OperatorView.node.active=false;
                // this.SendGameData(new M_HQMJ_GameMessage.CMD_C_BaoTing());
                // e.stopPropagation();
                // break;
            }
            //自摸
            case HQMJEvent.msg_zimo:{
                // M_HQMJVideoView.ins.CardView.selfVideoActive.showTingCardToken(null);
                M_HQMJVideoView.ins.TingTip.showTingTip(null,true);

                this._gamePhase = enGamePhase.GamePhase_Unknown;
                // this.SendGameData(new M_HQMJ_GameMessage.CMD_C_ZiMo());
                e.stopPropagation();
                break;
            }
            //抢杠
            case HQMJEvent.msg_qiangGang:{
                
                this.qiangGang(<number>e.parm);
                e.stopPropagation();
                break;
            }
            //跑
            // case HQMJEvent.msg_pao:{
            //     this._gamePhase = enGamePhase.GamePhase_Unknown;
            //     var card :number = <number>e.parm;
            //     var pao : M_HQMJ_GameMessage.CMD_C_Pao = new M_HQMJ_GameMessage.CMD_C_Pao();
            //     pao.point = card;
            //     this.SendGameData(pao);
            //     e.stopPropagation();
            //     break;
            // }
            //拉
            // case HQMJEvent.msg_la:{
            //     this._gamePhase = enGamePhase.GamePhase_Unknown;
            //     var card :number = <number>e.parm;
            //     var la : M_HQMJ_GameMessage.CMD_C_La = new M_HQMJ_GameMessage.CMD_C_La();
            //     la.point = card;
            //     this.SendGameData(la);
            //     e.stopPropagation();
            //     break;
            // }
            default: {
                e.stopPropagation();
                break;
            }
        }
    }

    private chiFun(msg:any){
        if(this._sendMsg){
            this.vote(<number>msg.parm);
            msg.stopPropagation();
        }
    }
    ///消息处理


    /**
     * 桌子配置this._cellScore=cellScore;
        this._isLaPaoZuo=isLaPaoZuo;
        this._isQiDui=isQiDui;
        this._isGangKai=isGangKai;
        this._isBuKao = isBuKao;
        this._isYiPaoDuoXiang=isYiPaoDuoXiang;
        this._goldRoomBaseIdx = goldRoomBaseIdx;
        * */
    private Handle_CMD_S_TableConfig(msg: GameIF.CustomMessage):void{
        var tableConfig: M_HQMJ_GameMessage.CMD_S_TableConfig = <M_HQMJ_GameMessage.CMD_S_TableConfig>msg;
        this.GameRule["GameData"] = tableConfig;
        // this.GameRule = tableConfig;
        this._tableConfig.init(
            tableConfig.daiDaPai,
            tableConfig.LaPaoZuo>0,
            tableConfig.qiduijia>0,         
            tableConfig.gangkaijia>0,
            tableConfig.bukaojia > 0,

            tableConfig.isYiPaoDuoXiang > 0,
            tableConfig.GoldCardBaseIdx,
            tableConfig.IsRecordScoreRoom > 0,
            tableConfig.TableCreatorID,
            tableConfig.TableCreatorChair,

            tableConfig.TableCode,
            tableConfig.SetGameNum,
            tableConfig.GameNum,
            tableConfig.RealGameNum,
            tableConfig.isOutTimeOp>0,

            tableConfig.isSaveTable>0,
            tableConfig.saveTableTime,
            tableConfig.tableCreatorPay,
            tableConfig.tableCost,
            tableConfig.IfCanSameIP>0,

            tableConfig.gangFen>0,
            tableConfig.canChi>0,
            tableConfig.gangFen>0,
            tableConfig.zhanZhuang>0,
            tableConfig.daiDaPai>0,
            tableConfig.whoLose>0,

            tableConfig.tableWhere,
            tableConfig.checkGps>0

        );
        M_HQMJVideoView.ins.ReadyStatusGameInfo.refresh();
        M_HQMJVideoView.ins.ReadyStatusUserInfo.refreshSelfScore();
        M_HQMJVideoView.ins.GameInfo.init();
        let gameCount:number=0;
        if(this._tableConfig.setGameNum == 0)
            gameCount = 8;
        if(this._tableConfig.setGameNum == 1)
            gameCount = 16;    
        M_HQMJVideoView.ins.GameInfo.SetGameNum(this._tableConfig.alreadyGameNum,gameCount);
        M_HQMJVideoView.ins.GameInfo.tableCode = tableConfig.TableCode;
        M_HQMJVideoView.ins.ReadyStatusUserInfo.SelfReady();
        
        
        if(this._tableConfig.needHideUserMoney){
            M_HQMJVideoView.ins.ReadyStatusUserInfo.hideUserMoney();
        }
        this.showFangxiang(this.getSelfChair());

        // SetTextureRes(url,M_HQMJVideoView.ins.fangXiangView);

        // cc.loader.loadRes(url, cc.SpriteAtlas, function(err, atlas) {
        //     if(!err){
        //         var frame = atlas.getSpriteFrame("gfx_sifangdi_"+b);
        //         M_HQMJVideoView.ins.fangXiangView.spriteFrame = frame;
        //     }else{
        //         cc.log(err+"加载路径不对!");
        //     }
        // });

    }

    private showFangxiang(a:number){
        //取到自己的椅子号
        // let a = this.getSelfChair();
        cc.log(a+"椅子号椅子号椅子号");
        //图片下标
        let b = (a + 1)%4;
        let c = (a + 2)%4;
        let d = (a + 3)%4;
        
        //方向盘
        M_HQMJVideoView.ins.TimerView.node.active = true;
        M_HQMJVideoView.ins.TimerView.lbl_timerNum.node.active = true;

        M_HQMJVideoView.ins.TimerView.node.x = -1;
        M_HQMJVideoView.ins.TimerView.node.y = 30;
        for(var i=0;i<4;i++){
            M_HQMJVideoView.ins.TimerView.ArrowNode[i].node.opacity = 255;
            if(i!=a)
                M_HQMJVideoView.ins.TimerView.sprite_0[i].node.active = false;
            if(i!=b)
                M_HQMJVideoView.ins.TimerView.sprite_1[i].node.active = false;
            if(i!=c)
                M_HQMJVideoView.ins.TimerView.sprite_2[i].node.active = false;
            if(i!=d)
                M_HQMJVideoView.ins.TimerView.sprite_3[i].node.active = false;    
        }
    }
    /**
     * 游戏开始
     * */
    private Handle_CMD_S_Start(msg: GameIF.CustomMessage):void{
        var gameStart: M_HQMJ_GameMessage.CMD_S_Start = <M_HQMJ_GameMessage.CMD_S_Start>msg;
        this.clear();
        this._isIgnoreForceLeft=false;
        M_HQMJVideoView.ins.GameStart();

        //如果防作弊提示active 则直接隐藏
        M_HQMJVideoView.ins.cheatBox.hideCheatBox();

        // M_HQMJVideoView.ins.playHQMJAni(this.SelfChair,enHQMJAniType.aniType_start);

        //游戏开始 牌蹲显示
        // M_HQMJVideoView.ins.CardView.PaiWallView.node.active = true;
        // M_HQMJVideoView.ins.CardView.PaiWallView.showPaiWall();

        //设置分享玩家信息
        // M_HQMJVideoView.ins.GameJiFenBan.SetPlayerData();
        // M_HQMJVideoView.ins.PlayFenXiang.SetPlayerData(gameStart.gameNum);

        // M_HQMJVideoView.ins.showGameNum(gameStart.totalGameNum,gameStart.gameNum,gameStart.realGameNum);
        M_HQMJVideoView.ins.TipMsgView.node.active=false;
        
        for(var m:number=0; m<HQMJMahjongDef.gPlayerNum; m++){
            if(null == this.TablePlayer[m]) {
                continue;
            }
            //如果非断线玩家,设置成游戏状态
            if(QL_Common.GState.OfflineInGame != this.TablePlayer[m].PlayerState){
                this.TablePlayer[m].PlayerState = QL_Common.GState.Gaming;
            }          
        }
        
        if(this.isSelfCreateRoom){
            // var sameIPPlayer :Array<string> = new Array<string>();
            
            // for(var i:number=0; i<HQMJMahjongDef.gPlayerNum-1; i++){
                
            //     var checkIPPlayer :string = i.toString();
                
            //     for(var j:number=i+1; j<HQMJMahjongDef.gPlayerNum; j++){
            //         if(this.TablePlayer[i].UserIP == this.TablePlayer[j].UserIP){
            //             checkIPPlayer+=`,${j}`;
            //         }
            //     }
                
            //     //检查本次收到的是否全部包含在其他集合中
            //     if(checkIPPlayer.length > 1){
                    
            //         var add:boolean=true;
                    
            //         for(var m:number=0; m<sameIPPlayer.length; m++){
            //             if(sameIPPlayer[m].indexOf(checkIPPlayer) >= 0){
            //                 add=false;
            //                 break;
            //             }
            //         }
                    
            //         if(add){
            //             sameIPPlayer.push(checkIPPlayer);
            //         }
            //     }
            // }
            
            // if(this._tableConfig.alreadyGameNum == 0 && sameIPPlayer.length > 0){
                
            //     var tipMsg:string="";
                
            //     for(var n:number=0; n<sameIPPlayer.length; n++){
            //         var chairAry: Array<string> = sameIPPlayer[n].split(",");
            //         if(chairAry.length > 1){
            //             for(var x:number=0; x<chairAry.length; x++){
            //                 tipMsg += `玩家:${this.TablePlayer[parseInt(chairAry[x])].NickName}${x == (chairAry.length - 1) ? "":","}`;
            //             }
            //             tipMsg+="  IP相同"+"\n";
            //         }
            //         if(n != (sameIPPlayer.length - 1)){
            //             tipMsg+=" | ";
            //         }
            //     }     
            //     if(tipMsg.length > 0){
            //         //M_HQMJVideoView.ins.TipMsgView.showTip(tipMsg,true,8);
            //         // M_HQMJVideoView.ins.MsgBox.showMsgBox(tipMsg);
            //         this.ShowMsgBox(tipMsg);
                    
            //     }   
            // }
        }else{
            var tableCostName = TranslateMoneyTypeName(this.RoomClient.TableCostMoneyType);
            var tableCostNum = this.RoomClient.TableCost;
            if (tableCostNum > 0) {
                var tipMsg = `游戏已经开始，每局扣除桌费${tableCostNum}${tableCostName}`;
                this.UiManager.ShowTip(tipMsg);
            }
        }       
    }
    /**
     * 骰子数据
     * */
    private Handle_CMD_S_SZInfo(msg: GameIF.CustomMessage):void{
        var sz: M_HQMJ_GameMessage.CMD_S_SZInfo = <M_HQMJ_GameMessage.CMD_S_SZInfo>msg;
        this._bankerChair = sz.bankerChair;
        this._lianBanker=sz.lianBanker+1;
        this._sz1 = sz.sz1;
        this._sz2 = sz.sz2;
        
        //显示庄家
        M_HQMJVideoView.ins.GameStatusUserInfo.setBankerChair(this._bankerChair,this._lianBanker);
        
        //掷完骰子后 这里删除牌蹲的牌
        //_bankerChair 本局庄家座位号
        // M_HQMJVideoView.ins.PaiWallView.node.active = true;
        //M_HQMJVideoView.ins.CardView.PaiWallView.delPaiWall(this._bankerChair,this.SelfChair,this._sz1+this._sz2);
        // M_HQMJVideoView.ins.CardView.PaiWallView.testPai(this._bankerChair,this.SelfChair,this._sz1+this._sz2,0,4);
    }

    private Handle_CMD_S_StartPao(msg: GameIF.CustomMessage):void{
        //  var pao: M_HQMJ_GameMessage.CMD_S_StartPao = <M_HQMJ_GameMessage.CMD_S_StartPao>msg;
              
        // this._gamePhase=enGamePhase.GamePhase_Pao;
        // M_HQMJVideoView.ins.PaoView.node.active=true;
        // M_HQMJVideoView.ins.PaoView.btn_pao_0.node.active=true;
        // M_HQMJVideoView.ins.PaoView.btn_pao_1.node.active=true;
        // if(pao.pao==false){
        // M_HQMJVideoView.ins.PaoView.btn_pao_2.node.active=true;
        // }

        //this.regTimer(HQMJTimerDef.timer_id_vote,HQMJTimerDef.timer_len_vote,this.SelfChair);
    }

    private Handle_CMD_S_StartLa():void{
        // this._gamePhase=enGamePhase.GamePhase_La;
        // M_HQMJVideoView.ins.LaView.node.active=true;
        //this.regTimer(HQMJTimerDef.timer_id_vote,HQMJTimerDef.timer_len_vote,this.SelfChair);
    }
    private Handle_CMD_S_PlayerPaoInfo(msg: GameIF.CustomMessage):void{
        var pao: M_HQMJ_GameMessage.CMD_S_PlayerPaoInfo = <M_HQMJ_GameMessage.CMD_S_PlayerPaoInfo>msg;

        M_HQMJVideoView.ins.GameStatusUserInfo.SetPao(pao.points);
    }
    //豹听
    private Handle_CMD_S_PlayerBaoTing(msg: GameIF.CustomMessage):void{
        // M_HQMJVideoView.ins.SelBaoTing.node.active=true;
        // M_HQMJVideoView.ins.SelBaoTing.btn_bao.node.active=true;
        // M_HQMJVideoView.ins.SelBaoTing.btn_guo.node.active=true;
    }
    //通知所有玩家 有人选了豹听
    private Handle_CMD_S_PlayerBao(msg: GameIF.CustomMessage):void{
        var playerBao: M_HQMJ_GameMessage.CMD_S_PlayerBao = <M_HQMJ_GameMessage.CMD_S_PlayerBao>msg;
        M_HQMJVideoView.ins.playHQMJAni(playerBao.chair,enHQMJAniType.aniType_bao);
    }

    //选择豹听
    public btnBaoClick(){
        //  M_HQMJVideoView.ins.SelBaoTing.node.active=false;
        //  this.SendGameData(new M_HQMJ_GameMessage.CMD_C_BaoTing());
    }
    //放弃豹听
    public btnGuoClick(){
        // M_HQMJVideoView.ins.SelBaoTing.node.active=false;
        // this.SendGameData(new M_HQMJ_GameMessage.CMD_C_GiveUpBaoTing());
    }

    private Handle_CMD_S_PlayerLaInfo(msg: GameIF.CustomMessage):void{
        var la: M_HQMJ_GameMessage.CMD_S_PlayerLaInfo = <M_HQMJ_GameMessage.CMD_S_PlayerLaInfo>msg;

        M_HQMJVideoView.ins.GameStatusUserInfo.SetLa(la.points);
    }

    /**
     * 初始化牌
     * */
    private Handle_CMD_S_InitCard(msg: GameIF.CustomMessage): void {
        var initCard: M_HQMJ_GameMessage.CMD_S_InitCard = <M_HQMJ_GameMessage.CMD_S_InitCard>msg;
        this._handCard.splice(0,this._handCard.length);
        for(var i:number=0; i<initCard.cardAry.length; i++){
            if(HQMJMahjongDef.gInvalidMahjongValue != initCard.cardAry[i]){
                this._handCard.push(initCard.cardAry[i]);
            }
        }
    }
    /**
     * 游戏ID
     * */
    private Handle_CMD_S_GameID(msg: GameIF.CustomMessage): void {
        var gameid: M_HQMJ_GameMessage.CMD_S_GameID = <M_HQMJ_GameMessage.CMD_S_GameID>msg;
        this._gameid = gameid.gameid;
    }
    /**
     * 开始发牌
     * */
    private Handle_CMD_S_StartSendCard(msg: GameIF.CustomMessage): void {
        var startSendCard: M_HQMJ_GameMessage.CMD_S_StartSendCard = <M_HQMJ_GameMessage.CMD_S_StartSendCard>msg;
        this._gamePhase = enGamePhase.GamePhase_SendCard;
        //this.node.dispatchEvent(new HQMJEvent(HQMJEvent.msg_startSendCard));
        //延迟加载 因为要等待牌墙删除动作结束
      //  setTimeout(function(){
        // this.scheduleOnce(function () {
            M_HQMJVideoView.ins.StartSendCard();
            // console.log("--------延时发牌-------")
            // }.bind(this), 0.8)
      //  }.bind(this),800);
    }
    /**
     * 玩家手牌数据
     * */    
    private Handle_CMD_S_HandCardData(msg: GameIF.CustomMessage):void{
        var handCard : M_HQMJ_GameMessage.CMD_S_HandCardData = <M_HQMJ_GameMessage.CMD_S_HandCardData>msg;
        this._handCard.splice(0,this._handCard.length);
        for(var i:number=0; i<handCard.handCardData.length; i++){
            this._handCard.push(handCard.handCardData[i]);
        }    
        HQMJMahjongAlgorithm.sortCardAry(this._handCard);
        
        let index = this.physical2logicChair(this._index);
        
        M_HQMJVideoView.ins.CardView.selfVideoActive(index).refreshHandCardData(this._handCard);
        this._index++;
        cc.log(index+"玩家手牌："+this._handCard);
    }
    /**
     * 玩家抓牌
     * */
    private Handle_CMD_S_PlayerHoldCard(msg: GameIF.CustomMessage): void {
        var playerHoldCard: M_HQMJ_GameMessage.CMD_S_PlayerHoldCard = <M_HQMJ_GameMessage.CMD_S_PlayerHoldCard>msg;
        
        //剩余牌为10时 给tips提示
        if(136 - 52 - playerHoldCard.countPai == 10)
            M_HQMJVideoView.ins.TipMsgView.showTip("剩余牌只有10张了...",true,5);

        this._outCardPlayer.clear();
        
        if((this.SelfChair == playerHoldCard.chair) && (HQMJMahjongDef.gInvalidMahjongValue != playerHoldCard.card)){
            this._handCard.push(playerHoldCard.card);
        }
        
        M_HQMJVideoView.ins.GameInfo.holdACard();
        
        //玩家抓牌 去预制体删除对应牌蹲
        // M_HQMJVideoView.ins.CardView.PaiWallView.delOnePai(this.SelfChair,this._bankerChair,playerHoldCard.countPai,playerHoldCard.gangNum,playerHoldCard.usual);
        
        //玩家抓牌
        M_HQMJVideoView.ins.CardView.playerHoldCard(playerHoldCard.chair,playerHoldCard.card);
        // if((this.SelfChair == playerHoldCard.chair) && (HQMJMahjongDef.gInvalidMahjongValue != playerHoldCard.card)){
        //     M_HQMJVideoView.ins.CardView.selfVideoActive.setUpCardDown();
        // }
    }
    /**
     * 当前活动玩家
     * */
    private Handle_CMD_S_ActivePlayer(msg: GameIF.CustomMessage): void {
        this.videostart = false;
        var activePlayer: M_HQMJ_GameMessage.CMD_S_ActivePlayer = <M_HQMJ_GameMessage.CMD_S_ActivePlayer>msg;
        this._gamePhase = enGamePhase.GamePhase_PlayerOP;
        this._activePlayer = activePlayer.playerChair;
        // M_HQMJVideoView.ins.CardView.selfVideoActive.activeEnable(false);
        M_HQMJVideoView.ins.OperatorView.node.active=false;
        // M_HQMJVideoView.ins.SelGangView.node.active=false;
        //注册计时器
        this.regTimer(HQMJTimerDef.timer_id_playerop,activePlayer.timer,this._activePlayer,this.SelfChair);
    }
    /**
     * 我的投票权限
     * */
    private Handle_CMD_S_VoteRight(msg: GameIF.CustomMessage): void {
        var voteRight: M_HQMJ_GameMessage.CMD_S_VoteRight = <M_HQMJ_GameMessage.CMD_S_VoteRight>msg;
        this._gamePhase = enGamePhase.GamePhase_Vote;
        this._voteRight = voteRight.voteRight;
        
        // M_HQMJVideoView.ins.OperatorView.showOP( HQMJMahjongAlgorithm.CheckVoteRight_Chi(this._voteRight)?1:0,
        //                                     HQMJMahjongAlgorithm.CheckVoteRight_Peng(this._voteRight),
        //                                     HQMJMahjongAlgorithm.CheckVoteRight_Gang(this._voteRight)?1:0,
        //                                     HQMJMahjongAlgorithm.CheckVoteRight_Hu(this._voteRight),
        //                                     true);
        this.regTimer(HQMJTimerDef.timer_id_vote,HQMJTimerDef.timer_len_vote,this._activePlayer,this.SelfChair);
    } 
    /**
     * 玩家打出牌
     * */
    private Handle_CMD_S_PlayerOutCard(msg: GameIF.CustomMessage): void {
        var playerOutCard: M_HQMJ_GameMessage.CMD_S_PlayerOutCard = <M_HQMJ_GameMessage.CMD_S_PlayerOutCard>msg;
        M_HQMJVideoView.ins.CardView.hideOutCardArrow();
        this._sendMsg = false;
        this._outCardPlayer.playerOutCard(playerOutCard.chair,playerOutCard.card);

        this.splashUserOutMj(playerOutCard.chair,playerOutCard.card);

        this._recordCard.outACard(playerOutCard.card);
        let sex:number=this.TablePlayer[playerOutCard.chair].Gender==1?1:2;
        let chair = playerOutCard.chair;
       
        if(this._outCardPlayer.isValid){
            M_HQMJVideoView.ins.CardView.addCard2Pool(this._outCardPlayer.Chair,this._outCardPlayer.Card);
        }          
        //活动牌阵处理
        M_HQMJVideoView.ins.CardView.playerOutCard(playerOutCard.chair,playerOutCard.card);
             //听牌提示剩余牌可能要刷新
        //如果是自己
        if(this.SelfChair == playerOutCard.chair){
            HQMJMahjongAlgorithm.delCard(this._handCard,[playerOutCard.card]);
            HQMJMahjongAlgorithm.sortCardAry(this._handCard);
            
            M_HQMJVideoView.ins.OperatorView.node.active=false;

            M_HQMJVideoView.ins.TimerView.hideArrow();
            M_HQMJVideoView.ins.TingTip.showTingTip(null,true);
              this._isTing = HQMJMahjongAlgorithm.CheckIfCanTingCardArray(this._handCard);

        }
            
        }
    
    /**
     * 断线重连恢复玩家分数变化
     * */
    private Handle_CMD_S_ORC_GameScoreChange(msg: GameIF.CustomMessage):void{
        var orcGameScore : M_HQMJ_GameMessage.CMD_S_ORC_GameScoreChange = <M_HQMJ_GameMessage.CMD_S_ORC_GameScoreChange>msg;
        M_HQMJVideoView.ins.GameStatusUserInfo.reShowScoreChange(orcGameScore.PlayerScoreChange);
    }

    private splashUserOutMj(chair,outPai){
        // var action = cc.moveTo(0.1, 0, 120);
        // this.node.runAction(action);
        if(chair != this.SelfChair)
            M_HQMJVideoView.ins.mg_out.showOutPai(chair,outPai,M_HQMJVideoClass.ins);

        // var bgStr = "#shoupai2@2x.png";
        // var colorStr = $.Mj4_common.getNewCardRes(mj,"sp");
        // var bg = new sprite(bgStr);
        // var sprite = new sprite("#" + colorStr);
        // bg.addChild(sprite,0);
        // sprite.attr({
        //     x: bg.width / 2,
        //     y: bg.height / 2 - 5,
        //     anchorX: 0.5,
        //     anchorY: 0.5
        // });
        // var flareBg = new sprite("#texie_diban_light@2x.png");
        // bg.addChild(flareBg,-1);
        // flareBg.attr({
        //     x: bg.width / 2,
        //     y: bg.height / 2 + 2.5,
        //     anchorX: 0.5,
        //     anchorY: 0.5
        // });
        // flareBg.setScale(0.91);
        // this.dialogSelfParent.addChild(bg,101);
        // bg.setPosition(this.mjEffectPosition[viewseat]);
        // bg.runAction(cc.sequence(cc.delayTime(0.3),cc.fadeOut(0.1),
        //     cc.callFunc(function () {
        //         sprite.removeFromParent(true);
        //     })));
        // bg.setScale(1.2);
        // sprite.runAction(cc.sequence(cc.delayTime(0.3),cc.fadeOut(0.1)));
        // flareBg.runAction(cc.sequence(cc.delayTime(0.3),cc.fadeOut(0.1)));
    }


    /**
     * 删除玩家牌池牌
     * */
    private Handle_CMD_S_DelPoolCard(msg: GameIF.CustomMessage): void {
        var DelCard: M_HQMJ_GameMessage.CMD_S_DelPoolCard = <M_HQMJ_GameMessage.CMD_S_DelPoolCard>msg;    
        M_HQMJVideoView.ins.CardView.delCardinPool(DelCard.chair,DelCard.card,DelCard.cardnum);
    }


    /**
     * 玩家吃牌
     * */
    private Handle_CMD_S_PlayerChiCard(msg: GameIF.CustomMessage): void {
        var playerChi: M_HQMJ_GameMessage.CMD_S_PlayerChiCard = <M_HQMJ_GameMessage.CMD_S_PlayerChiCard>msg;
        
        let sex:number=this.TablePlayer[playerChi.chair].Gender==1?1:2;
        let chair:number = playerChi.chair;
        //音效
        // if(chair%2 == 0)
            // M_HQMJVoice.PlayCardType(`/sound/1/chi_1.mp3`);
        // else
            // M_HQMJVoice.PlayCardType(`/sound/1/chi_2.mp3`);
        //动画
        // M_HQMJVideoView.ins.playHQMJAni(playerChi.chair,enHQMJAniType.aniType_chi);
        M_HQMJVideoView.ins.playHQMJAni(playerChi.chair,enHQMJAniType.aniType_chi);
        // M_HQMJVideoView.ins.CardView.hideOutCardArrow();
        //清理玩家打出的牌
        this._outCardPlayer.clear();
        
        //处理吃牌
        // if(M_HQMJVideoView.ins.TingTip.node.active){
        //     this.showTingCard(0,3000);
        // }
        M_HQMJVideoView.ins.CardView.playerChi(playerChi.chair,playerChi.card,playerChi.outChair,playerChi.chi_type);
        
        if(playerChi.chi_type == 0){
            this._recordCard.chiACard(playerChi.card-1);
            this._recordCard.chiACard(playerChi.card-2);
        }
        if(playerChi.chi_type == 1){
            this._recordCard.chiACard(playerChi.card-1);
            this._recordCard.chiACard(playerChi.card+1);
        }
        if(playerChi.chi_type == 2){
            this._recordCard.chiACard(playerChi.card+1);
            this._recordCard.chiACard(playerChi.card+2);
        }

        //如果是自己
        if(this.SelfChair == playerChi.chair){
            if(playerChi.chi_type == 0){
                HQMJMahjongAlgorithm.delCard(this._handCard,[playerChi.card - 1,playerChi.card - 2]);
            }
            if(playerChi.chi_type == 1){
                HQMJMahjongAlgorithm.delCard(this._handCard,[playerChi.card - 1,playerChi.card + 1]);
            }
            if(playerChi.chi_type == 2){
                HQMJMahjongAlgorithm.delCard(this._handCard,[playerChi.card + 1,playerChi.card + 2]);
            }
            HQMJMahjongAlgorithm.sortCardAry(this._handCard);
        }
        this._sendMsg = false;
    }

    /**
     * 玩家碰牌
     * */
    private Handle_CMD_S_PlayerPengCard(msg: GameIF.CustomMessage): void {
        //当有玩家碰牌时 吃的选项view需要隐藏
        // if(M_HQMJVideoView.ins.SelChiView.node.active = true){
        //     M_HQMJVideoView.ins.SelChiView.node.active = false;
        // }
        var playerPeng: M_HQMJ_GameMessage.CMD_S_PlayerPengCard = <M_HQMJ_GameMessage.CMD_S_PlayerPengCard>msg;
        
        let sex:number=this.TablePlayer[playerPeng.chair].Gender==1?1:2;
        let chair:number = playerPeng.chair;
        //音效
        // if(chair%2 == 0)
        //     M_HQMJVoice.PlayCardType(`/sound/1/peng_1.mp3`);
        // else
        //     M_HQMJVoice.PlayCardType(`/sound/1/peng_2.mp3`);
        
        //动画
        M_HQMJVideoView.ins.playHQMJAni(playerPeng.chair,enHQMJAniType.aniType_peng);
        M_HQMJVideoView.ins.CardView.hideOutCardArrow();
        //清理玩家打出的牌
        this._outCardPlayer.clear();
        
        //处理碰牌
        // if(M_HQMJVideoView.ins.TingTip.node.active){
        //     this.showTingCard(0,3000);
        // }
        M_HQMJVideoView.ins.CardView.playerPeng(playerPeng.chair,playerPeng.card,playerPeng.outChair);
        this._recordCard.pengACard(playerPeng.card);
        //如果是自己
        if(this.SelfChair == playerPeng.chair){
            HQMJMahjongAlgorithm.delCard(this._handCard,[playerPeng.card,playerPeng.card]);
            HQMJMahjongAlgorithm.sortCardAry(this._handCard);
        }
    }
    /**
     * 玩家暗杠
     * */
    private Handle_CMD_S_PlayerAnGangCard(msg: GameIF.CustomMessage): void {
        var playerAGang: M_HQMJ_GameMessage.CMD_S_PlayerAnGangCard = <M_HQMJ_GameMessage.CMD_S_PlayerAnGangCard>msg;
        
        let sex:number=this.TablePlayer[playerAGang.chair].Gender==1?1:2;
        let chair:number = playerAGang.chair;
        // 音效
        // if(chair%2 == 0)
        //     M_HQMJVoice.PlayCardType(`/sound/1/gang_1.mp3`);
        // else
        //     M_HQMJVoice.PlayCardType(`/sound/1/gang_2.mp3`);
        //动画
        M_HQMJVideoView.ins.playHQMJAni(playerAGang.chair,enHQMJAniType.aniType_anGang);
        
        //处理暗杠牌
        // if(M_HQMJVideoView.ins.TingTip.node.active){
        //     this.showTingCard(0,3000);
        // }
        M_HQMJVideoView.ins.CardView.playerAGang(playerAGang.chair,playerAGang.card);
        this._recordCard.gangACard(playerAGang.card);
        //如果是自己
        if(this.SelfChair == playerAGang.chair) {
            HQMJMahjongAlgorithm.delCard(this._handCard,[playerAGang.card,playerAGang.card,playerAGang.card,playerAGang.card]);
            HQMJMahjongAlgorithm.sortCardAry(this._handCard);
            this._recordCard.gangACard(playerAGang.card);
        }
    }
    /**
     * 玩家明杠/直杠
     * */
    private Handle_CMD_S_PlayerMingGang(msg: GameIF.CustomMessage): void {
        //当有玩家明杠时 吃的选项view需要隐藏
        // if(M_HQMJVideoView.ins.SelChiView.node.active = true){
        //     M_HQMJVideoView.ins.SelChiView.node.active = false;
        // }
        var playerMGang: M_HQMJ_GameMessage.CMD_S_PlayerMingGang = <M_HQMJ_GameMessage.CMD_S_PlayerMingGang>msg;
        
        let sex:number=this.TablePlayer[playerMGang.chair].Gender==1?1:2;
        let chair:number = playerMGang.chair;
        // 音效
        // if(chair%2 == 0)
        //     M_HQMJVoice.PlayCardType(`/sound/1/gang_1.mp3`);
        // else
        //     M_HQMJVoice.PlayCardType(`/sound/1/gang_2.mp3`);
        //动画
        M_HQMJVideoView.ins.playHQMJAni(playerMGang.chair,enHQMJAniType.aniType_minggGang);
        M_HQMJVideoView.ins.CardView.hideOutCardArrow();
        this._outCardPlayer.clear();
        //M_HQMJVideoView.ins.OutCardView.show = false;
        
        //处理明杠牌
        // if(M_HQMJVideoView.ins.TingTip.node.active){
        //     this.showTingCard(0,3000);
        // }
        M_HQMJVideoView.ins.CardView.playerMGang(playerMGang.chair,playerMGang.card,playerMGang.outChair);
        this._recordCard.gangACard(playerMGang.card);
        //如果是自己
        if(this.SelfChair == playerMGang.chair) {
            HQMJMahjongAlgorithm.delCard(this._handCard,[playerMGang.card,playerMGang.card,playerMGang.card]);
            HQMJMahjongAlgorithm.sortCardAry(this._handCard);
        }
    }
    /**
     * 玩家补杠/巴杠
     * */
    private Handle_CMD_S_PlayerBuGangCard(msg: GameIF.CustomMessage): void {
        var playerBGang: M_HQMJ_GameMessage.CMD_S_PlayerBuGangCard = <M_HQMJ_GameMessage.CMD_S_PlayerBuGangCard>msg;
        
        let sex:number=this.TablePlayer[playerBGang.chair].Gender==1?1:2;
        var chair:number = playerBGang.chair;
        // 音效
        // if(chair%2 == 0)
        //     M_HQMJVoice.PlayCardType(`/sound/1/gang_1.mp3`);
        // else
        //     M_HQMJVoice.PlayCardType(`/sound/1/gang_2.mp3`);

        //动画
        M_HQMJVideoView.ins.playHQMJAni(playerBGang.chair,enHQMJAniType.aniType_minggGang);
        
        //处理补杠牌
        // if(M_HQMJVideoView.ins.TingTip.node.active){
        //     this.showTingCard(0,3000);
        // }
        M_HQMJVideoView.ins.CardView.playerBGang(playerBGang.chair,playerBGang.card);
        this._recordCard.gangACard(playerBGang.card);
        //如果是自己
        if(this.SelfChair == playerBGang.chair) {
            HQMJMahjongAlgorithm.delCard(this._handCard,[playerBGang.card]);
            HQMJMahjongAlgorithm.sortCardAry(this._handCard);
        }
    }

    /**
     * 玩家胡牌
     * */
    private Handle_CMD_S_PlayerHuCard(msg: GameIF.CustomMessage): void {
        //当有玩家胡牌时 吃的选项view需要隐藏
        // if(M_HQMJVideoView.ins.SelChiView.node.active = true){
        //     M_HQMJVideoView.ins.SelChiView.node.active = false;
        // }
        var playerHu: M_HQMJ_GameMessage.CMD_S_PlayerHuCard = <M_HQMJ_GameMessage.CMD_S_PlayerHuCard>msg;
        this.fankai= true;
        let sex:number=this.TablePlayer[playerHu.chair].Gender==1?1:2;
        // M_HQMJVideoView.ins.GameInfo.init();
        
        switch(playerHu.huType){
            case enHuCardType.HuCardType_GangShaPao:
            case enHuCardType.HuCardType_PingHu:{
                //清理玩家打出的牌
                this._outCardPlayer.clear();
                // if(playerHu.chair%2 == 0)
                //     M_HQMJVoice.PlayCardType(`/sound/1/hu_1.mp3`);
                // else
                //     M_HQMJVoice.PlayCardType(`/sound/1/hu_2.mp3`);
                M_HQMJVideoView.ins.playHQMJAni(playerHu.chair,enHQMJAniType.aniType_huCard);
                break;
            }
            case enHuCardType.HuCardType_QiangGangHu:{
                // if(playerHu.chair%2 == 0)
                //     M_HQMJVoice.PlayCardType(`/sound/1/hu_1.mp3`);
                // else
                //     M_HQMJVoice.PlayCardType(`/sound/1/hu_2.mp3`);
                M_HQMJVideoView.ins.playHQMJAni(playerHu.chair,enHQMJAniType.aniType_huCard);
                this._recordCard.outACard(playerHu.card);
                break;
            }
            case enHuCardType.HuCardType_ZiMo:{
                // if(playerHu.chair%2 == 0)
                //     M_HQMJVoice.PlayCardType(`/sound/1/zimo_1.mp3`);
                // else
                //     M_HQMJVoice.PlayCardType(`/sound/1/zimo_2.mp3`);
                M_HQMJVideoView.ins.playHQMJAni(playerHu.chair,enHQMJAniType.aniType_ziMo);
                this._recordCard.outACard(playerHu.card);
                break;
            }
            case enHuCardType.HuCardType_GangShangHua:{
                // if(playerHu.chair%2 == 0)
                //     M_HQMJVoice.PlayCardType(`/sound/1/zimo_1.mp3`);
                // else
                //     M_HQMJVoice.PlayCardType(`/sound/1/zimo_2.mp3`);
                M_HQMJVideoView.ins.playHQMJAni(playerHu.chair,enHQMJAniType.aniType_ziMo);
                this._recordCard.outACard(playerHu.card);
                break;
            }
        }
        this._alreadyHu=true;

    }
    /**
     * 当前操作玩家
     * */
    private Handle_CMD_S_OpPlayer(msg: GameIF.CustomMessage): void {
        var op: M_HQMJ_GameMessage.CMD_S_OpPlayer = <M_HQMJ_GameMessage.CMD_S_OpPlayer>msg;
        M_HQMJVideoView.ins.TingTip.node.active=false;
        //M_HQMJVideoView.ins.TingBtn(false);
        this._gangCard.splice(0,this._gangCard.length);
        if((null != op.gangCard) && (op.gangCard.length > 0)){
            for(var i:number=0; i<op.gangCard.length; i++){
                this._gangCard.push(op.gangCard[i]);
            }
        }
    
        if((this._gangCard.length > 0) || (op.ifCanZiMo > 0)){
            // M_HQMJVideoView.ins.OperatorView.showOP(0,false,this._gangCard.length,op.ifCanZiMo > 0,true);
            // if(this._gangCard.length > 1){
            //     M_HQMJVideoView.ins.SelGangView.showGang(this._gangCard);
            // }else if(this._gangCard.length == 1){
            //     M_HQMJVideoView.ins.OperatorView.showOP(0,false,this._gangCard.length,op.ifCanZiMo > 0,true);
            // }
        }
        // M_HQMJVideoView.ins.CardView.selfVideoActive.refreshCardStatus();
        // M_HQMJVideoView.ins.CardView.selfVideoActive.standPai();
        //检查打出哪些牌可以听牌
        var tingToken: Array<number> = HQMJMahjongAlgorithm.GetLastCardToTing(this._handCard);
        //console.log("听牌"+tingToken.length)
        // M_HQMJVideoView.ins.CardView.selfVideoActive.showTingCardToken(tingToken);
    }
    /**
     * 开始抢杠
     * */
    private Handle_CMD_S_QiangGang(msg: GameIF.CustomMessage): void {
        var startQiangGang: M_HQMJ_GameMessage.CMD_S_QiangGang = <M_HQMJ_GameMessage.CMD_S_QiangGang>msg;
        
        this._gamePhase = enGamePhase.GamePhase_QiangGang;
        this._ifCanQiangGang=true;
        
        // M_HQMJVideoView.ins.QiangGangView.showQiangGang(startQiangGang.card);
        
        //注册计时器
        //this.regTimer(HQMJTimerDef.timer_id_qianggang,HQMJTimerDef.timer_len_qianggang,this.SelfChair);
    }
    /**
     * 删除抢杠牌
     * */
    private Handle_CMD_S_DelQiangGangCard(msg: GameIF.CustomMessage):void{
        var qiangGangCard : M_HQMJ_GameMessage.CMD_S_DelQiangGangCard = <M_HQMJ_GameMessage.CMD_S_DelQiangGangCard>msg;
        // M_HQMJVideoView.ins.CardView.selfVideoActive.outACard(qiangGangCard.card);
        HQMJMahjongAlgorithm.delCard(this._handCard,[qiangGangCard.card]);
        HQMJMahjongAlgorithm.sortCardAry(this._handCard);
    }
    /**
     * 某个玩家手中牌
     * */
    private Handle_CMD_S_PlayerCardData(msg: GameIF.CustomMessage): void {
        var playerCardData: M_HQMJ_GameMessage.CMD_S_PlayerCardData = <M_HQMJ_GameMessage.CMD_S_PlayerCardData>msg;
        HQMJMahjongAlgorithm.sortCardAry(playerCardData.handCard);
        M_HQMJVideoView.ins.CardView.getActive(playerCardData.chair).showLieCard(playerCardData.handCard,playerCardData.huCard);
        // M_HQMJVideoView.ins.CardView.getActive(playerCardData.chair).activeEnable(false);
    }
    /**
     * 本局结算结果
     * */
    private Handle_CMD_S_Balance(msg: GameIF.CustomMessage): void {
        var balance: M_HQMJ_GameMessage.CMD_S_Balance = <M_HQMJ_GameMessage.CMD_S_Balance>msg;
        
        this._outCardPlayer.clear();
        M_HQMJVideoView.ins.OperatorView.node.active=false;
        // M_HQMJVideoView.ins.QiangGangView.node.active=false;
        // M_HQMJVideoView.ins.SelGangView.node.active=false;
        M_HQMJVideoView.ins.TingTip.node.active=false;
        //M_HQMJVideoView.ins.TingBtn(false);
        this.stopTimer();

        var recordData:Array<number> = new Array<number>();
        for(var i:number=0; i<balance.playerBalance.length; i++){
            recordData.push(balance.playerBalance[i].TotalScore);
        }
        // M_HQMJVideoView.ins.GameJiFenBan.gameRecord(recordData);
        M_HQMJVideoView.ins.PlayFenXiang.gameRecord(recordData);
        // M_HQMJVideoView.ins.JieShuanView.showJieShuan(balance);
               if(this.TableConfig.isPlayEnoughGameNum){
              M_HQMJVideoView.ins.DissTable.node.active=false;
        }
        M_HQMJVideoView.ins.UserData.node.active=false;
    }

    /**
     * 新的游戏回合开始
     * */
    private Handle_CMD_S_NewGameRound(msg: GameIF.CustomMessage): void {
        //新的回合开始
        // M_HQMJVideoView.ins.GameJiFenBan.gameroundStart();
    }
    
    /**
     * 记分板数据结果
     * */
    private Handle_CMD_S_GameRecordResult(msg: GameIF.CustomMessage): void {
        var data : M_HQMJ_GameMessage.CMD_S_GameRecordResult = <M_HQMJ_GameMessage.CMD_S_GameRecordResult>msg;
        // M_HQMJVideoView.ins.GameJiFenBan.gameRecordDataCome(data.record);
        M_HQMJVideoView.ins.PlayFenXiang.gameRecordDataCome(data.record);
    } 
    /**
     * 强制玩家离开
     * */
    private Handle_CMD_S_ForceUserLeft(msg: GameIF.CustomMessage): void {
        var forceLeft : M_HQMJ_GameMessage.CMD_S_ForceUserLeft = <M_HQMJ_GameMessage.CMD_S_ForceUserLeft>msg;
        if(this._isIgnoreForceLeft){
            return;
        }
        if(0 == forceLeft.cost)
            this.UiManager.ShowTip(forceLeft.msg);
        // else
            //this.ShowMsgBox("参加本局游戏至少需要"+forceLeft.cost+"颗钻石,是否前往充值");
        //this.ForceQuitting();
    }
    /**
     * 保留桌子成功
     * */
    private Handle_CMD_S_SaveTableSuccess(msg: GameIF.CustomMessage):void{
        // this.ForceQuitting();
    }
    /*玩家头像显示听*/
    private Handle_CMD_S_Ting(msg: GameIF.CustomMessage): void {
        // var playerTing: M_HQMJ_GameMessage.CMD_S_Ting = <M_HQMJ_GameMessage.CMD_S_Ting>msg;

        //听牌显示杠
        
        // for (var i = 0; i < M_HQMJVideoView.ins.CardView.getFixed(playerTing.TingNum)._fixedData.length; i++) {
        //     if (M_HQMJVideoView.ins.CardView.getFixed(playerTing.TingNum)._fixedData[i].fixedType == enFixedCardType.FixedCardType_AGang) {
        //         this._recordCard.gangACard(M_HQMJVideoView.ins.CardView.getFixed(playerTing.TingNum)._fixedData[i].cardValue);
        //         M_HQMJVideoView.ins.CardView.getFixed(playerTing.TingNum)._fixedData[i].bmp_cardcolorAry[3].node.active = false;
        //     }
        // }
    }

     private Handle_CMD_S_IsDissolution(msg:GameIF.CustomMessage):void

    {
        var busy: M_HQMJ_GameMessage.CMD_S_IsDissolution = <M_HQMJ_GameMessage.CMD_S_IsDissolution>msg;
        if(busy.IsDissolution==true){
            M_HQMJVideoView.ins.showMsg();

        }

    }

    /**
     * 
     * @param msg 显示服务端版本号
     */
        private Handle_CMD_S_Version(msg:GameIF.CustomMessage):void

        {
        var VS: M_HQMJ_GameMessage.CMD_S_Version = <M_HQMJ_GameMessage.CMD_S_Version>msg;
        // M_HQMJVideoView.ins.Help.SV.string="SV"+VS.Version;
        }




    /**
     * 玩家准备
     */
    private Handle_CMD_S_UseReady(msg: GameIF.CustomMessage):void{
        var ReadyUser:M_HQMJ_GameMessage.CMD_S_UseReady=<M_HQMJ_GameMessage.CMD_S_UseReady>msg;

        let sex:number=this.TablePlayer[ReadyUser.chair].Gender==1?1:2;
        // M_HQMJVoice.PlayCardType(`/sound/ready_${sex}.mp3`);
        // //非断线状态玩家状态改为准备状态
        // if(QL_Common.GState.OfflineInGame != this.TablePlayer[ReadyUser.chair].PlayerState){
        //     this.TablePlayer[ReadyUser.chair].PlayerState = QL_Common.GState.PlayerReady;
        // }
        // M_HQMJVideoView.ins.reMain.node.active=true;
        // M_HQMJVideoView.ins.num.node.active=true;
        // M_HQMJVideoView.ins.num1.node.active=true;
        // this._lianBanker=ReadyUser.reMain;
        // console.log("-----++++++++++++------")
        // M_HQMJVideoView.ins.showreMain(this._lianBanker);
        // M_HQMJVideoView.ins.ReadyStatusUserInfo.OnShowUserState(ReadyUser.chair);
        M_HQMJVideoView.ins.ReadyStatusUserInfo.OnPlayerStatusChange(ReadyUser.chair,this.TablePlayer[ReadyUser.chair].PlayerState);
    }
    /**
     * 开始创建桌子
     * */
    private Handle_CMD_S_StartCreateTable(msg: GameIF.CustomMessage): void {
         if (!this.GameRule) {
            console.log("Handle_CMD_S_StartCreateTable:");
            console.log(this.GameRule);
            this.ExitGame();
            return;
        }  
        //请求创建房间
               
        const gameRuleData: GameRuleData = <GameRuleData>this.GameRule;

        const data = gameRuleData.GameData;
        
        var createTable : M_HQMJ_GameMessage.CMD_C_CreateTable = new M_HQMJ_GameMessage.CMD_C_CreateTable();
        
        // createTable.CellScore = data.CellScore;
        createTable.isYiPaoDuoXiang = data.isYiPaoDuoXiang?1:0;
        createTable.QiDuiJia = data.isQiDui?1:0;
        createTable.BuKaoJia = data.isBuKao?1:0;
        createTable.GangKaiJia = data.isGangKai?1:0;
        createTable.LaPaoZuo = data.isLaPaoZuo?1:0;
       
        createTable.GoldRoomBaseIdx = 1;//data.GoldRoomBaseIdx;//this._selBaseMoney.baseMoneyIdx;
        createTable.IsRecordScoreRoom = 1;//this._cbx_jifenRoom.isSel ? 1 : 0;
        createTable.TableCode = M_HQMJVideoClass.ins.TableID.toString();
        createTable.SetGameNum = data.SetGameNum;
        createTable.TableCost = gameRuleData.TableCost;
        createTable.isOutTimeOp= data.isOutTimeOp;
        createTable.isTableCreatorPay=data.tableCreatorPay;
        createTable.IfCanSameIp=data.IfCanSameIp;
        createTable.canChi = data.canChi;
        createTable.daiDaPai = data.daiDaPai;
        createTable.gangFen = data.gangFen;
        createTable.zhanZhuang = data.zhanZhuang;
        createTable.whoLose = data.whoLose;
        
        if(data.tableCreatorPay==2){//如果是房主支付
            if(data.SetGameNum ==0){ //如果是8局
                 createTable.TableCost = 32;//桌费32钻
            }else  if(data.SetGameNum ==1){//如果是16局
                createTable.TableCost = 64;//桌费64钻
            }else{
                createTable.TableCost = 64;//局数未取到，默认桌费64钻
            }
           
        }else if(data.tableCreatorPay==1) {//如果是AA支付
            if(data.SetGameNum ==0){
                createTable.TableCost = 8;
            }else if(data.SetGameNum ==1){
                createTable.TableCost = 16;
            }else{
                createTable.TableCost = 16;
            }
        }
        //设置分享内容
        // if(this._tableConfig.isValid){
            this._shareContext = this._tableConfig.shareContext;
        // }

        // this.SendGameData(createTable);
    }

    /**
     * 房主信息
     * */
    private Handle_CMD_S_TableCreatorInfo(msg: GameIF.CustomMessage): void {
        var tableCreatorInfo: M_HQMJ_GameMessage.CMD_S_TableCreatorInfo = <M_HQMJ_GameMessage.CMD_S_TableCreatorInfo>msg;
        
        this._tableConfig.tableCreatorID = tableCreatorInfo.plyaerID;
        this._tableConfig.tableCreatorChair = tableCreatorInfo.chair;
        
        //this.node.dispatchEvent(new HQMJEvent(HQMJEvent.msg_tableCreatorInfo,this._tableConfig.tableCreatorChair,this._tableConfig.tableCreatorID));
        M_HQMJVideoView.ins.TableCreatorInfo(this._tableConfig.tableCreatorChair);
    }

    //断线重连断线重连
    /**
     * 断线重连恢复游戏信息
     * */

    /**
     * 玩家断线
     * */
    private Handle_CMD_S_PlayerOffline(msg: GameIF.CustomMessage): void {
        var playerOffLine: M_HQMJ_GameMessage.CMD_S_PlayerOffline = <M_HQMJ_GameMessage.CMD_S_PlayerOffline>msg;
        M_HQMJVideoView.ins.GameStatusUserInfo.offlineChair = playerOffLine.chair;
        M_HQMJVideoView.ins.ReadyStatusUserInfo.offlineChair = playerOffLine.chair;
    }
    /**
     * 玩家断线进来
     * */
    private Handle_CMD_S_PlayerOfflineCome(msg: GameIF.CustomMessage): void {
        var playerOfflineCome: M_HQMJ_GameMessage.CMD_S_PlayerOfflineCome = <M_HQMJ_GameMessage.CMD_S_PlayerOfflineCome>msg;
        M_HQMJVideoView.ins.GameStatusUserInfo.reconnectChair = playerOfflineCome.chair;
        M_HQMJVideoView.ins.ReadyStatusUserInfo.reconnectChair = playerOfflineCome.chair;
    }
    
    private Handle_CMD_S_ORC_GameInfo(msg: GameIF.CustomMessage): void {
        this.fankai=false;
        // M_HQMJVideoView.ins.OnResetGameView();
        //播放背景音乐
        // M_HQMJVoice.PlayBgm();
        //this.PlaySound(HQMJSoundDef.sound_bg,0,egret.Sound.MUSIC);
        //清理数据
        this.clear();
        //通知玩家进入
        M_HQMJVideoView.ins.playerComeing();//dispatchEvent(new HQMJEvent(HQMJEvent.msg_playerComeing));
        //局数恢复
        // M_HQMJVideoView.ins.showGameNum(this._tableConfig.setGameNum,this._tableConfig.alreadyGameNum,this._tableConfig.realGameNum);
        var gameInfo : M_HQMJ_GameMessage.CMD_S_ORC_GameInfo = <M_HQMJ_GameMessage.CMD_S_ORC_GameInfo>msg;
        this._bankerChair = gameInfo.bankerChair;
        this._lianBanker=gameInfo.lianBanker+1;
        this._gameid = gameInfo.gameid;
        this._gamePhase = gameInfo.gamePhase;
        M_HQMJVideoView.ins.GameStatusUserInfo.setBankerChair(this._bankerChair,this._lianBanker);
        
        //通知游戏开始开始
        M_HQMJVideoView.ins.GameStart();//(new HQMJEvent(HQMJEvent.msg_gameStart));

    }

    /**
     * 强退成功
     * */
    private Handle_CMD_S_ForceLeftSuccess(msg: GameIF.CustomMessage): void {
        // this.ForceQuitting();
    }
    //
    /**
     * 显示消息
     * */
    private Handle_CMD_S_ShowMsg(msg: GameIF.CustomMessage): void {
        var showMsg : M_HQMJ_GameMessage.CMD_S_ShowMsg = <M_HQMJ_GameMessage.CMD_S_ShowMsg>msg;
        if(1 == showMsg.tipType){
            M_HQMJVideoView.ins.TipMsgView.showTip(showMsg.msg,true,4);
        }else{
            M_HQMJVideoView.ins.MsgBox.showMsgBox(showMsg.msg);
        }
        if(101 == showMsg.tipType){
            //亲友圈圈主解散空闲房间
            this.ExitGame();
        }
    }


    /**
     * 有玩家提出解散房间
     * */
    private Handle_CMD_S_PlayerDissTable(msg: GameIF.CustomMessage):void{
        var playerDissTable: M_HQMJ_GameMessage.CMD_S_PlayerDissTable = <M_HQMJ_GameMessage.CMD_S_PlayerDissTable>msg;
        M_HQMJVideoView.ins.DissTable.playerDissTable(playerDissTable.sponsorChair,null);
    }
    
    /**
     * 玩家对解散房间进行投票
     * */
    private Handle_CMD_S_PlayerVoteDissTable(msg: GameIF.CustomMessage):void{
        var playerVoteDissTable: M_HQMJ_GameMessage.CMD_S_PlayerVoteDissTable = <M_HQMJ_GameMessage.CMD_S_PlayerVoteDissTable>msg;
        M_HQMJVideoView.ins.DissTable.playerVoteDissTable(playerVoteDissTable.chair,playerVoteDissTable.vote);
        
        if(2 == playerVoteDissTable.vote){
            M_HQMJVideoView.ins.DissTable.node.active=false;
            let name=this.getTablePlayerAry()[playerVoteDissTable.chair].NickName;
            name = name.substring(0,4);
            M_HQMJVideoView.ins.MsgBox.showMsgBox("玩家 "+name+" 拒绝解散房间");
        }
    }
    
    /**
     * 解散桌子成功
     * */
    private Handle_CMD_S_DissTableSuccess(msg: GameIF.CustomMessage):void{
        
        //},this);
        var dissTable: M_HQMJ_GameMessage.CMD_S_DissTableSuccess = <M_HQMJ_GameMessage.CMD_S_DissTableSuccess>msg;
         M_HQMJVideoView.ins.DissTable.node.active=false;
        if(0 == dissTable.gameing){
            M_HQMJVideoClass.ins.ignoreForceLeft = true;
            
            M_HQMJVideoView.ins.JieShuanView.node.active=false;
            M_HQMJVideoView.ins.PlayFenXiang.startShow(()=>{
                this.ExitGame();
            },this);
        }
    }
        

    /**
     * 注册一个计时器
     * */
    public regTimer(timerid:number,timerLen:number,chair:number,selfChair:number = 255):void{
     
        this._timer.setTimer(timerid,timerLen,chair,this.onTimerEvent,this);
        
        M_HQMJVideoView.ins.TimerView.node.active=true;
        M_HQMJVideoView.ins.TimerView.showArr(chair,selfChair,true);// = chair;
        // M_HQMJVideoView.ins.TimerView.timerNum = timerLen;
       
        this._timer.start();
    }    

    ///接口    


    /**
     * 是否自建房间
     * */
    public isCreateRoom(): boolean{
        return this.isSelfCreateRoom;
    }
    /**
     * 是否录像
     * */
    public isVideo(): boolean{
        return true;
    }
    /**
     * 是否已经胡牌
     * */
    public isAlreadyHu():boolean{
        return this._alreadyHu;
    }
    /**
     * 速度
     * */
    public getSpeed(): number {
        return 1;
    }
    /**
     * 发送游戏消息
     * */
    public sendData(cm: GameIF.CustomMessage): void{
        // this.SendGameData(cm);
    }
    /**
     * 是否可以退出游戏
     * */
    public ifCanExitGame(chairId: number): boolean{
        // return this.IsCanExitGame(chairId);
        return;
    }
    /**
     * 场地数据
     * */
    public getRoomData(): QL_Common.RoomClient{
        return this.RoomClient;
    }
    /**
     * 桌子配置
     * */
    public getTableConfig(): HQMJTableConfig{
        return this._tableConfig;
    }
    /**
     * 手牌数据
     * */
    public getSelfHandCardData(): Array<number>{
        return this._handCard;
    }
    /**
     * 取指定椅子号玩家手牌数据
     * */
    public getPlayerHandCardData(chair:number):Array<number>{
        if(chair == this.SelfChair){
            return this._handCard;
        }
        return null;
    }
    /**
     * 活动牌类名
     * */
    public getActiveCardClassName(): Array<string>{
        return ["QL.gameplug.M_HQMJ.HQMJ_selfVideoActive","QL.gameplug.M_HQMJ.HQMJ_DownActive","QL.gameplug.M_HQMJ.HQMJ_OppoActive","Uyi.gameplug.M_HQMJ.HQMJ_UpActive"];
    }
    /**
     * 获取桌子玩家集合
     * */
    public getTablePlayerAry(): Array<QL_Common.TablePlayer>{
        return this.TablePlayer;
    }
    /**
     * 取自己椅子号
     * */
    public getSelfChair(): number{
        return this.SelfChair;
    }
    /**
     * 取庄家椅子号
     * */
    public getBankerChair(): number{
        return this.BankerChair;
    }
    /**
     * 取庄家连庄数
     * */
    public getLianBanker(): number{
        return this._lianBanker;
    }
    /**
     * 获取麻将资源名称
     * */
    public getMahjongResName(card: number): string {
        return `gameres/majiang_plist/paihua/mahjong_${HQMJMahjongAlgorithm.GetMahjongColor(card)}_${HQMJMahjongAlgorithm.GetMahjongValue(card)}`;
    }
     public getMahjongPaiHuaRes(card: number): cc.SpriteFrame {
         let aa = `mahjong_${HQMJMahjongAlgorithm.GetMahjongColor(card)}_${HQMJMahjongAlgorithm.GetMahjongValue(card)}`;
         
        return this.paihua.getSpriteFrame(`mahjong_${HQMJMahjongAlgorithm.GetMahjongColor(card)}_${HQMJMahjongAlgorithm.GetMahjongValue(card)}`);
        //return `gameres/gameCommonRes/Texture/Mahjong/PaiHua/mahjong_${WHMJMahjongAlgorithm.GetMahjongColor(card)}_${WHMJMahjongAlgorithm.GetMahjongValue(card)}`;
    }
    /**
     * 获取麻将牌背资源
     * */
    public getMahjongPaiBeiRes(cardtype: string): cc.SpriteFrame {
        return this.paibei.getSpriteFrame(cardtype);
        //return `gameres/gameCommonRes/Texture/Mahjong/PaiHua/mahjong_${WHMJMahjongAlgorithm.GetMahjongColor(card)}_${WHMJMahjongAlgorithm.GetMahjongValue(card)}`;
    }
        /**
     * 获取麻将牌背资源
     * */
    public getMahjong3DPaiBeiRes(cardtype: string): cc.SpriteFrame {
        return this.paibei3d.getSpriteFrame(cardtype);
    }
    public getMahjongPaiHuaResOut(card: number): cc.SpriteFrame {
        
        return this.paihua.getSpriteFrame(`mahjong_${HQMJMahjongAlgorithm.GetMahjongColor(card)}_${HQMJMahjongAlgorithm.GetMahjongValue(card)}`);
    }
    /**
     * 逻辑椅子号转物理椅子号
     * */
    public logic2physicalChair(chair: number): number {
        return (this.SelfChair + chair) % HQMJMahjongDef.gPlayerNum;
    }

    /**
     * 物理椅子号转逻辑椅子号
     * */
    public physical2logicChair(chair: number): number {
        return chair >= this.SelfChair ? chair - this.SelfChair : HQMJMahjongDef.gPlayerNum + chair - this.SelfChair;
    }
    /**
     * 退出游戏
     * */
    public exit(): void{
        this.ExitGame();
    }
    /**
     * 停止计时器
     * */
    public stopTimer():void{
        this._timer.stop();
    }
    /**
     * 取局号
     * */
    public getGameID(): string{
        return this._gameid;
    }
    /**
     * 游戏阶段
     * */
    public getGamePhase(): enGamePhase{
        return this.GamePhase;
    }
    /**
     * 获取桌子状态
     * */
    public getTableStauts(): QL_Common.TableStatus{
        return this.GameStatus;
    }
    
    /**
     * 播放麻将音效
     * */
    public playMJSound(soundName: string,type: AudioType,loops: boolean){
        let path=cc.url.raw(soundName);//soundName是全路径名.mp3
        this.PlaySound(path, type, loops);
    }
    

        getFreeActive(chair:number):cc.NodePool{
        return HQMJ_CardView._freeActiveNode[chair];
        // switch(chair){
        //     case 0:{
        //         return WHMJ_CardView._freeselfVideoActiveNode;
        //     }
        //     case 1:{
        //         return WHMJ_CardView._freeDownActiveNode;
        //     }
        //     case 2:{
        //         return WHMJ_CardView._freeOppoActiveNode;
        //     }
        //     case 3:{
        //         return WHMJ_CardView._freeUpActiveNode;
        //     }
        // }
    }
    getFreeFixed(chair:number):cc.NodePool{
        // switch(chair){
        //     case 0:{
        return HQMJ_CardView._freeFixedNode[chair];
        //     }
        //     case 1:{
        //         return WHMJ_CardView._freeDownFixedNode;
        //     }
        //     case 2:{
        //         return WHMJ_CardView._freeOppoFixedNode;
        //     }
        //     case 3:{
        //         return WHMJ_CardView._freeUpFixedNode;
        //     }
        // }
    }
    getFreePool(chair:number):cc.NodePool{
        return HQMJ_CardView._freePoolNode[chair];
        // switch(chair){
        //     case 0:{
        //         return WHMJ_CardView._freeSelfPoolNode;
        //     }
        //     case 1:{
        //         return WHMJ_CardView._freeDownPoolNode;
        //     }
        //     case 2:{
        //         return WHMJ_CardView._freeOppoPoolNode;
        //     }
        //     case 3:{
        //         return WHMJ_CardView._freeUpPoolNode;
        //     }
        // }
    } 
}
