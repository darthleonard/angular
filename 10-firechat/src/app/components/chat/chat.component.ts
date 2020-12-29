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
    this.chatService.cargarMensajes().subscribe();
  }

  enviarMensaje() {
    console.log(this.mensaje);
    if(this.mensaje.length === 0) {
      return;
    }
    this.chatService.agregarMensaje(this.mensaje)
      .then(() => this.mensaje = "")
      .catch(err => console.error("error al enviar", err));
  }

}
