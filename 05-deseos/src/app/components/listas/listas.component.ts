import { Component, Input } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {
  @Input() terminados = true;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) { }

  async agregarLista() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista',
        }
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Crear',
        handler: (data) => {
          if (data.titulo.length === 0) {
            return;
          }
          const listaId = this.deseosService.crearLista(data.titulo);
          this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
        }
      }]
    });
    alert.present();
  }

  listaSelecctionada(lista: Lista) {
    if (this.terminados) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }

  borrarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
  }

}
