import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
import { GameService } from 'src/services/game.service';

@Directive({
  selector: '[appDropCard]'
})
export class DropCardDirective implements OnInit {
  
  constructor(
    private render:Renderer2,
     private el:ElementRef,
      private service:GameService
      ) { }
    ngOnInit(): void {
      
    }
}
