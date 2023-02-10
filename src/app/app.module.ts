import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from 'src/services/api.service';
import { GameService } from 'src/services/game.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeckComponent } from './deck/deck.component';
import { CardStackComponent } from './card-stack/card-stack.component';
import { DragCardDirective } from './drag-card.directive';
import { ThreeStackComponent } from './three-stack/three-stack.component';
import { SuitStacksComponent } from './suit-stacks/suit-stacks.component';
import { DropDirective } from './drop.directive';


@NgModule({
  declarations: [
    AppComponent,
    DeckComponent,
    CardStackComponent,
    DragCardDirective,
    ThreeStackComponent,
    SuitStacksComponent,
    DropDirective,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [ApiService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
