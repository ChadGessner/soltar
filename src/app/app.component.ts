import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Card } from 'src/Models/card.model';
import {map} from 'rxjs/operators';
import { card } from 'src/Models/card.interface';
import { Observable, Subject, from } from 'rxjs';
import { ApiService } from 'src/services/api.service';
import {Injectable} from '@angular/core';
import { GameService } from 'src/services/game.service';
import { DeckComponent } from './deck/deck.component';
import { NgStyle } from '@angular/common';
import { DragCardDirective } from './drag-card.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit, OnDestroy  {
  title = 'soltar';
  deck:Card[] = []
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
  dealtCards:Card[][] = []
  //columnsSubject:Subject<Card[]> = new Subject<Card[]>();
  isFetching = false;
  
  
  constructor( private game:GameService){
    
  }
  giveDeck(){
    return this.deck;
  }
  
  public ngOnInit(): void {
    this.game.currentCardData$.subscribe(cards => this.dealtCards = cards.slice(1,cards.length));
  }
  onCardClick(index:number){
    this.game.cardNotIsHidden(index)
  }
  onClick(){
    
    
    this.getCardColumns();
    //this.dealtCards = this.cardColumns;
    // const someDeck:Card[] = []
    // this.deckSubject = new Subject<Card>();
    // this.deckSubject.subscribe({
    //   next: (v) => this.deck.push(v),
    // })
    // this.deck = []
    // this.game.deckObservable.subscribe(this.deckSubject)
    // console.log(this.deck)
    //this.deck = this.game.getCardColumns()[0];
    //console.log(this.game.getCardColumns()[0].length);
    
    for(let i = 0; i < this.deck.length; i++){
      console.log(this.deck[i].x);
    }
  }
  
  public fetchImage(card:Card):string{
    return this.game.fetchImage(card);
  }
  public getCardColumns(){
    
    this.game.dealCards();
    
    //console.log(this.cardColumns[0].length + "     lasdkhjg");
    
    // for(let i = 0; i < this.cardColumns.length; i++){
    //   console.log(this.cardColumns[i].length);
      
    // }
  }
  
  public positionMod(card:Card) {
    return {
      left: `${card.x}px`
    }
  }
  ngOnDestroy(): void {
    
  }
}
