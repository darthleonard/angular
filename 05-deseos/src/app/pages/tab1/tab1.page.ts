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
    const func = (data) => {
      if (data.titulo.length === 0) {
        return;
      }
      const listaId = this.deseosService.crearLista(data.titulo);
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
    };

    const args = new AlertArgs();
    args.header = 'Crear Lista';
    args.inputName = 'titulo';
    args.handler = func;
    args.btnOkText = 'Crear';
    this.alertService.alertInput(args);
  }
}
