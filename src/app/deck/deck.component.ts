import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/Models/card.model';
import { GameService } from 'src/services/game.service';
import { NgStyle } from '@angular/common';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {
  deck:Card[] = [];
  deckSubject:Subject<Card> = new Subject<Card>();
  constructor(private game:GameService) { 
    
  }
    
  ngOnInit(): void {
    
    
  }
  drawCard() {
    this.game.drawCardFromDeck();
    this.subscribeDeck();
  }
  deckSubscription(deck:Card[]) {
    // this.deckSubject.subscribe({
    //   next: (c)=> this.deck.push(c)
    // })
    // this.game.deckObservable.subscribe(this.deckSubject)
    // console.log(this.deck.length + 'supergayu');
  }
  subscribeDeck() {
    this.game.deckNotIsHidden
    this.deckSubject = new Subject<Card>();
    const update:Card[] = []
    this.deckSubject.subscribe({
      next: (c)=> this.deck.push(c)
    })
    this.deck = update;
    console.log(this.game.deck)
    this.game.deckObservable.subscribe(this.deckSubject)
  }
  fetchImage(card:Card,index:number) {
    return this.game.fetchImage(card);
  }
  positionMod(index:number){
    
    
    return index !== 51 ? 
    {left : `${index * .13}px`, top : `${index * .12}px`} :
     {left : `${index * .13}px`, top : '15px'};
  }
}
