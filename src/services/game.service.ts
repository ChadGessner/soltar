import {Injectable, OnInit, Output, EventEmitter} from '@angular/core';
import { Card } from 'src/Models/card.model';
import { ApiService } from './api.service';
import {Subject, from, Observable} from 'rxjs';

@Injectable()
export class GameService implements OnInit{
    deck:Card[] = [];
    threeStack:Card[] = [];
    cardColumns:Card[][] = [];
    deckIndex:number = 0;
    allCards:Card[][] = [[],[],[],[],[],[],[],[],[]];
    columnsObservable:Observable<Card[]> = new Observable<Card[]>();
    deckObservable:Observable<Card> = new Observable<Card>();
    pileOfThree:Card[] = [];
    pileOfThreeObservable:Observable<Card> = new Observable<Card>();
    isDealt:boolean = false;
    zIndex:number = 0;
    constructor(private api:ApiService) {
         this.api.fetchPosts().subscribe((cards) => {
            this.updateDeck(cards);
            
        })

    }
    nextZIndex(){
        this.zIndex++;
        return this.zIndex;
    }
    nextCard() {
        let card = this.drawCardFromDeck();
        
        if(this.pileOfThree.length == 3){
            this.deck = this.pileOfThree.concat(this.deck);
            this.pileOfThree.length = 0;
        }
        this.deckNotIsHidden();
        //card.isHidden = false;
            this.pileOfThree.push(card);
            
            this.deckObservable = from(this.deck);
            this.pileOfThreeObservable = from(this.pileOfThree)

    }
    ngOnInit(): void {
        
    }

    // return { top : `${index * 20}px`}
    // {right: `${120 * index}px`}
    setXYZForColumns(){
        let xSet:number;
        let ySet:number;
        let zSet:number;
        let card:Card;
        for(let i = 0; i < this.cardColumns.length; i++){
            xSet = 120 * i;
            for(let j = 0; j < this.cardColumns[i].length; j++){
                ySet = 20 * j;
                zSet = j;
                card = this.cardColumns[i][j];
                card.x = xSet;
                card.y = ySet;
                card.z = zSet;
                this.cardColumns[i][j] = card;
            }
        }
    }

    setXYZForDeck(){
        for(let i = 0; i < this.deck.length; i++){
            let card:Card = this.deck[i];
            card.z = 1;
            card.x = (i * .12) + 240;
            card.y = (i * .13) + 240;
            this.deck[i] = card;
        }
        
    }
    
    deckNotIsHidden() {
        this.deck.forEach((c,i)=>{
            c.isHidden = true;
            if(i === this.deck.length ){
                c.isHidden = false;
            }
        })
        this.deckObservable = from(this.deck);
    }
    dealCards() {
        
        for(let i = 1; i < 8; i++){
            let stack:Card[] = [];
            for(let j = 1; j < i + 1; j++){
                let card:Card = this.drawCardFromDeck();
                stack.push(card);
            }
            
            this.cardColumns.push(stack);
        }
        
        this.deckNotIsHidden();
        this.isDealt = true;
    }
    drawCardFromDeck(){
        let card:Card = this.deck[this.deck.length-1];
        
        this.deck = this.deck.slice(0,this.deck.length-1)
        this.deckObservable = from(this.deck);
        card.isHidden = false;
        return card;
    }
    cardNotIsHidden(index:number){
        this.deck[index].isHidden = !this.deck[index].isHidden;
        this.deckObservable = from(this.deck);
    }
    public giveDeck() {
        this.setXYZForDeck();
        this.deckObservable = from(this.deck);
        return this.deck;
    }
    public updateDeck(deck:Card[]){
        this.deck = deck;
        this.setXYZForDeck();
        this.deckObservable = from(this.deck);
        return this.deck;
    }
    public fetchImage(card:Card):string{
        return card.isHidden ? 'https://localhost:7043' + card.reverseImage : 'https://localhost:7043' + card.imageUrl;
      }
    onUpdate() {
        
    }
}