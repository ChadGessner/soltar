import {Injectable, OnInit, Output, EventEmitter, NgZone} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from 'src/Models/card.model';
import { ApiService } from './api.service';
import {Subject, from, Observable} from 'rxjs';



@Injectable()
export class GameService implements OnInit{
    deck:Card[] = [];
    drawCount:number = 0;
    cardColumns:Card[][] = [
        [],
         [],
          [],
           [],
            [],
             [],
              [],
               [],
                []
    ]
    private cardDataSource = new BehaviorSubject(this.cardColumns);
    private deckDataSource = new BehaviorSubject(this.deck);
    public currentCardData$ = this.cardDataSource.asObservable();
    public currentDeckData$ = this.deckDataSource.asObservable();
    constructor(private api:ApiService, ngZone:NgZone) {
        this.api
        .fetchPosts()
        .subscribe((cards) => {
           this.getDeck(cards);
       })
       
    }
    ngOnInit(): void {
    
    }
    clearCardColumns(){
        for(let j = 0; j < this.cardColumns.length; j++){
            this.cardColumns[j] = [];
            //this.updateCards();
        }
    }
    setColumnStyleValues() {
        let count = 0
        
        for(let i = 0; i < this.cardColumns.length; i++){
            for(let j = 0; j < this.cardColumns[i].length; j++){
                let card = this.cardColumns[i][j];
                //this.updateCards();
                //console.log(card.column);
                
                count ++;
                if(card){
                    switch(i){
                        case 0:
                            card.x = j * .19;
                            card.y = j * .27;
                            card.z = j;
                            card.isHidden = true;
                            break;
                        case 1:
                            this.threeStackTracker()
                        //    card.x = (i * 20) + 120
                        //    card.y = (i * 20) + 170
                        //    card.z = i
                        //    card.isHidden = false;
                            break;
                        default:
                            card.x = i * 140;
                            card.y = j * 20;
                            card.z = j;
                            card.isHidden = j === i - 2 ? false : true;
                            break;
                    }
                    
                    //this.updateCards();
                }
            }
        }
        // this.threeStackTracker();
        //this.updateCards();
    }
    updateCards(){
        // let card = this.cardColumns[0].slice(0,1);
        // this.cardColumns[0] = this.cardColumns[0].slice(1,this.cardColumns[0].length).concat(card);
        this.deckDataSource.next(this.deck)
        this.cardDataSource.next(this.getCardColumns());
    }
    threeStackSubscribe = (car:Card[]) => {
        this.currentCardData$.subscribe(c=> car = c[1]);
        return car;
    }
    threeStackTracker() {
        const threeStack:Card[] = this.cardColumns[1].slice();
        for(let i = 0; i < this.cardColumns[1].length; i++){
            this.cardColumns[1][i].x = (i * 20) + 120
            this.cardColumns[1][i].y = (i * 20) + 170
            this.cardColumns[1][i].z = i
            this.cardColumns[1][i].isHidden = false
        }
        this.updateCards();
        //  threeStack.map(
        //     (c,i)=>{
        //         c.x = (i * 20) + 120
        //         c.y = (i * 20) + 170
        //         c.z = i
        //         c.isHidden = false;
        //         })
        //         this.cardColumns[1] = []
        //    this.cardColumns[1] = threeStack;
    }
    allocateCardPositionsForInitialDeal() {
        
        this.clearCardColumns();
        for(let i = 0; i < this.deck.length; i++){
            let card = this.deck[i];
            for(let j = 0; j < this.cardColumns.length; j++){
                if(card.column === j){
                    this.cardColumns[j].push(card);
                    break;
                }
            }
        }
        
        //this.cardColumns[0] = this.cardColumns[0].slice(-this.drawCount).concat(this.cardColumns[0].slice(this.drawCount, this.cardColumns[0].length))
        this.updateCards();
    }
    allocateCardPositionsPostDeal(){
        let count = 0;
        let cards = this.cardColumns.flat();
        for(let j = 0; j < this.cardColumns.length; j++){
            this.cardColumns[j] = cards
            .filter(c=>c.column === j);
        }
        //this.threeStackTracker();
        this.updateCards()
    }
    resetCard(card:Card){
        this.onUpdate();
    }
    getCardColumns(){
        return this.cardColumns;
    }
    
    deckNotIsHidden(stack:Card[]) {
        stack.forEach((c,i)=>{
            c.isHidden = true;
            if(i === stack.length - 1){
                c.isHidden = false;
            }
        })
    }
    dealCards() {
        this.allocateCardPositionsForInitialDeal();
        let count = 0;
        for(let i = 2; i < this.cardColumns.length; i++){
            for(let j = 0; j < i - 1; j++){
                this.deck[count].column = i;
                this.updateCards()
                count++;
            }
        }
        this.onUpdate();
    }

    drawCardFromDeck(card:Card){
        // this.updateCards();
        // this.threeStackTracker();
            
        if(this.cardColumns[1].length === 3){
            this.cardColumns[1].map(c=>c.column = 0)
            this.cardColumns[0] = this.cardColumns[1].concat(this.cardColumns[0])
            this.cardColumns[1] = []
            //this.updateCards();
        }
        card.column = 1;
        this.cardColumns[0] = this.cardColumns[0].filter(c => c !== card);
        this.cardColumns[1] = this.cardColumns[1].concat([card])
        //this.threeStackTracker();
        this.updateCards();
        this.onUpdate();
    }
    cardNotIsHidden(index:number){
        this.deck[index].isHidden = !this.deck[index].isHidden;
    }
    public giveCardColumns() {
        return this.cardColumns;
    }
    private getDeck(deck:Card[]){
        
        this.deck = deck;
        this.deck.map(c=>c.column = 0);
    }
    public fetchImage(card:Card):string{
        return card.isHidden ? 'https://localhost:7043' + card.reverseImage : 'https://localhost:7043' + card.imageUrl;
      }
    onUpdate() {
        this.allocateCardPositionsPostDeal();
        this.setColumnStyleValues();
        this.updateCards();
        //this.threeStackTracker();
    }
}