import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../core/models/event.model';
import { EventComponent } from "../../components/event/event.component";
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FilterComponent } from "../../components/filter/filter.component";
import { CardModule } from 'primeng/card';
import { EventService } from '../../services/event.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [ CommonModule, InputTextModule, CardModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  events!:Event[];
  params:Event ={
    id : '',
    title :'',   
    startTime: null,
    endTime:null,
    createdAt:null,
    freeEntry: false,
    ticketUnitPrice: 0,
    ticketTax: 0,
    address: {
      fullAddress: '',
      city: '',
      country: '',
      latitude: '',
      longitude: '',
      postalCode: '',
      state: '',
      streetName: '',
      streetNumber: ''
    },
    description:''
  };

  constructor(private eventService:EventService, private messageService:MessageService){}

  ngOnInit(): void {
    this.getAllEvents()
  }

  getAllEvents(){
    this.eventService.getAllEvents(this.params).subscribe({
      next:(res) =>{
        this.events = res
        console.log(this.events)
      },
      error:(e) => console.log(e)
    })
  }

  filterSubmit(event:any){
    this.params.title = event.title
    // this.params.location = event.location
    this.params.description = event.description
    this.params.startTime = event.dates == null ?
      null :
      event.dates[0];
    this.params.endTime = event.dates == null ?
      null :
      event.dates[1];

    console.log(event.dates)
    this.getAllEvents()
  }

games = [
  {
    title: 'The Legend of Zelda: Tears of the Kingdom',
    studio: 'Nintendo',
    image: 'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_400/ncom/en_US/games/switch/t/the-legend-of-zelda-tears-of-the-kingdom-switch/hero',
    rating: 5,
    wishlisted: false
  },
  {
    title: 'Elden Ring',
    studio: 'FromSoftware',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
    rating: 5,
    wishlisted: false
  },
  {
    title: 'Cyberpunk 2077',
    studio: 'CD Projekt Red',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
    rating: 4,
    wishlisted: false
  },
  {
    title: 'God of War',
    studio: 'Santa Monica Studio',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg',
    rating: 5,
    wishlisted: false
  },
  {
    title: 'Hades II',
    studio: 'Supergiant Games',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg',
    rating: 4,
    wishlisted: false
  },
  {
    title: 'Counter-Strike 2',
    studio: 'Valve',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg',
    rating: 4,
    wishlisted: false
  },
  {
    title: 'GTA V',
    studio: 'Rockstar Games',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg',
    rating: 5,
    wishlisted: false
  },
  {
    title: 'Resident Evil 4 Remake',
    studio: 'Capcom',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg',
    rating: 4,
    wishlisted: false
  },
  {
    title: 'Valorant',
    studio: 'Riot Games',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg',
    rating: 3,
    wishlisted: false
  },
  {
    title: 'Assassin\'s Creed Mirage',
    studio: 'Ubisoft',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/header.jpg',
    rating: 4,
    wishlisted: false
  }
];

addToWishlist(game: any) {
  if (!game.wishlisted) {
    game.wishlisted = true;
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: `${game.title} adicionado à sua lista de desejos!`
    });
  }
}

get wishlistedGames() {
  return this.games.filter(game => game.wishlisted);
}

}
