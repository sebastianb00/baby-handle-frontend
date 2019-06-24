import { Injectable, EventEmitter } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  myEvent = new EventEmitter();
  constructor(private bluetoothSerial: BluetoothSerial, public loadingController: LoadingController) { }

  connect() {
    console.log('try connect');
    const decoder = new TextDecoder('utf-8');
    this.myEvent.emit('Intentando conectar');
    // this.presentLoading();
    this.bluetoothSerial.connect('00:15:83:35:62:51')
      .subscribe(value => {
        this.loadingController.dismiss();
        this.myEvent.emit('Conectado');
        this.bluetoothSerial.subscribeRawData()
          .subscribe(data => {
            this.bluetoothSerial.available().then(value1 => {
              this.bluetoothSerial.read().then(value2 => {
              });
            });
            this.myEvent.emit(`${this.ab2str(data)}`);
          });
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

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
}
