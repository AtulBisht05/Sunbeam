import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ForecastService {

  city: string;
  apiKey = environment.apiKey;
  lat: string;
  lon: string;

  constructor(private http: HttpClient) { }

  public localForecast(lat, lon): Observable<any> {
    this.lat = lat;
    this.lon = lon;
    sessionStorage.setItem('latitude', this.lat);
    sessionStorage.setItem('longitude', this.lon);
    return this.http.get(
      'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + this.apiKey + '&units=metric');
  }

  public cityForecast(city): Observable<any> {
    this.city = city;
    sessionStorage.setItem('city', this.city);
    return this.http.get(
      'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + this.apiKey + '&units=metric');
  }

}
