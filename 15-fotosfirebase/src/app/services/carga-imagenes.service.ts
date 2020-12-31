import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
//import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {
  private CARPETA_IMAGENES = 'img';

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) { }

  cargarImagenesFirebase(imagenes: FileItem[]) {
    for(const item of imagenes) {
      item.estaSubiendo = true;
      if(item.progreso >= 100) {
        continue;
      }

      const filePath = `${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, item.archivo);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            item.url = url;
            item.estaSubiendo = false;
            this.guardarImagen({
              nombre: item.nombreArchivo,
              url: item.url
            });
          });
        })
      ).subscribe(progreso => item.progreso = progreso.bytesTransferred / progreso.totalBytes * 100 );
    }
  }

  private guardarImagen(imagen: { nombre: string, url: string }) {
    this.db.collection(`${ this.CARPETA_IMAGENES }`)
      .add(imagen);
  }
}
