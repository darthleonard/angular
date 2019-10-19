import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertArgs } from './alert.service.args';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    constructor(private alertCtrl: AlertController) {
    }

    async alertInput(args: AlertArgs) {
        const alert = await this.alertCtrl.create({
            header: args.header,
            inputs: [
              {
                name: args.inputName,
                type: 'text',
                value: args.value,
                placeholder: 'Nombre de la lista',
              }
            ],
            buttons: [{
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: args.btnOkText,
              handler: args.handler
            }]
          });
        alert.present();
    }
}
