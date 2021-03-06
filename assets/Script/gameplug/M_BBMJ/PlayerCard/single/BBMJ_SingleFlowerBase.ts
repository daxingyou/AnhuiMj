import BBMJ_SingleCardBase from "../BBMJ_SingleCardBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_SingleFlowerBase extends BBMJ_SingleCardBase {

    
    @property(cc.Sprite)
    bmp_cardback: cc.Sprite=null;

    @property(cc.Sprite)
    bmp_cardcolor: cc.Sprite=null;



    onLoad() {
        // init logic
        
    }

    
    public init() {
        super.init();
        this.bmp_cardback.node.active=false;
        this.bmp_cardcolor.node.active=false;
    }
        
    /**
     * 显示牌
     * */
    public showCard(card:number):void{
        this._cardValue = card;
    }

}
