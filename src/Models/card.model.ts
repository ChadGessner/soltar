import { card } from "./card.interface";
//import { Card } from './cardType';



export class Card implements card {
    public suit:string | null;
    public value:string | null ;
    public isHidden:boolean | null  ;
    public reverseImage:string | null ;
    public imageUrl:string | null ;
    public x:number | null;
    public y:number  | null ;
    public z:number  | null ;
    public column:number  | null ;
    constructor(suit:string,value:string, isHidden:boolean, reverseUrl:string,imageUrl:string) {
        this.suit = suit,
        this.value = value,
        this.isHidden = isHidden,
        this.reverseImage = reverseUrl,
        this.imageUrl = imageUrl
        this.x = null;
        this.y = null;
        this.z = null;
        this.column = null;
    } 
}  