import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/services/game.service';
import { Subject } from 'rxjs';
import { Card } from 'src/Models/card.model';
import { card } from 'src/Models/card.interface';
@Component({
  selector: 'app-suit-stacks',
  templateUrl: './suit-stacks.component.html',
  styleUrls: ['./suit-stacks.component.css']
})
export class SuitStacksComponent implements OnInit {
  cardColumns:Card[][] = [];
  suitStacks:Card[][] = [];
  constructor(private game:GameService) { 
  }

  ngOnInit(): void {
    this.game.currentCardData$.subscribe(cards => this.cardColumns = cards)
    this.game.currentCardData$.subscribe(cards => this.suitStacks = cards.slice(-4))
  }

  getCardImage(card:Card){
    return this.game.fetchImage(card);
  }
  positionMod(i:number){
    //console.log(i)
    return {
      top:
      '50px',
      right:
      `${620 + (i * 170) }px`,
      
    }
  }
  otherPositionMod(index:number){
    return {
      
    }
  }

}
