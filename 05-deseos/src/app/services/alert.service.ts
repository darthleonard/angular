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
            header: args.headerTitle,
            inputs: [
              {
                name: args.inputName,
                type: 'text',
                value: args.inputValue,
                placeholder: args.inputPlaceholder,
              }
            ],
            buttons: [{
              text: 'Cancelar',
              role: 'cancel',
              handler: args.btnCancelHandler
            },
            {
              text: args.btnOkText,
              handler: args.btnOkHandler
            }]
          });
        alert.present();
    }
}
