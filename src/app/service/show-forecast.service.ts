import { Injectable } from '@angular/core';

@Injectable()
export class ShowForecastService {

  showHourlyForecast = false;
  showFiveDaysForecast = false;

  constructor() { }

  showHourly(key: string) {
    this.showHourlyForecast = !this.showHourlyForecast;
    this.showFiveDaysForecast = false;
  }

  showFiveDay(key: string) {
    this.showFiveDaysForecast = !this.showFiveDaysForecast;
    this.showHourlyForecast = false;
  }

}
