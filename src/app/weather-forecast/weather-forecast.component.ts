import { Component, OnInit } from '@angular/core';
import { ShowForecastService } from '../service/show-forecast.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  constructor(public showForecastService: ShowForecastService) { }

  ngOnInit() {
    this.showForecastService.showFiveDay('forecastComponent');
    this.showForecastService.showHourly('hourlyComponent');
  }
}
