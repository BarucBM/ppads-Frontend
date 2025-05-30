import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { Cart } from '../../../../core/models/cart.model';
import { ButtonModule } from 'primeng/button';
import { EventsComponent } from '../../../events/pages/events/events.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CardModule, SharedModule, CommonModule, ButtonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  cart!:Cart;
  flag:boolean = false;
  load:boolean = false;
  calendarId:string = '';
  games:any;

  constructor(private eventsComp:EventsComponent){}

  ngOnInit(): void {
    
  }

  reloadPage(){
    this.ngOnInit();
  }

  buyAll(){
  }

  get hasWishlistedGames(): boolean {
  return this.games && this.games.some((game: { wishlisted: any; }) => game.wishlisted);
  } 

}
