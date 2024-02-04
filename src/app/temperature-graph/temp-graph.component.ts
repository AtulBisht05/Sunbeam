import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../service/forecast.service';
import * as moment from 'moment';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-temp-graph',
  templateUrl: './temp-graph.component.html',
  styleUrls: ['./temp-graph.component.scss']
})
export class TempGraphComponent implements OnInit {

  tempChart: string;
  tempValues: any;
  tempOptions: any;
  loading: boolean;
  tempValue = [];
  timeValue = [];

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
          this.tempValue.splice(0, this.tempValue.length);
          this.timeValue.splice(0, this.timeValue.length);
          // Get Graph Values
          for (let i = 0; i < data.list.length; i++) {
            const temp = data.list[i].main.temp;
            const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');
            this.tempValue.push(temp);
            this.timeValue.push(time);
          }
          // Temperature Graph
          this.getTChart(this.timeValue, this.tempValue);
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
          this.tempValue.splice(0, this.tempValue.length);
          this.timeValue.splice(0, this.timeValue.length);
          // Get Graph Values
          for (let i = 0; i < data.list.length; i++) {
            const temp = data.list[i].main.temp;
            const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');

            this.tempValue.push(temp);
            this.timeValue.push(time);
          }
          // Temperature Graph
          this.getTChart(this.timeValue, this.tempValue);
        }
      );
  }

  // Temp Graph
  getTChart(time, value) {
    this.tempChart = 'bar';
    this.tempValues = {
      labels: time,
      datasets: [
        {
          label: 'Temperature',
          data: value,
          backgroundColor: 'rgb(255,153,51)',
          fill: false,
        }
      ]
    };
    this.tempOptions = {
      title: {
        display: true,
        text: 'TEMPERATURE GRAPH ( C )'
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
