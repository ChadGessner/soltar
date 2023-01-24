import {Injectable, OnInit, Output, EventEmitter} from '@angular/core';
import { watchFile } from 'fs';
import { Card } from 'src/Models/card.model';
import { ApiService } from './api.service';
import {Subject, from, Observable} from 'rxjs';
import {map} from 'rxjs';

@Injectable()
export class GameService implements OnInit{
    deck:Card[] = [];
    cardColumns:Card[][] = []
    columnsObservable:Observable<Card[]> = new Observable<Card[]>();
    isFetching = false;
    deckObservable:Observable<Card> = new Observable<Card>();
    
    constructor(private api:ApiService) {
        this.isFetching = false;
         this.api.fetchPosts().subscribe((cards) => {
            this.isFetching = true;
            console.log(this.isFetching);
            this.getDeck(cards);
            this.deckObservable = from(this.deck);
        })
        this.isFetching = false;
        
    }
    ngOnInit(): void {
        
    }
    deckNotIsHidden() {
        this.deck.forEach((c,i)=>{
            c.isHidden = true;
            if(i === this.deck.length-1){
                c.isHidden = false;
            }
        })
    }
    dealCards() {
        for(let i = 1; i < 8; i++){
            let stack:Card[] = [];
            for(let j = 1; j < i + 1; j++){
                let card:Card = this.drawCardFromDeck();
                
                stack.push(card);
            }
            console.log(stack.length)
            this.cardColumns.push(stack);
        }
        this.columnsObservable = from(this.cardColumns);
    }
    drawCardFromDeck(){
        let card:Card = this.deck[this.deck.length-1];
        console.log(this.deck[this.deck.length-1])
        this.deck = this.deck.slice(0,this.deck.length-1)
        this.deckNotIsHidden();
        this.deckObservable = from(this.deck);
        
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