import TDHMJ_SingleCardBase from "../TDHMJ_SingleCardBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TDHMJ_SinglePoolBase extends TDHMJ_SingleCardBase {

    @property(cc.Sprite)
    bmp_cardback: cc.Sprite=null;

    @property(cc.Sprite)
    bmp_cardcolor: cc.Sprite=null;

    @property(cc.Sprite)
    bmp_cardHide: cc.Sprite=null;

    onLoad() {
        // init logic
    }

    public init() {
        super.init();
        this.bmp_cardback.node.active=false;
        this.bmp_cardcolor.node.active=false;
        this.bmp_cardHide.node.active=false;
    }
        
    /**
     * 显示牌
     * */
    public showCard(card:number,index:number,_lqmj):void{
        this._cardValue = card;
        this._cardIndex=index;
    }
    
    public showHide(card:number):void{//传0清
        if(cc.isValid(this.node)){
            if(card==this._cardValue){
                this.bmp_cardHide.node.active=true;
            }else{
                this.bmp_cardHide.node.active=false;
            }
        }
    }
}
