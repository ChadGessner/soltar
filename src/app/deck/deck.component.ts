import { Component, OnInit, Input, Output, Injectable, EventEmitter, Renderer2 } from '@angular/core';
import { Card } from 'src/Models/card.model';
import { GameService } from 'src/services/game.service';
import { NgStyle } from '@angular/common';
import { Subject } from 'rxjs';
import { emit } from 'process';
@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
@Injectable()
export class DeckComponent implements OnInit {
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
  deck:Card[] = [];
  clicked:boolean = false;
  @Input()woke:number = 0;
  @Output() wasClicked:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private game:GameService, private render:Renderer2) { 
    
  }
    
  ngOnInit(): void {
    this.game.currentCardData$.subscribe(cards => this.deck = cards[0]);
    
  }
  
  // passWasClicked(event:MouseEvent){
    
  //   return new this.wasClicked.emit();
  // }
  onDrawCard(event:MouseEvent, card:Card, index:number){
    //  console.log(event.target);
    //  console.log(card);
    //  this.render.setStyle(
    //   event.target,
    //   'top',
    //   `${card.x}px`
    //  )
    //  this.render.setStyle(
    //   event.target,
    //   'left',
    //   `${card.y}px`
    //  )
    //  this.render.setStyle(
    //   event.target,
    //   'z-index',
    //   `${card.z}px`
    //  )(mouseup)="onDrawCard($event,card,i)"
    
  }
  drawCard(card:Card) {
    this.game.drawCardFromDeck(card);
    this.game.onUpdate();
    //this.passWasClicked(event)
  }
  deckSubscription(deck:Card[]) {
    this.deck;
  }
  subscribeDeck() {
    this.deck;
  }
  fetchImage(card:Card,index:number) {
    return this.game.fetchImage(card);
  }
  positionMod(card:Card){
    return {left : `${card.x}px`, top : `${card.y}px`} 
     
  }
}
