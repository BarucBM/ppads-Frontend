import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewPostModalComponent } from './new-post-modal/new-post-modal.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, NewPostModalComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
 stories = [
    'https://i.pravatar.cc/100?img=1',
    'https://i.pravatar.cc/100?img=2',
    'https://i.pravatar.cc/100?img=3',
    'https://i.pravatar.cc/100?img=4',
  ];

posts = [
    {
      name: 'Larian Studios',
      avatar: 'https://i.pravatar.cc/100?img=5',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg',
      description: 'New game launched.',
      liked: false,
      comments: [] as string[],
    },
    {
      name: 'BattleState Games',
      avatar: 'https://i.pravatar.cc/100?img=6',
      image: 'https://www.escapefromtarkov.com/upload/medialibrary/99e/EFT_screen_0.13_1.jpg',
      description: 'New Escape From Tarkov update. Version 0.17 available!!!',
      liked: false,
      comments: [],
    },
    {
      name: 'Supergiant Games',
      avatar: 'https://i.pravatar.cc/100?img=7',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg',
      description: 'Hades 2 Early Access já disponível!',
      liked: false,
      comments: [],
    },
    {
      name: 'CD Projekt Red',
      avatar: 'https://i.pravatar.cc/100?img=8',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
      description: 'Cyberpunk 2077: Phantom Liberty lançado!',
      liked: false,
      comments: [],
    },
    {
      name: 'Valve',
      avatar: 'https://i.pravatar.cc/100?img=9',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg',
      description: 'Counter-Strike 2 já está disponível!',
      liked: false,
      comments: [],
    },
    {
      name: 'Santa Monica Studio',
      avatar: 'https://i.pravatar.cc/100?img=10',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg',
      description: 'God of War agora no PC!',
      liked: false,
      comments: [],
    },
    {
      name: 'FromSoftware',
      avatar: 'https://i.pravatar.cc/100?img=11',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
      description: 'Elden Ring: Prepare-se para a aventura!',
      liked: false,
      comments: [],
    },
    {
      name: 'Rockstar Games',
      avatar: 'https://i.pravatar.cc/100?img=12',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg',
      description: 'GTA V com novos eventos online!',
      liked: false,
      comments: [],
    },
    {
      name: 'Capcom',
      avatar: 'https://i.pravatar.cc/100?img=13',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg',
      description: 'Resident Evil 4 Remake já disponível!',
      liked: false,
      comments: [],
    },
    {
      name: 'Nintendo',
      avatar: 'https://i.pravatar.cc/100?img=14',
      image: 'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_400/ncom/en_US/games/switch/t/the-legend-of-zelda-tears-of-the-kingdom-switch/hero',
      description: 'The Legend of Zelda: Tears of the Kingdom lançado!',
      liked: false,
      comments: [],
    },
    {
      name: 'Bungie',
      avatar: 'https://i.pravatar.cc/100?img=15',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1085660/header.jpg',
      description: 'Destiny 2: Nova expansão disponível!',
      liked: false,
      comments: [],
    },
    {
      name: 'Mojang Studios',
      avatar: 'https://i.pravatar.cc/100?img=16',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/892970/header.jpg',
      description: 'Minecraft recebe atualização com novos biomas!',
      liked: false,
      comments: [],
    },
    {
      name: 'Ubisoft',
      avatar: 'https://i.pravatar.cc/100?img=17',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/header.jpg',
      description: 'Assassin\'s Creed Mirage anunciado!',
      liked: false,
      comments: [],
    },
    {
      name: 'Square Enix',
      avatar: 'https://i.pravatar.cc/100?img=18',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1462040/header.jpg',
      description: 'Final Fantasy XVI já está disponível!',
      liked: false,
      comments: [],
    },
    {
      name: 'Riot Games',
      avatar: 'https://i.pravatar.cc/100?img=19',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg',
      description: 'Valorant: Novo agente revelado!',
      liked: false,
      comments: [],
    },
    {
      name: '343 Industries',
      avatar: 'https://i.pravatar.cc/100?img=20',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1240440/header.jpg',
      description: 'Halo Infinite recebe atualização de mapas!',
      liked: false,
      comments: [],
    },
  ];

  newComments: string[] = Array(this.posts.length).fill('');

  addComment(postIndex: number) {
    const comment = this.newComments[postIndex]?.trim();
    if (comment) {
      this.posts[postIndex].comments.push(comment);
      this.newComments[postIndex] = '';
    }
  }

  toggleLike(post: any) {
    post.liked = !post.liked;
  }

  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  addNewPost(post: any) {
    this.posts.unshift(post);
    this.newComments.unshift('');
    this.closeModal();
  }

}
