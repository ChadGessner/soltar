import { card } from "./card.interface";

export class Card implements card {
    suit:string;
    value:string;
    isHidden:boolean;
    reverseImage:string;
    imageUrl:string;
    constructor(suit:string,value:string, isHidden:boolean, reverseUrl:string,imageUrl:string){
        this.suit = suit,
        this.value = value,
        this.isHidden = isHidden,
        this.reverseImage = reverseUrl,
        this.imageUrl = imageUrl
    }
}