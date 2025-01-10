import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://127.0.0.1:8000/ws/chat/');
  }

  public connect(url: string): void {
    this.socket$ = new WebSocketSubject(url);

    this.socket$.subscribe(
      (message) => this.onMessage(message),
      (err) => console.error(err),
      () => console.warn('Completed!')
    );
  }

  public sendMessage(message: any): void {
    this.socket$.next(message);
  }

  private onMessage(message: any): void {
    console.log('Received message:', message);
    // Handle the received message and update the UI accordingly
  }
}