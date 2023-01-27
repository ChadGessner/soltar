import { Component, OnInit ,Input, HostListener, ViewChild, ElementRef} from '@angular/core';
import { Card } from 'src/Models/card.model';
import { GameService } from 'src/services/game.service';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';


@Component({
  selector: 'app-card-stack',
  templateUrl: './card-stack.component.html',
  styleUrls: ['./card-stack.component.css'],
  animations: [
    // trigger('cardState', [
    //   state('normal', style({
        
    //   })),
    //   state('mousedown', style({
    //     'transform' : `translate()`
    //   }))
    // ]),
    // transition('normal => mousedown', animate(500)),
  ]
})
export class CardStackComponent implements OnInit {
  @ViewChild('cardImage') cardImage:ElementRef<HTMLImageElement>;
  mouseX:number = -1;
  mouseY:number = -1;
  
  @HostListener('document:mousemove', ['$event'])

    onMouseMove(e:MouseEvent){
      //console.log(e);
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    }
  
  @Input()stack:Card[] = []
  state = 'normal';
  constructor(private game:GameService, cardImage:ElementRef<HTMLImageElement>) { 
    this.cardImage = cardImage;
  }

  ngOnInit(): void {
  }

  downState(){
    
  }
  upState() {
    this.state = 'normal';
  }
  getCardImage(card:Card){
    return this.game.fetchImage(card);
  }
  positionMod(index:number){
    return { top : `${index * 10}px`}
  }
  hideCards(){
    this.game.stackNotIsHidden();
    return this.stack;
  }
}
