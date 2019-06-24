import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { BluetoothService } from 'src/app/services/bluetooth.service';
import { ToastController } from '@ionic/angular';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.scss'],
})
export class OutputGraphComponent implements OnInit {

  public options: any = {
    chart: {
      type: 'spline',
      animation: Highcharts.SVGElement, // don't animate in old IE
      marginRight: 10,
      events: {
        load: function () {
          // set up the updating of the chart each second
          var series = this.series[0];
          setInterval(function () {
            var x = (new Date()).getTime(), // current time
              y = Math.random();
            series.addPoint([x, y], true, true);
          }, 1000);
        }
      }
    },

    time: {
      useUTC: false
    },

    title: {
      text: 'Temperatura del Bebe'
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150
    },
    yAxis: {
      title: {
        text: 'Temperatura'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br/>',
      pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: 'Temperatura',
      data: (function () {
        // generate an array of random data
        var data = [],
          time = (new Date()).getTime(),
          i;

        for (i = -19; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            y: 0
          });
        }
        return data;
      }())
    }]
  }
  constructor(private bluetooth: BluetoothService, public toastController: ToastController) {
    bluetooth.myEvent.subscribe(values => {
      this.presentToast(values);
    })
  }

  ngOnInit() {
    Highcharts.chart('container', this.options);
  }

  active() {
    this.bluetooth.connect();
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
