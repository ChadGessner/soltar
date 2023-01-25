import { Component, OnInit ,Input} from '@angular/core';
import { Card } from 'src/Models/card.model';
import { GameService } from 'src/services/game.service';

@Component({
  selector: 'app-card-stack',
  templateUrl: './card-stack.component.html',
  styleUrls: ['./card-stack.component.css']
})
export class CardStackComponent implements OnInit {
  @Input()stack:Card[] = []
  constructor(private game:GameService) { }

  ngOnInit(): void {
  }
  getCardImage(card:Card){
    return this.game.fetchImage(card);
  }
  positionMod(index:number){
    return { top : `${index * 20}px`}
  }
  hideCards(){
    this.game.deckNotIsHidden(this.stack);
    return this.stack;
  }
}
