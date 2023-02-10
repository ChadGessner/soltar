import { 
  Directive, 
  HostListener, 
  Renderer2, 
  OnInit, 
  ElementRef, 
  NgZone} from '@angular/core';
import { card } from 'src/Models/card.interface';
import { Card } from 'src/Models/card.model';
import { GameService } from 'src/services/game.service';

@Directive({
  selector: '[appDragCard]'
})
export class DragCardDirective implements OnInit {
  cardColumns:Card[][] = [

  ]
  threeStack:Card[] = [];
  mouseX:number = -1;
  mouseY:number = -1;
  elementX:number = -1;
  elementY:number = -1;
  mouseIsDown:boolean = false;
  originX:number | null = -1;
  originY:number | null = -1;
  currentCard:Card = new Card("","", true, "", "");
  constructor(
    private render:Renderer2, 
    private game:GameService, 
    private el:ElementRef)  { 

      this.game.currentCardData$.subscribe(cards => this.cardColumns = cards);
  }
  isTarget(e:MouseEvent){
    return e.target === this.el.nativeElement;
  }
  isBackside() {
    return this.el.nativeElement.src === "https://localhost:7043/images/backside.png";
  }
  getCurrentTargetCard(e:MouseEvent){
    let x = e.target as HTMLElement;
    if(x && x.hasAttribute('name')){
      return this.game.cardColumns[0][this.game.cardColumns.length - 1];
    }
    return this.game.deck
    .filter(c=> c.imageUrl === '/' + this.el.nativeElement.src
    .split('/')
    .slice(-2)
    .join('/'))[0];
  }
  isInDeck(e:MouseEvent){
    const element = e.target as HTMLElement;
    if(element.hasAttribute('name')){
      const name = element.getAttribute('name');
      return Number(name) === this.cardColumns[0].length - 1;
    }
    return false;
  }
  @HostListener('document:mousedown', ['$event'])onMouseDown(e:MouseEvent){
    
    if(this.isTarget(e) && !this.isBackside()){
      e.preventDefault();
      this.currentCard = this.getCurrentTargetCard(e);
      const card = this.getCurrentTargetCard(e);
      this.originX = card.x;
      this.originY = card.y;
      this.mouseIsDown = true;
      //let target = e.target;
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.elementX = e.clientX;
      this.elementY = e.clientY;
    }
    this.currentCard = this.getCurrentTargetCard(e);
    if(this.isBackside() && this.isTarget(e) && (e.target as HTMLElement).hasAttribute('name') && this.isInDeck(e)){
      
      e.preventDefault();
      this.game.drawCardFromDeck(this.currentCard)
      this.currentCard.isHidden = false;
      this.render.setStyle(
        e.target,
        'top',
        `${this.currentCard.x as number }px`,
      )
      this.render.setStyle(
        e.target,
        'left',
        `${this.currentCard.y as number }px`,
      )
      
      //console.log(this.currentCard)
    }
  }
  @HostListener('document:mousemove', ['$event'])onMouseMove(e:MouseEvent){
    if(this.isTarget(e) && this.mouseIsDown && !this.isBackside()){
      e.preventDefault();
       
      this.mouseX = (this.elementX - e.clientX);
      this.mouseY = (this.elementY - e.clientY);
      this.elementX = e.clientX;
      this.elementY = e.clientY;
      //console.log(this.isTarget(e) + "    " + this.mouseIsDown);
      
      this.render.setStyle(
        this.el.nativeElement,
        'top',
        `${this.el.nativeElement.offsetTop - this.mouseY}px`
      )
      this.render.setStyle(
        this.el.nativeElement,
        'left',
        `${this.el.nativeElement.offsetLeft - this.mouseX}px`
      )
      this.render.setStyle(
        this.el.nativeElement,
        'z-index',
        `52`
      )
    }
  }

  @HostListener('document:mouseup', ['$event'])onMouseUp(e:MouseEvent){
    if(!this.isBackside()){
      this.mouseIsDown = false;
      this.mouseX = 0;
      this.mouseY = 0;
      this.elementX = 0;
      this.elementY = 0;
      //this.game.currentCardData$.subscribe(cards => this.threeStack = cards[1])
      //this.game.resetCard(this.getCurrentTargetCard(e));
      //console.log(this.getCurrentTargetCard(e));
      //this.currentCard.x = this.originX;
      //this.currentCard.y = this.originY;
      //this.game.updateCards();
      //this.game.onUpdate();
    }
    
  }
  ngOnInit(): void {
    
    
  }
}
