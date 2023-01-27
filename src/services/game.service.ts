import {Injectable, OnInit, Output, EventEmitter} from '@angular/core';
import { Card } from 'src/Models/card.model';
import { ApiService } from './api.service';
import {Subject, from, Observable} from 'rxjs';

@Injectable()
export class GameService implements OnInit{
    deck:Card[] = [];
    cardColumns:Card[][] = []
    columnsObservable:Observable<Card[]> = new Observable<Card[]>();
    deckObservable:Observable<Card> = new Observable<Card>();
    pileOfThree:Card[] = [];
    pileOfThreeObservable:Observable<Card> = new Observable<Card>();
    isDealt:boolean = false;
    zIndex:number = 0;
    constructor(private api:ApiService) {
         this.api.fetchPosts().subscribe((cards) => {
            this.getDeck(cards);
            this.deckObservable = from(this.deck);
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
    stackNotIsHidden(){
        this.cardColumns.forEach(s=>{
           s.forEach((c,i)=>{
            c.isHidden = true;
                if(i === s.length -1){
                    c.isHidden = false;
                }
            })
        })
        this.deckObservable = from(this.deck)
        this.columnsObservable = from(this.cardColumns);
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
        this.stackNotIsHidden();
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
        return this.deck;
    }
    public getDeck(deck:Card[]){
        this.deck = deck;
    }
    public fetchImage(card:Card):string{
        return card.isHidden ? 'https://localhost:7043' + card.reverseImage : 'https://localhost:7043' + card.imageUrl;
      }
    onUpdate() {
        
    }
}