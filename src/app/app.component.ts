import { Component, OnInit,Input } from '@angular/core';
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


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'soltar';
  isFetching = false;
  deck:Card[] = []
  cardColumns:card[][]  = [];
  columnsSubject:Subject<Card[]> = new Subject<Card[]>();
  pileOfThree:Card[] = [];
  pileOfThreeSubject:Subject<Card> = new Subject<Card>();
  deckSubject:Subject<Card> = new Subject<Card>();
  
  constructor(private api:ApiService, private game:GameService){
    
  }
  giveDeck(){
    return this.deck;
  }
  
  public ngOnInit(): void {
    this.game.deckObservable.subscribe(this.deckSubject);
    this.game.columnsObservable.subscribe(this.columnsSubject);
    this.game.pileOfThreeObservable.subscribe(this.pileOfThreeSubject );
  }
  onCardClick(index:number){
    this.game.cardNotIsHidden(index)
  }
  update(){
    const someDeck:Card[] = []
    this.deckSubject = new Subject<Card>();
    this.columnsSubject = new Subject<Card[]>();
    this.pileOfThreeSubject = new Subject<Card>();
    this.deckSubject.subscribe({
      next: (v) => this.deck.push(v),
    })
    this.deck = someDeck;
    this.game.deckObservable.subscribe(this.deckSubject)
    this.columnsSubject.subscribe({
      next: (q) => this.cardColumns.push(q),
    })
    this.cardColumns = [];
    this.game.columnsObservable.subscribe(this.columnsSubject);
    this.pileOfThreeSubject.subscribe({
      next: (k)=> this.pileOfThree.push(k),
    })
    this.pileOfThree = [];
    this.game.pileOfThreeObservable.subscribe(this.pileOfThreeSubject);
    
  }
  onClick(){
    this.getCardColumns();
    this.update();
  }
  drewCard(){
    return 1;
  }
  nextCard() {
    this.game.nextCard();
    this.update();
  }
  drawCard(){
    this.nextCard();
    console.log('isdrawcard');
    
  }
  subscribePileOfThree(){
    this.pileOfThreeSubject = new Subject<Card>();
    const update:Card[] = []
    this.pileOfThreeSubject.subscribe({
      next: (c)=> this.pileOfThree.push(c)
    })
    this.pileOfThree = update;
    this.game.pileOfThreeObservable.subscribe(this.pileOfThreeSubject)
  }
  public fetchImage(card:Card):string{
    return this.game.fetchImage(card);
  }
  public getCardColumns(){
    this.game.dealCards();
    this.game.columnsObservable.subscribe({
      next: (cc)=> this.cardColumns.push(cc)
    })
    this.game.deckObservable.subscribe({
      next: (cc)=> this.deck.push(cc)
    })
  }
  public positionMod(index:number) {
    return {right: `${120 * index}px`}
  }
}
