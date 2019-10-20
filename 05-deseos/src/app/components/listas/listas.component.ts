import { Component, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { AlertArgs } from 'src/app/services/alert.service.args';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {
  @ViewChild(IonList, {static: false}) lista: IonList;
  @Input() terminados = true;

  constructor(public deseosService: DeseosService,
              private alertService: AlertService,
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
    const args = new AlertArgs();
    args.headerTitle = 'Editar nombre';
    args.inputName = 'titulo';
    args.inputValue = lista.titulo;
    args.inputPlaceholder = 'Nuevo nombre';
    args.btnOkHandler = (data) => {
      if (data.titulo.length === 0) {
        return;
      }
      lista.titulo = data.titulo;
      this.deseosService.guardarStorage();
      this.lista.closeSlidingItems();
    };
    args.btnCancelHandler = (data) => this.lista.closeSlidingItems();
    args.btnOkText = 'Guardar';
    this.alertService.alertInput(args);
  }
}
