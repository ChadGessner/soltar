import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Card } from 'src/Models/card.model';
import {map} from 'rxjs/operators';
import { Subject, from } from 'rxjs';
import { card } from 'src/Models/card.interface';
import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class ApiService implements OnInit{
    Deck:Card[] = [];
    //deckSubject:Subject<Card[]> = new Subject<Card[]>;
    constructor(private http:HttpClient){
        //this.fetchPosts()
    }
    public ngOnInit(): void {
        
    }
    
    public fetchPosts() {
        return this.http
        .get<{}>('https://localhost:7043/CardsHost/')
        .pipe(map(
          (responseData:{[key:string]:card})=> {
            const deck:Card[] = [];
            for(const key in responseData){
                //console.log(key);
                
              deck.push(responseData[key]);
            }
          return deck;
        }))
    }
    public fetchImage(imageUrl:string):string{
    console.log(imageUrl);
    return 'https://localhost:7043' + imageUrl;
    
    }
    public giveDeck():Card[]{
        //console.log(this.Deck);
        return this.Deck;
    }
    
}