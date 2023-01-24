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
  deck:Card[] = []
  cardColumns:card[][]  = [];
  columnsSubject:Subject<Card[]> = new Subject<Card[]>();
  isFetching = false;
  deckSubject:Subject<Card> = new Subject<Card>();
  
  constructor(private api:ApiService, private game:GameService){
    
  }
  giveDeck(){
    return this.deck;
  }
  
  public ngOnInit(): void {
    this.game.deckObservable.subscribe(this.deckSubject)
  }
  onCardClick(index:number){
    this.game.cardNotIsHidden(index)
  }
  onClick(){
    this.getCardColumns();
    const someDeck:Card[] = []
    this.deckSubject = new Subject<Card>();
    this.deckSubject.subscribe({
      next: (v) => this.deck.push(v),
    })
    this.deck = []
    this.game.deckObservable.subscribe(this.deckSubject)
    console.log(this.deck)
  }
  public fetchImage(card:Card):string{
    return this.game.fetchImage(card);
  }
  public getCardColumns(){
    this.game.dealCards();
    this.game.columnsObservable.subscribe({
      next: (cc)=> this.cardColumns.push(cc)
    })
  }
  public positionMod(index:number) {
    return {right: `${140 * index}px`}
  }
}
