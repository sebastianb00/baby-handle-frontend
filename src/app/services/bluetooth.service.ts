import {EventEmitter, Injectable } from '@angular/core';
import {BluetoothSerial} from '@ionic-native/bluetooth-serial/ngx';
import {Observable} from 'rxjs';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {
  myEvent = new EventEmitter();

  constructor(public bluetoothSerial: BluetoothSerial, public loadingController: LoadingController) {
  }

  connect() {
      const decoder = new TextDecoder('utf-8');
      this.bluetoothSerial.connect('98:D3:51:F5:AF:70')
          .subscribe(value => {
              // this.loadingController.dismiss();
              // this.myEvent.emit('¡Conectado!');
              // this.bluetoothSerial.subscribeRawData()
              //     .subscribe(data => {
              //         this.bluetoothSerial.available().then(value1 => {
              //             this.bluetoothSerial.read().then(value2 => {
              //             });
              //         });
              //      this.myEvent.emit(`${this.ab2str(data)}`);
              //     });
              console.log(value);
          });
  }
   ab2str(buf) {
      return String.fromCharCode.apply(null, new Uint16Array(buf));
    }

  async presentLoading() {
      const loading = await this.loadingController.create({
          message: 'Conectando...',
      });
      await loading.present();

      const {role, data} = await loading.onDidDismiss();

      console.log('Loading dismissed!');
  }
}