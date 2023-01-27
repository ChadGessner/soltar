import { 
  Directive, 
  ElementRef, 
  HostListener, 
  Renderer2, 
  OnInit,
  OnChanges, 
  SimpleChanges, 
  AfterContentChecked, 
  AfterContentInit,
AfterViewChecked } from '@angular/core';
import { Subject } from 'rxjs';
import { GameService } from 'src/services/game.service';
import { Card } from 'src/Models/card.model'





    // drawCard() {
  //   this.game.nextCard();
  //   this.deckSubscribe();
  //   this.stackOfThreeSubscribe();
  //   console.log(this.stackOfThree.length);
  // }
  // @HostListener('document:click', ['$event'])onClick(e:MouseEvent){
    
  //   if(this.isInDeck()){
  //     //this.drawCard();
  //     const index = this.stackOfThree.length;
  //     this.originalCoordinates.y = index * 20;
  //     this.originalCoordinates.x = index * 10;
  //     this.render.setStyle(
  //       this.el.nativeElement,
  //       'left',
  //       `${this.originalCoordinates.y }px`
  //     )
  //     this.render.setStyle(
  //       this.el.nativeElement,
  //       'top',
  //       `${this.originalCoordinates.x }px`
  //     )
  //   }
    
  // }


  // this.deckSubscribe();
    // this.stackOfThreeSubscribe();
    // this.stacksSubscribe();
@Directive({
  selector: '[appDragCard]'
})
export class DragCardDirective 
implements OnInit, 
OnChanges, 
AfterContentInit, 
AfterContentChecked,
AfterViewChecked {
  mouseX:number = -1;
  mouseY:number = -1;
  elementX:number = -1;
  elementY:number = -1;
  mouseIsDown:boolean = false;
  isTarget:boolean = false;
  stackOfThree:Card[] = [];
  deck:Card[] = [];
  stackOfThreeSubject:Subject<Card> = new Subject<Card>();
  deckSubject:Subject<Card> = new Subject<Card>();
  stacksSubject:Subject<Card[]> = new Subject<Card[]>();
  stacks:Card[][] = []
  originalCoordinates:{x:number,y:number};
  originalZIndex:number = 0;
  constructor(private el: ElementRef, private render:Renderer2, private game:GameService) { 
    
    this.originalCoordinates = {
      x: this.el.nativeElement.offsetLeft,
      y: this.el.nativeElement.offsetTop
    }

  }
  ngOnInit(): void {
    this.deckSubscribe();
    this.stackOfThreeSubscribe();
    this.stacksSubscribe();
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngAfterContentInit(): void {
    
  }
  ngAfterContentChecked(): void {
    
  }
  ngAfterViewChecked(): void {
    this.deckSubscribe();
    this.stacksSubscribe();
    this.stackOfThreeSubscribe();
  }
  stackOfThreeSubscribe(){
    const update:Card[] = [];
    this.stackOfThreeSubject = new Subject<Card>();
    this.stackOfThreeSubject.subscribe({
      next: (c)=> this.stackOfThree.push(c)
    })
    this.stackOfThree = update
    this.game.pileOfThreeObservable.subscribe(this.stackOfThreeSubject)
  }
    deckSubscribe() {
    const update:Card[] = [];
    this.deckSubject = new Subject<Card>();
    this.deckSubject.subscribe({
      next: (c)=> this.stackOfThree.push(c)
    })
    this.deck = update
    this.game.deckObservable.subscribe(this.deckSubject)
  }
    stacksSubscribe() {
    const update:Card[][] = [];
    this.stacksSubject = new Subject<Card[]>();
    this.stacksSubject.subscribe({
      next: (c)=> this.stacks.push(c)
    })
    this.stacks = update
    this.game.columnsObservable.subscribe(this.stacksSubject)
  }
  getUrlString(){
    console.log(this.el.nativeElement.currentSrc)
    return '/' + this.el.nativeElement.currentSrc
    .split('/')
    .slice(-2)
    .join('/');
  }
  isPileOfThree(e:MouseEvent){
    if(this.getThisIsTarget(e)){
      
      const currentUrl:string = this.getUrlString();
      return this.stackOfThree
      .filter(c=> c.imageUrl === currentUrl)
      .length === 1;
    }
    return;
  }
  isBackside(){
    return this.getUrlString() === '/images/backside.png'
  }
  isInDeck(){
    const currentUrl:string = this.getUrlString();
    return this.deck.filter(c=> c.imageUrl === currentUrl).length === 1;
  }
  stackOfThreePositionMod(){
      
      const index:number = this.stackOfThree.map(c=>c.imageUrl).indexOf(this.getUrlString());
      this.originalCoordinates.y = (index * 20) + 240;
      this.originalCoordinates.x = (index * 10) + 240;
      this.originalZIndex = this.el.nativeElement.zIndex;
  }
  deckPositionMod(){
    for(let i = 0; i < this.deck.length;i++){
      if(this.deck[i].imageUrl === this.getUrlString()){
        this.render.setStyle(
          this.el.nativeElement,
          'left',
          `${i * .13}px`
        )
        this.render.setStyle(
          this.el.nativeElement,
          'top',
          `${i * .12}px`
        )
      }
    }
  }
  // positionMod(index:number){
  //   return index !== 51 ? 
  //   {left : `${index * .13}px`, top : `${index * .12}px`} :
  //    {left : `${index * .13}px`, top : '15px'};
  // }
  getThisIsTarget(e:MouseEvent){
    this.isTarget = e.target === this.el.nativeElement;
    return this.isTarget;
  }
  @HostListener('document:mousedown', ['$event'])onMouseDown(e:MouseEvent){
    if(this.getThisIsTarget(e) && this.isPileOfThree(e)){
      this.stackOfThreePositionMod();
    }
    if(this.getThisIsTarget(e)){
      e.preventDefault();
      this.getThisIsTarget(e)
      //this.stackOfThreePositionMod();
      this.mouseIsDown = true;
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.elementX = e.clientX;
      this.elementY = e.clientY;
      this.render.setStyle(
        this.el.nativeElement,
        'z-index',
        `${this.game.nextZIndex()}`
      )
    }
    
  }
  @HostListener('document:mousemove', ['$event'])onMouseMove(e:MouseEvent){
    if(!this.mouseIsDown){
      return;
    }
    if(this.isTarget &&  !this.isInDeck() && !this.isBackside() ){
      e.preventDefault();
      this.mouseX = (this.elementX - e.clientX);
    this.mouseY = (this.elementY - e.clientY);
    this.elementX = e.clientX;
    this.elementY = e.clientY;
    if(this.mouseIsDown && this.isTarget){
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
    }
    }
  }
  @HostListener('document:mouseup', ['$event']) onMouseUp(e:MouseEvent){
    if(this.getThisIsTarget(e)){
      this.mouseIsDown = false;
      this.mouseX = 0;
      this.mouseY = 0;
      this.elementX = 0;
      this.elementY = 0;
      this.render.setStyle(
        this.el.nativeElement,
        'z-index',
        `${this.originalZIndex}`
      )
      
      this.render.setStyle(
        this.el.nativeElement,
        'left',
        `${this.originalCoordinates.y }px`
      )
      this.render.setStyle(
        this.el.nativeElement,
        'top',
        `${this.originalCoordinates.x }px`
      )
    }
    
  }
}
