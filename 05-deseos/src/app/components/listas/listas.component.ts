import { Component, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {
  @ViewChild(IonList, {static: false}) lista: IonList;
  @Input() terminados = true;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) { }

  listaSelecctionada(lista: Lista) {
    const tab = this.terminados ? 'tab2' : 'tab1';
    this.router.navigateByUrl(`/tabs/${tab}/agregar/${ lista.id }`);
  }

  borrarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista: Lista) {
    const alert = await this.alertCtrl.create({
      header: 'Editar nombre',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista',
        }
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: (data) => this.lista.closeSlidingItems()
      },
      {
        text: 'Guardar',
        handler: (data) => {
          if (data.titulo.length === 0) {
            return;
          }
          lista.titulo = data.titulo;
          this.deseosService.guardarStorage();
          this.lista.closeSlidingItems();
        }
      }]
    });
    alert.present();
  }
}
