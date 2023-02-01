import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { card } from 'src/Models/card.interface';
import { Card } from 'src/Models/card.model';
import { GameService } from 'src/services/game.service';

@Component({
  selector: 'app-three-stack',
  templateUrl: './three-stack.component.html',
  styleUrls: ['./three-stack.component.css']
})
export class ThreeStackComponent implements OnInit{
  pileOfThree:Card[] = [];
  pileOfThreeSubject:Subject<Card> = new Subject<Card>();
  @Input()cardDrawn?:Card;
  id:string = '';
  constructor(private game:GameService) { 
    
    console.log(this.cardDrawn + 'hi');
    
    this.subscribePileOfThree();
  }

  ngOnInit(): void {
    
  }
  fetchImage() {
    if(!this.cardDrawn){
      return;
    }
    this.id = this.cardDrawn.imageUrl;
    return this.game.fetchImage(this.cardDrawn);
  }
  stackOfThreePositionMod(index:number){
    return {top:`${index * 10}`, left:`${index * 20}`}
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
}
