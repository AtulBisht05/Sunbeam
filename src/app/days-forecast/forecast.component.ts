import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../service/forecast.service';
import { NgProgress } from 'ngx-progressbar';
import { Forecast } from '../models/forecast';
import * as moment from 'moment';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  fiveDaysForecast: Forecast[] = [];
  loading: boolean;
  city: string;

  constructor(
    private fs: ForecastService,
    private progress: NgProgress
  ) { }

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
          this.city = data.city.name;
          // clean previous data
          this.fiveDaysForecast.splice(0, this.fiveDaysForecast.length);
          // five days weather forecast
          for (let i = 0; i < data.list.length; i = i + 8) {
            const temporary = new Forecast(
              data.list[i].dt = moment.unix(data.list[i].dt).format('LL'),
              data.list[i].dt_txt,
              data.list[i].weather[0].icon,
              data.list[i].main.temp,
              data.list[i].main.humidity,
              data.list[i].main.temp_max,
              data.list[i].main.temp_min,
              data.list[i].weather[0].description,
              data.list[i].rain,
              data.list[i].wind.speed,
              data.list[i].clouds.all,
              data.list[i].main.pressure);

            this.fiveDaysForecast.push(temporary);
          }
        }
      );
  }

  cityForecast() {
    this.fs.cityForecast(this.fs.city)
      .subscribe(
        (data) => {
          this.progress.done();
          this.loading = false;
          this.city = data.city.name;
          // clean previous data
          this.fiveDaysForecast.splice(0, this.fiveDaysForecast.length);
          // Five Days Weather Forecast
          for (let i = 0; i < data.list.length; i = i + 8) {
            const temporary = new Forecast(
              data.list[i].dt = moment.unix(data.list[i].dt).format('LL'),
              data.list[i].dt_txt,
              data.list[i].weather[0].icon,
              data.list[i].main.temp,
              data.list[i].main.humidity,
              data.list[i].main.temp_max,
              data.list[i].main.temp_min,
              data.list[i].weather[0].description,
              data.list[i].rain,
              data.list[i].wind.speed,
              data.list[i].clouds.all,
              data.list[i].main.pressure);
            this.fiveDaysForecast.push(temporary);
          }
        }
      );
  }
}
