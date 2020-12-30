import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  chats: Mensaje[] = [];
  usuario: any = { };

  constructor(private afs: AngularFirestore,
    public auth: AngularFireAuth) {
      this.auth.authState.subscribe(user => {
        console.log('Estado del usuario: ', user);
        if(!user) return;
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
      });
  }
  
  login(proveedor: string) {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  
  logout() {
    this.auth.signOut();
  }

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
