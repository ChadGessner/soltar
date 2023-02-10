import { Component, Input, OnInit, HostListener, NgZone, Renderer2 } from '@angular/core';
import { card } from 'src/Models/card.interface';
import { Card } from 'src/Models/card.model';
import { GameService } from 'src/services/game.service';

@Component({
  selector: 'app-three-stack',
  templateUrl: './three-stack.component.html',
  styleUrls: ['./three-stack.component.css']
})
export class ThreeStackComponent implements OnInit {
  cardColumns:Card[][] = [

]
  threeStack:Card[] = [];
  deck:card[] = [];
  mouseWasDown:boolean;
  @Input() isDrawCard:boolean = false;
  constructor(private game:GameService, private ngZone:NgZone, private render:Renderer2) { 
    this.mouseWasDown  = false;
    
  }

  ngOnInit(): void {
    this.game.currentCardData$.subscribe(c=> this.cardColumns = c)
    this.game.currentCardData$.subscribe(c=> this.threeStack = c[1])
    this.game.currentCardData$.subscribe(c=> this.deck = c[0])
    //this.threeStack = this.cardColumns[1];
    console.log(NgZone.isInAngularZone());
    this.mouseWasDown = false;
  }
  // @HostListener('document:mouseup', ['$event'])onMouseUp(e:MouseEvent, index:number){
  //   this.threeStack = this.deck.filter(c => c.column === 1)
    
  // }
  onDrawCard(event:MouseEvent, card:Card, index:number){
    this.ngZone.run(()=> {
      this.game.onUpdate();
     })
    //  console.log(NgZone.isInAngularZone());
    //  console.log(event.target);
    //  console.log(card);
     
     this.render.setStyle(
      event.target,
      'top',
      `${card.x}px`
     )
     this.render.setStyle(
      event.target,
      'left',
      `${card.y}px`
     )
     this.render.setStyle(
      event.target,
      'z-index',
      `${card.z}px`
     )
     this.game.onUpdate();
     this.mouseWasDown = true;
  }
  fetchImage(card:Card,index:number) {
    return this.game.fetchImage(card);
  }
  positionMod(card:Card){
    return  {background: 'transparent'}
    //: { top : `${card.x }px`, left : `${card.y}px` , zIndex : `${card.z}`} this.mouseWasDown ?
  }
}
