import { Component } from '@angular/core';
import { GoogleMapComponent } from '../google-map/google-map.component';

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private payPal: PayPal) {}


  llamar() {
    this.payPal.init({
      PayPalEnvironmentProduction: 'TU_ID_DE_CLIENTE_EN_PRODUCCIÓN',
      PayPalEnvironmentSandbox: 'Adx-VcPcx3n-_g5CtBrAa78tHzUAEOoX9C5Tu2xsOVZns8hsuaqAr01SBshIr70HGbIvCAP4KJOtdImR' //Sandbox
    }).then(() => {
      // Entornos: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Solo lo necesitas si necesitas controlar los errores posteriores al login de paypal "Internal Service Error".
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let cobro = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(cobro).then(() => {
          // Se ha realizado el cobro correctamente
          // En caso de estar en desarrollo, este el código de la Sandbox
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-XXXXXXXXXXXXXXXXXXXXXXXX",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Ha petado el cuadro de diálogo
        });
      }, () => {
        // Ha petado la configuración
      });
    }, () => {
      // Ha petado la inicialización o el dispositivo no permite usar PayPal
    });
  }

}
