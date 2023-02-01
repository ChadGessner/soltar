import { Component, OnInit, Input, HostListener, Renderer2, ElementRef, ViewChild } from '@angular/core';
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
  //@ViewChild('stackOfThreeImage',{static:true}) stuff:HTMLImageElement = new HTMLImageElement;
  deck:Card[] = [];
  
  deckSubject:Subject<Card> = new Subject<Card>();
  
  constructor(private game:GameService, private render:Renderer2, private el:ElementRef) { 
    
    
    //this.stackOfThreePositionMod(1,this.stuff)
  }
    
  ngOnInit(): void {
    // this.subscribeDeck();
    // this.subscribePileOfThree();
  }
  // drawCard() {
    
    
    
    
  //   this.game.nextCard();
  //   this.subscribeDeck();
  //   console.log('draw card!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  // }
  deckSubscription(deck:Card[]) {
  }
  
  subscribeDeck() {
    //this.game.deckNotIsHidden
    this.deckSubject = new Subject<Card>();
    const update:Card[] = []
    this.deckSubject.subscribe({
      next: (c)=> this.deck.push(c)
    })
    this.deck = update;
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
