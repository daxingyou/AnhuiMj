import LQMJ_SelfActive from "./LQMJ_SelfActive";
import { LQMJ } from "../../ConstDef/LQMJMahjongDef";
import M_LQMJVideoClass from '../../M_LQMJVideoClass';
import LQMJ_VideoActiveBase from "./LQMJ_VideoActiveBase";
import LQMJ_SelfSingleActive from "../single/active/LQMJ_SelfSingleActive";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LQMJ_SelfVideoActive extends LQMJ_VideoActiveBase {


    onLoad() {
        // init logic
        this.init(0);
    }

    private static ArrangeStartPos: Array<number> = [70,280,504,718,962];
    private static ArrangeStartPos3D: Array<number> = [-595,-330,-82,150,380];

    /**
     * 玩家胡牌
     * */
    public playerHu(huCard: number): void {
        var lastCard:Array<number> = new Array<number>();
        for(var i:number=0; i<M_LQMJVideoClass.ins.getSelfHandCardData().length; i++){
            lastCard.push(M_LQMJVideoClass.ins.getSelfHandCardData()[i]);
        }
        
        if(2 == (lastCard.length % 3)){
            lastCard.pop();
        }
        
        this.showLieCard(lastCard,huCard);
        
    }

    /**
     * 刷新手牌数据
     * */
    public refreshHandCardData(cardAry: Array<number>): void {
        // for(var i:number=0; i<cardAry.length; i++){
        //     cardAry[i]=0x01;
        // }
        super.refreshHandCardData(cardAry);
    }

    /**
     * 抓牌墩牌
     * */
    public holdTricksCard(holdIdx: number): number {
        var holdNum =holdIdx;// (3 == holdIdx ? 1 : 4);

        for(var i: number = 0;i < holdNum;i++) {
            this._handCard.push(M_LQMJVideoClass.ins.getSelfHandCardData()[i]);//[holdIdx*4 + i]);
        }
        this.node.active=false;
        this.handCardChange();
        this.node.active=true;
        return holdNum;
    }

    /**
     * 刷新手牌
     * */
     /**
     * 刷新手牌
     * */
    protected refreshHandCard(): void {
        //this.node.active=false;

        //this.node.active=true;
        // for(var i: number = 0;i < this._cardData.length;i++) {
        //     this._cardData[i].node.active=true;
        // }
        if(M_LQMJVideoClass.ins.is2D()){
            //起始位置
            let startPos: number = LQMJ_SelfVideoActive.ArrangeStartPos[this.fixedCardNum];
            //开始排版

            for(var i: number = 0;i < this._cardData.length;i++) {
                //this._cardData[i].node.setLocalZOrder(i+1);
                this._cardData[i].node.x = startPos + i * 83-600;
                this._cardData[i].node.y = -284;
                this._cardData[i].node.width = 87;
                this._cardData[i].node.height = 124;

                this._cardData[i].showCard(this._handCard[i],this.isLie,0,M_LQMJVideoClass.ins);

                if(this.isHoldAfter && (i == (this._cardData.length - 1))) {
                    this._cardData[i].node.x += 15;
                    
                    if(!this.isLie && !M_LQMJVideoClass.ins.isVideo())
                    {(<LQMJ_SelfSingleActive>this._cardData[i]).setUp();}
                }
                if(!this.isHoldAfter && this._cardData.length%3==2 && (i == (this._cardData.length - 1))){//自己碰过之后会右移第一张牌
                    this._cardData[i].node.x += 15;
                }
            }
        }
        else{
            //起始位置
            let startPos: number = LQMJ_SelfVideoActive.ArrangeStartPos3D[this.fixedCardNum];
            //开始排版
            for(let i: number = 0;i < this._cardData.length;i++) {
                //this._cardData[i].node.setLocalZOrder(i+1);
                this.resetZ();
                this._cardData[i].node.x = startPos + i * 90;
                this._cardData[i].node.y = -295;

                if(!this.isHoldAfter && this._cardData.length%3==2 && (i == (this._cardData.length - 1))){//自己碰过之后会右移第一张牌
                    this._cardData[i].node.x += 20;
                }
                this._cardData[i].showCard(this._handCard[i],this.isLie,i+this.fixedCardNum*3+1,M_LQMJVideoClass.ins);
                if(this.isHoldAfter && (i == (this._cardData.length - 1))) {
                    this._cardData[i].node.x += 20;
                     
                    if(!this.isLie && !M_LQMJVideoClass.ins.isVideo())
                    {(<LQMJ_SelfSingleActive>this._cardData[i]).setUp();}
                }
                // cc.log(i+"="+"("+this._cardData[i].node.x+","+this._cardData[i].node.y+")");
            }
        }
    }

    private resetZ():void{
        if(this._cardData.length<=7){
            for(let i: number = 0;i < this._cardData.length;i++){
                this._cardData[i].node.setLocalZOrder(this._cardData.length-i);
            }
        }else{
            let x=this._cardData.length-7;
            for(let i: number = 0;i < x;i++){
                this._cardData[i].node.setLocalZOrder(i);
            }
            for(let i: number = x;i < this._cardData.length;i++){
                this._cardData[i].node.setLocalZOrder(this._cardData.length-i);
            }
        }
    }

    /**
     * 抓到一张牌
     * */
    public holdACard(card: number,_lqmj): void {
        super.holdACard(card,_lqmj);
    }

    /**
     * 打出一张牌
     * */
    public outACard(card: number,_lqmj): void {
        super.outACard(card,_lqmj);
    }

     /**
     * 吃了一张牌
     * */
    public chiACard(card: number,type:number,_lqmj): void {
        super.chiACard(card,type,_lqmj);
    }
    
    /**
     * 碰了一张牌
     * */
    public pengACard(card: number,_lqmj): void {
        super.pengACard(card,_lqmj);
    }

    /**
     * 明杠了一张牌
     * */
    public MGangACard(card: number,_lqmj): void {
        super.MGangACard(card,_lqmj);
    }

    /**
     * 暗杠了一张牌
     * */
    public AGangACard(card: number,_lqmj): void {
        super.AGangACard(card,_lqmj);
    }

    /**
     * 补杠了一张牌
     * */
    public BGangACard(card: number,_lqmj): void {
        super.BGangACard(card),_lqmj;
    }

}
