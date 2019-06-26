import { Injectable, EventEmitter } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { LoadingController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  myEvent = new EventEmitter();
  temperatura = 0;
  constructor(
    private bluetoothSerial: BluetoothSerial,
    private localNotifications: LocalNotifications,
    public loadingController: LoadingController) { }

  connect() {
    console.log('try connect');
    const decoder = new TextDecoder('utf-8');
    this.myEvent.emit('Intentando conectar');
    this.bluetoothSerial.connect('00:15:83:35:62:51')
      .subscribe(value => {
        this.myEvent.emit('Conectado');
        this.bluetoothSerial.subscribe('\n').subscribe((data: string) => {
          this.temperatura = parseFloat(data.split('\r')[0]);
          this.myEvent.emit(`${this.temperatura}`);
          if (this.temperatura > 32) {
            this.scheduleNotification(`La tempera tempera tu ${this.temperatura}`)
          }
        })
      });
  }

  scheduleNotification(message) {
    this.localNotifications.schedule({
      id: 1,
      title: 'Atención',
      text: message,
      data: { mydata: 'My hidden message this is' },
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true // Show the notification while app is open
    });
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
