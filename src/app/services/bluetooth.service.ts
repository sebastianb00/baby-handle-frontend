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
        this.myEvent.emit('Conectado');
        this.bluetoothSerial.subscribe('\n').subscribe((data: string) => {
          // console.log('new Data', data.split('\r')[0]);
          this.myEvent.emit(`${data.split('\r')[0]}`);
        })
        // this.bluetoothSerial.subscribeRawData()
        //   .subscribe(data => {
        //     this.bluetoothSerial.read()
        //       .then(valu => {
        //         console.log('decode1', valu);
        //       })
        //   })
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
