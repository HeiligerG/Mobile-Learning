import { Component, inject } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  standalone: true,
})

export class MessagesComponent {
  messageService = inject(MessageService);
}
