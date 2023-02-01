
import { Directive, Renderer2, HostListener, ElementRef } from '@angular/core';
import { GameService } from 'src/services/game.service';

@Directive({
  selector: '[appDragCard]'
})
export class DragCardDirective {

  constructor(
    private game:GameService,
     private render:Renderer2,
     ) { }
    setDeckStyle(){
      let deck = this.game.giveDeck();
      deck.forEach(c => {
        
      })
    }
    getImageUrl(){
      
    }

    @HostListener('document:mousedown', ['$event'])onMouseDown() {

    }

}
