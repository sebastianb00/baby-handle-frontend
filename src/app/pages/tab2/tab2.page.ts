import { Component } from '@angular/core';
import {Chart} from 'chart.js';
import 'chartjs-plugin-streaming';
import { BluetoothService } from '../../services/bluetooth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(
    private bluetoothService: BluetoothService,
    public toastController: ToastController
  ) {
    bluetoothService.myEvent.subscribe(value => {
      this.presentToast(value);
      this.datasets.forEach((dataset: any) => {
        dataset.data.push({
          x: Date.now(),
          y: value
        });
      });
      // this.presentToast(value);
    });
  }

  active;

  datasets: any[] = [{

    data: []

  }, {

    data: []

  }];

  options: any = {
    scales: {
      xAxes: [{
        type: 'realtime'
      }]
    }
  };

  async presentToast(s) {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }
  conect() {
    this.presentToast('Connect');
    this.bluetoothService.connect();
  }
}
