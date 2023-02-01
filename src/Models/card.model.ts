import { card } from "./card.interface";

export class Card implements card {
    suit:string;
    value:string;
    isHidden:boolean;
    reverseImage:string;
    imageUrl:string;
    x:number = 0;
    y:number = 0;
    z:number = 0;
    pileNumber:number = 0;
    constructor(suit:string,value:string, isHidden:boolean, reverseUrl:string,imageUrl:string){
        this.suit = suit,
        this.value = value,
        this.isHidden = isHidden,
        this.reverseImage = reverseUrl,
        this.imageUrl = imageUrl
    }
}