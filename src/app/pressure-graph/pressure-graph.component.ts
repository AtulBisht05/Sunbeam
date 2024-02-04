import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../service/forecast.service';
import * as moment from 'moment';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-pressure-graph',
  templateUrl: './pressure-graph.component.html',
  styleUrls: ['./pressure-graph.component.scss']
})
export class PressureGraphComponent implements OnInit {

  pressureChart: string;
  pressureValues: any;
  pressureOptions: any;
  loading: boolean;
  timeValue = [];
  pressureValue = [];

  constructor(
    private fs: ForecastService,
    private progress: NgProgress) { }

  ngOnInit() {
    if (sessionStorage.getItem('city') != null) {
      this.progress.start();
      this.cityForecast();
      this.loading = true;
    } else {
      this.progress.start();
      this.localForecast();
      this.loading = true;
    }
  }

  localForecast() {
    this.fs.localForecast(this.fs.lat, this.fs.lon)
      .subscribe(
        (data) => {
          this.progress.done();
          this.loading = false;
          // clean previous data
          this.timeValue.splice(0, this.timeValue.length);
          this.pressureValue.splice(0, this.pressureValue.length);
          // Get Graph Values
          for (let i = 0; i < data.list.length; i++) {
            if (i < 24) {
              const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');
              const pressure = (data.list[i].main.pressure);
              this.timeValue.push(time);
              this.pressureValue.push(pressure);
            }
          }
          // Pressure Graph
          this.getPChart(this.timeValue, this.pressureValue);
        }
      );
  }

  cityForecast() {
    this.fs.cityForecast(this.fs.city)
      .subscribe(
        (data) => {
          this.progress.done();
          this.loading = false;
          // clean previous data
          this.timeValue.splice(0, this.timeValue.length);
          this.pressureValue.splice(0, this.pressureValue.length);
          // Get Graph Values
          for (let i = 0; i < data.list.length; i++) {
            if (i < 24) {
              const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');
              const pressure = (data.list[i].main.pressure);

              this.timeValue.push(time);
              this.pressureValue.push(pressure);
            }
          }
          // pressure graph
          this.getPChart(this.timeValue, this.pressureValue);
        }
      );
  }

  // Pressure Graph
  getPChart(time, value) {
    this.pressureChart = 'horizontalBar';
    this.pressureValues = {
      labels: time,
      datasets: [
        {
          label: 'Pressure',
          data: value,
          backgroundColor: 'rgb(153,153,255)',
          fill: false,
        }
      ]
    };
    this.pressureOptions = {
      title: {
        display: true,
        text: 'PRESSURE GRAPH ( hpa )'
      },
      legend: {
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
  }

}
