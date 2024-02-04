import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../service/forecast.service';
import * as moment from 'moment';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-wind-graph',
  templateUrl: './wind-graph.component.html',
  styleUrls: ['./wind-graph.component.scss']
})
export class WindGraphComponent implements OnInit {

  windChart: string;
  windValues: any;
  windOptions: any;
  loading: boolean;
  timeValue = [];
  windValue = [];

  constructor(private fs: ForecastService,
    private progress: NgProgress) { }

  ngOnInit() {
    if (sessionStorage.getItem('city') != null) {
      this.progress.start();
      this.cityForecast();
      this.loading = true;
    } else if ((sessionStorage.getItem('longitude') && sessionStorage.getItem('latitude') != null)) {
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
          this.windValue.splice(0, this.timeValue.length);
          // Get Graph Values
          for (let i = 0; i < data.list.length; i++) {
            const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');
            const wind = data.list[i].wind.speed;
            this.timeValue.push(time);
            this.windValue.push(wind);
          }
          // Wind Graph
          this.getWChart(this.timeValue, this.windValue);
        }
      );
  }

  cityForecast() {
    this.fs.cityForecast(this.fs.city)
      .subscribe(
        (data) => {
          this.progress.done();
          this.loading = false;
          // clean previous
          this.timeValue.splice(0, this.timeValue.length);
          this.windValue.splice(0, this.timeValue.length);
          // Get Graph Values
          for (let i = 0; i < data.list.length; i++) {
            const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');
            const wind = data.list[i].wind.speed;

            this.timeValue.push(time);
            this.windValue.push(wind);
          }
          // Wind Graph
          this.getWChart(this.timeValue, this.windValue);
        }
      );
  }

  // Wind Graph
  getWChart(time, value) {
    this.windChart = 'line';
    this.windValues = {
      labels: time,
      datasets: [
        {
          label: 'Wind',
          data: value,
          backgroundColor: 'rgb(62,168,249)',
          fill: false,
        }
      ]
    };
    this.windOptions = {
      title: {
        display: true,
        text: 'WIND SPEED GRAPH ( m/s )'
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
