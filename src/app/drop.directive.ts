import { Directive, Renderer2, HostListener, OnInit, ElementRef } from '@angular/core';
import { GameService } from 'src/services/game.service';
import { Subject } from 'rxjs';
import { Card } from 'src/Models/card.model';
@Directive({
  selector: '[appDrop]'
})
export class DropDirective implements OnInit {
  cardColumns:Card[][] = [];
  hitBoxes:Card[][] = [];
  constructor(private game:GameService, private el:ElementRef, private render:Renderer2) { 

  }
  ngOnInit(): void {
    this.game.currentCardData$.subscribe(cards => this.cardColumns = cards);
    this.game.currentCardData$.subscribe(cards => this.hitBoxes = cards.slice(2,cards.length-1))
  }
  @HostListener('document:mousedown', ['$event'])OnMouseDown(e:MouseEvent){
    //console.log(e.target)
  }
  @HostListener('document:mouseup', ['$event'])OnMouseUp(e:MouseEvent){
    // const element = e.target as HTMLElement;
    // console.log(element.classList.contains('empty-box'));
  }
  @HostListener('document:click', ['$event'])onClick(e:MouseEvent){
    // const element = e.target as HTMLElement;
    // console.log(element.classList.contains('empty-box'));
  }
  @HostListener('document:mouseover', ['$event'])OnMouseHover(e:MouseEvent){
    const element = e.target as HTMLElement;
    console.log(element.classList.contains('empty-box'));
  }
}
