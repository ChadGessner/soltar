import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  Injectable, 
  EventEmitter, 
  Renderer2,
OnChanges,
OnDestroy,
SimpleChanges,
AfterContentChecked
 } from '@angular/core';
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
export class DeckComponent implements OnInit, AfterContentChecked {
  cardColumns:Card[][] = [

  ]
  deck:Card[] = [];
  threeStack:Card[] = [];
  clicked:boolean = false;
  @Input()woke:number = 0;
  @Output() wasClicked:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private game:GameService, private render:Renderer2) { 
    
  }
    
  ngOnInit(): void {
    this.game.currentCardData$.subscribe(cards => this.cardColumns = cards)
    this.game.currentCardData$.subscribe(cards => this.deck = cards[0]);
    this.game.currentCardData$.subscribe(cards => this.threeStack = cards[1]);
  }
  ngAfterContentChecked(): void {
    //this.onDrawCard()
  }
  
  // passWasClicked(event:MouseEvent){
    
  //   return new this.wasClicked.emit();
  // }
  onDrawCard(){
    this.threeStack.forEach(card => {
      console.log(card.x)
      console.log(card.y)
    })
    
  }
  drawCard(card:Card, event:MouseEvent) {
    
    event.preventDefault();
    this.game.drawCardFromDeck(card);
    
    console.log(this.cardColumns[1].length);
    // this.render.setStyle(
    //   event.target,
    //   'top',
    //   `${card.x}px`,
    // )
    // this.render.setStyle(
    //   event.target,
    //   'left',
    //   `${card.y}px`
    // )
    //this.onDrawCard(event, card)
    // this.game.currentCardData$.subscribe(cards => this.cardColumns = cards)
    // this.game.currentCardData$.subscribe(cards => this.deck = cards[0]);
    // this.game.currentCardData$.subscribe(cards => this.threeStack = cards[1]);
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
    return card.isHidden ? {
      left : `${card.x}px`,
       top : `${card.y}px`
      } : {
        left : `900px`,
        top : `300px`
    }
     
  }
}
