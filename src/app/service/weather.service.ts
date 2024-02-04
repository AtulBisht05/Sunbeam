import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WeatherService {

  apiKey = environment.apiKey;
  lat: string;
  lon: string;
  city: string;

  constructor(private http: HttpClient) {
  }

  public localWeather(lat, lon): Observable<any> {
    this.lat = lat;
    this.lon = lon;
    return this.http.get(
      'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + this.apiKey + '&units=metric');
  }

  public cityWeather(city): Observable<any> {
    this.city = city;
    localStorage.setItem('city', this.city);
    return this.http.get(
      'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + this.apiKey + '&units=metric');
  }

  public citiesWeather(lat, lon): Observable<any> {
    this.lat = lat;
    this.lon = lon;
    return this.http.get(
      'http://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + lon + '&cnt=10&appid=' + this.apiKey + '&units=metric');
  }
}
