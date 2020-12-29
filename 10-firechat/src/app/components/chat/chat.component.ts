import { Component } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent {
  mensaje: string = "";

  constructor(private chatService: ChatService) {
    this.chatService.cargarMensajes()
      .subscribe((msjs: any[]) => {
        
      });
  }

  enviarMensaje() {
    console.log(this.mensaje);
  }

}
