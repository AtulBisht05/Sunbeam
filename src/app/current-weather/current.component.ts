import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { NgProgress } from 'ngx-progressbar';
import 'rxjs/add/operator/map';
import { WeatherService } from '../service/weather.service';
import { ForecastService } from '../service/forecast.service';
import { AlertService } from '../service/alert.service';
import { CurrentWeather } from '../models/current-weather';

interface Response {
  lat: string;
  lon: string;
}

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})

export class CurrentComponent implements OnInit {

  myWeather: CurrentWeather;
  windChart: string;
  windValues: any;
  windOption: any;
  THChart: string;
  THValues: any;
  THOption: any;
  pressureChart: string;
  pressureValues: any;
  pressureOption: any;
  tempValue = [];
  timeValue = [];
  windValue = [];
  pressureValue = [];
  humidityValue = [];
  loading: boolean;

  constructor(
    private ws: WeatherService,
    private fs: ForecastService,
    private progress: NgProgress,
    public alertService: AlertService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.progress.start();
    // clean sessionStorage
    sessionStorage.clear();
    this.loading = true;
    this.localWeather();
    this.localForecast();
  }

  onSubmit(weatherForm: NgForm) {
    this.progress.start();
    this.cityWeather(weatherForm.value.city);
    this.cityForecast(weatherForm.value.city);
  }

  localForecast() {
    // get location
    this.http.get<Response>('http://ip-api.com/json')
      .subscribe(
        (data) => {
          this.progress.done();
          const lat = data.lat;
          const lon = data.lon;
          this.fs.localForecast(lat, lon)
            .subscribe(
              (data1) => {
                this.loading = false;

                // clean previous data
                this.tempValue.splice(0, this.tempValue.length);
                this.timeValue.splice(0, this.timeValue.length);
                this.windValue.splice(0, this.timeValue.length);
                this.pressureValue.splice(0, this.pressureValue.length);
                this.humidityValue.splice(0, this.humidityValue.length);

                // Get Graph Values
                for (let i = 0; i < data1.list.length; i++) {
                  if (i < 8) {
                    const temp = data1.list[i].main.temp;
                    const time = moment(data1.list[i].dt_txt).format('Do MMMM, h:mm a');
                    const wind = data1.list[i].wind.speed;
                    const humidity = data1.list[i].main.humidity;
                    const pressure = (data1.list[i].main.pressure);

                    this.tempValue.push(temp);
                    this.timeValue.push(time);
                    this.windValue.push(wind);
                    this.pressureValue.push(pressure);
                    this.humidityValue.push(humidity);
                  }
                }
                // Wind Graph
                this.getWChartData(this.timeValue, this.windValue);
                // Temperature & humidity Graph
                this.getTHChart(this.timeValue, this.tempValue, this.humidityValue);
                // Pressure Graph
                this.getPChart(this.timeValue, this.pressureValue);
              },
              error => {
                if (error.status === 0) {
                  console.log('service down ', error);
                } else {
                  console.log('error in response ', error);
                  this.alertService.error(error.statusText);
                }
                console.log('error', error);
              }
            );
        });
  }

  localWeather() {
    // get location
    this.http.get<Response>('http://ip-api.com/json')
      .subscribe(
        (data) => {
          this.progress.done();
          const lat = data.lat;
          const lon = data.lon;
          this.ws.localWeather(lat, lon)
            .subscribe(
              (data1) => {
                this.loading = false;

                const date = moment.unix(data1.dt).format('LL');
                const sunrise = moment.unix(data1.sys.sunrise).format('h:mm A');
                const sunset = moment.unix(data1.sys.sunset).format('h:mm A');

                this.myWeather = new CurrentWeather(data1.name,
                  data1.sys.country,
                  data1.main.temp,
                  data1.main.humidity,
                  data1.main.pressure,
                  data1.weather[0].icon,
                  data1.clouds.all,
                  data1.weather[0].description,
                  data1.dt = date,
                  data1.main.temp_max,
                  data1.main.temp_min,
                  data1.sys.sunrise = sunrise,
                  data1.sys.sunset = sunset,
                  data1.coord,
                  data1.wind.speed,
                  data1.wind.deg
                );
              },
              error => {
                if (error.status === 0) {
                  console.log('service down ', error);
                } else {
                  console.log('error in response ', error);
                  this.alertService.error(error.statusText);
                }
                console.log('error', error);
              });
        });
  }

  cityWeather(city) {
    this.ws.cityWeather(city)
      .subscribe(
        (data) => {
          this.progress.done();
          const date = moment.unix(data.dt).format('LL');
          const sunrise = moment.unix(data.sys.sunrise).format('h:mm A');
          const sunset = moment.unix(data.sys.sunset).format('h:mm A');

          this.myWeather = new CurrentWeather(data.name,
            data.sys.country,
            data.main.temp,
            data.main.humidity,
            data.main.pressure,
            data.weather[0].icon,
            data.clouds.all,
            data.weather[0].description,
            data.dt = date,
            data.main.temp_max,
            data.main.temp_min,
            data.sys.sunrise = sunrise,
            data.sys.sunset = sunset,
            data.coord,
            data.wind.speed,
            data.wind.deg
          );
        },
        error => {
          if (error.status === 0) {
            console.log('service down ', error);
          } else {
            console.log('error in response ', error);
            this.alertService.error(error.statusText);
          }
          console.log('error', error);
        }
      );
  }

  cityForecast(city) {
    this.fs.cityForecast(city)
      .subscribe(
        (data) => {
          this.progress.done();
          // clean previous data
          this.tempValue.splice(0, this.tempValue.length);
          this.timeValue.splice(0, this.timeValue.length);
          this.windValue.splice(0, this.timeValue.length);
          this.pressureValue.splice(0, this.pressureValue.length);
          this.humidityValue.splice(0, this.humidityValue.length);

          // Get Graph Values
          for (let i = 0; i < data.list.length; i++) {
            if (i < 8) {
              const temp = data.list[i].main.temp;
              const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');
              const wind = data.list[i].wind.speed;
              const humidity = data.list[i].main.humidity;
              const pressure = (data.list[i].main.pressure);

              this.tempValue.push(temp);
              this.timeValue.push(time);
              this.windValue.push(wind);
              this.pressureValue.push(pressure);
              this.humidityValue.push(humidity);
            }
          }

          // Wind Graph
          this.getWChartData(this.timeValue, this.windValue);
          // Temperature & humidity Graph
          this.getTHChart(this.timeValue, this.tempValue, this.humidityValue);
          // Pressure Graph
          this.getPChart(this.timeValue, this.pressureValue);
        },
        error => {
          if (error.status === 0) {
            console.log('service down ', error);
          } else {
            console.log('error in response ', error);
            this.alertService.error(error.statusText);
          }
          console.log('error', error);
        }
      );
  }

  // Time Wind Chart
  getWChartData(timeValue, windValues) {
    this.windChart = 'horizontalBar';
    this.windValues = {
      labels: timeValue,
      datasets: [
        {
          label: 'Wind',
          data: windValues,
          backgroundColor: 'rgb(62,168,249)',
          fill: false,
        }
      ]
    };
    this.windOption = {
      title: {
        display: true,
        text: 'WIND SPEED (m/s) GRAPH'
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

  // Temp Graph
  getTHChart(timeValue, tempValue, humidityValue) {
    this.THChart = 'horizontalBar';
    this.THValues = {
      labels: timeValue,
      datasets: [
        {
          label: 'Temperature',
          data: tempValue,
          backgroundColor: 'rgb(255,153,51)',
          fill: false,
        },
        {
          label: 'Humidity',
          data: humidityValue,
          backgroundColor: 'rgb(62,249,124)',
          fill: false,
        }
      ]
    };
    this.THOption = {
      title: {
        display: true,
        text: 'TEMPERATURE (C) & HUMIDITY (%) GRAPH'
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

  // Pressure Graph
  getPChart(timeValue, pressureValue) {
    this.pressureChart = 'horizontalBar';
    this.pressureValues = {
      labels: timeValue,
      datasets: [
        {
          label: 'Pressure',
          data: pressureValue,
          backgroundColor: 'rgb(153,153,255)',
          fill: false,
        }
      ]
    };
    this.pressureOption = {
      title: {
        display: true,
        text: 'PRESSURE GRAPH (hpa)'
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
