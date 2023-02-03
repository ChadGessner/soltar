import { Component, OnInit ,Input, Renderer2} from '@angular/core';
import { Card } from 'src/Models/card.model';
import { GameService } from 'src/services/game.service';

@Component({
  selector: 'app-card-stack',
  templateUrl: './card-stack.component.html',
  styleUrls: ['./card-stack.component.css']
})
export class CardStackComponent implements OnInit {
  cardColumns:Card[][] = [];
  stack:Card[] = [];
  @Input() index:number = -1;
  constructor(private game:GameService, private render:Renderer2) { }

  ngOnInit(): void {
    this.game.currentCardData$
    .subscribe(cards => this.cardColumns = cards);
    this.stack = this.cardColumns[this.index]
  }
  onDrawCard(event:MouseEvent, card:Card, index:number){
    // console.log(event.target);
    // console.log(card);
    this.game.onUpdate();
    // this.render.setStyle(
    //  event.target,
    //  'top',
    //  `${card.y}px`
    // )
    // this.render.setStyle(
    //  event.target,
    //  'left',
    //  `${card.x}px`
    // )
    // this.render.setStyle(
    //  event.target,
    //  'z-index',
    //  `${card.z}px`
    // )

 }
  getCardImage(card:Card){
    return this.game.fetchImage(card);
  }
  positionMod(card:Card){
    return { top : `${card.y}px`}
  }
  hideCards(){
    return this.stack;
  }
}
