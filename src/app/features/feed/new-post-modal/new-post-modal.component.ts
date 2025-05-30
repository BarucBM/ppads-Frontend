import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-post-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-backdrop" (click)="close()"></div>
    <div class="modal">
      <h2>Criar Novo Post</h2>
      <form (ngSubmit)="submit()" #postForm="ngForm">
        <input
          type="text"
          placeholder="Nome"
          [(ngModel)]="post.name"
          name="name"
          required
        />
        <input
          type="text"
          placeholder="Avatar URL"
          [(ngModel)]="post.avatar"
          name="avatar"
          required
        />
        <input
          type="text"
          placeholder="Imagem do Jogo URL"
          [(ngModel)]="post.image"
          name="image"
          required
        />
        <textarea
          placeholder="Descrição"
          [(ngModel)]="post.description"
          name="description"
          required
        ></textarea>
        <div class="modal-actions">
          <button type="submit" [disabled]="!postForm.form.valid">Postar</button>
          <button type="button" (click)="close()">Cancelar</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./new-post-modal.component.scss']
})
export class NewPostModalComponent {
  @Output() postCreated = new EventEmitter<any>();
  @Output() closed = new EventEmitter<void>();

  post = {
    name: '',
    avatar: '',
    image: '',
    description: '',
    liked: false,
    comments: [] as string[],
  };

  submit() {
    this.postCreated.emit({ ...this.post });
    this.close();
  }

  close() {
    this.closed.emit();
  }
}