import { Injectable } from '@angular/core';
import { Card } from './cardType';

export interface card {
    
    suit:string | null ;
    value:string | null ;
    isHidden:boolean | null ;
    reverseImage:string | null ;
    imageUrl:string | null ;
    x:number | null ;
    y:number | null ;
    z:number | null ;
    column:number | null ;
} 