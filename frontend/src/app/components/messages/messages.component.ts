import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


interface Message {
  sender: string;
  content: string;
  timestamp: Date; 
}

@Component({
  standalone: true,
  selector: 'app-messages',
  imports: [FormsModule, CommonModule, TranslateModule, MatButtonModule, MatInputModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';

  ngOnInit() {
    // Simuliranje preuzimanja порука са сервера
    this.messages = [
      { sender: 'Корисник 1', content: 'Здраво!', timestamp: new Date() },
      { sender: 'Ви', content: 'Ћао!', timestamp: new Date() }
    ];
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const newMessageObj: Message = {
        sender: 'Ви', 
        content: this.newMessage,
        timestamp: new Date()
      };
      this.messages.push(newMessageObj);
      this.newMessage = ''; 
    }
  }
}