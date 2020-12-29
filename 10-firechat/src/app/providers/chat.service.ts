import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore) { }
  
  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc')
      .limit(5));
    return this.itemsCollection.valueChanges()
    .pipe(
      map((mensajes: Mensaje[]) => {
        //this.chats = mensajes;
        this.chats = [];
        for(let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
      }));
  }

  agregarMensaje(texto: string) {
    // TODO falta el UID del usuario
    let mensaje: Mensaje = {
      nombre: 'Leo',
      mensaje: texto,
      fecha: new Date().getTime()
    };

    return this.itemsCollection.add(mensaje);
  }
}
