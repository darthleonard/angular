import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AlertArgs } from 'src/app/services/alert.service.args';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private deseosService: DeseosService,
              private alertService: AlertService,
              private router: Router) { }

  async agregarLista() {
    const args = new AlertArgs();
    args.headerTitle = 'Crear Lista';
    args.inputName = 'titulo';
    args.inputPlaceholder = 'Nombre de la lista';
    args.btnOkText = 'Crear';
    args.btnOkHandler = (data) => {
      if (data.titulo.length === 0) {
        return;
      }
      const listaId = this.deseosService.crearLista(data.titulo);
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
    };
    this.alertService.alertInput(args);
  }
}
