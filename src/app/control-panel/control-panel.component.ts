import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/services/game.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  constructor(private game:GameService) { 
    
  }
  onClick() {
    //this.game.dealCards();
  }
  ngOnInit(): void {
  }

}
