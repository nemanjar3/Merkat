import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user-service.service';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service';



@Component({
  standalone: true,
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  imports: [
    MatCardModule, 
    MatListModule, 
    FormsModule, 
    CommonModule, 
    MatFormFieldModule,
    ReactiveFormsModule, // Додајте ReactiveFormsModule
    MatInputModule // Додајте MatInputModule
  ]
})
export class MessagesComponent implements OnInit, OnDestroy {
  users = [
    { id: '1', name: 'John Doe', lastMessage: 'Hello there!' },
    { id: '2', name: 'Jane Smith', lastMessage: 'How are you?' },
  ];
  selectedUserId: string = '';
  messages: any[] = []; // Промењен тип на any[]
  newMessage: string = '';
  form: FormGroup; // Додата FormGroup променљива

  constructor(
    private socketService: SocketService,
    private formBuilder: FormBuilder, // Додат FormBuilder
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      message: ''
    });
  }

  selectUser(userId: string): void {
    this.selectedUserId = userId;
    // Преузимање порука за изабраног корисника (заменити са стварним API позивом)
    this.messages = [
      { 
        type: 'chat_message',
        message: 'Hi there!', 
        senderUsername: 'You', 
        messages: [],
        timestamp: new Date() 
      },
      { 
        type: 'chat_message',
        message: 'Hello!', 
        senderUsername: 'John Doe', 
        messages: [],
        timestamp: new Date() 
      },
    ];
  }

  ngOnInit(): void {
    // this.listenForMessages();
  }

  ngOnDestroy(): void {
  //  this.socketService.disconnect();
  }

  // listenForMessages(): void {
  //   this.socketService.listen('message').subscribe((data: any) => {
  //     this.messages.push(data); // Додата порука у низ
  //   });
  // }

  sendMessage(): void {
    if (this.form.value.message.trim() && this.selectedUserId) { // Користите form.value.message
      this.socketService.sendMessage(this.form.value.message); // Шаљите поруку из форме
      this.messages.push({ 
        type: 'chat_message',
        message: this.form.value.message, 
        senderUsername: 'You', 
        messages: [] 
      });
      this.form.reset(); // Ресетујте форму након слања
    }
  }

  getUserById(userId: string): any | undefined { 
    return this.users.find(user => user.id === userId);
  }
}