import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-friends-dm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './friends-dm.component.html',
  styleUrls: ['./friends-dm.component.scss']
})
export class FriendsChatComponent {
  friends = [
    { name: 'Lucas', avatar: 'https://i.pravatar.cc/100?img=1' },
    { name: 'Ana', avatar: 'https://i.pravatar.cc/100?img=2' },
    { name: 'Pedro', avatar: 'https://i.pravatar.cc/100?img=3' },
    { name: 'Marina', avatar: 'https://i.pravatar.cc/100?img=4' },
    { name: 'João', avatar: 'https://i.pravatar.cc/100?img=5' },
  ];

  selectedFriend: any = this.friends[0];
  messages: { from: string, text: string }[] = [
    { from: 'Lucas', text: 'Oi! Tudo bem?' },
    { from: 'Eu', text: 'Tudo sim! E você?' }
  ];
  newMessage = '';

  selectFriend(friend: any) {
    this.selectedFriend = friend;
    // Aqui você pode carregar mensagens diferentes por amigo se desejar
    this.messages = [
      { from: friend.name, text: 'Oi! Tudo bem?' },
      { from: 'Eu', text: 'Tudo sim! E você?' }
    ];
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ from: 'Eu', text: this.newMessage });
      this.newMessage = '';
    }
  }
}