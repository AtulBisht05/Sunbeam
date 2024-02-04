import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { NgProgressModule } from 'ngx-progressbar';
import { ChartModule } from 'angular2-chartjs';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CurrentComponent } from './current-weather/current.component';
import { ChartComponent } from './chart/chart.component';
import { AlertComponent } from './directives/alert.component';
import { TempGraphComponent } from './temperature-graph/temp-graph.component';
import { WindGraphComponent } from './wind-graph/wind-graph.component';
import { HourlyComponent } from './hourly-forecast/hourly.component';
import { MapComponent } from './map/map.component';
import { ForecastComponent } from './days-forecast/forecast.component';
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatSliderModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { WeatherService } from './service/weather.service';
import { AlertService } from './service/alert.service';
import { ShowGraphService } from './service/show-graph.service';
import { ForecastService } from './service/forecast.service';
import { AgmCoreModule } from '@agm/core';
import { HumidityGraphComponent } from './humidity-graph/humidity-graph.component';
import { PressureGraphComponent } from './pressure-graph/pressure-graph.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { ShowForecastService } from './service/show-forecast.service';
import { environment } from './../environments/environment';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CurrentComponent,
    ChartComponent,
    AlertComponent,
    TempGraphComponent,
    WindGraphComponent,
    HourlyComponent,
    MapComponent,
    ForecastComponent,
    HumidityGraphComponent,
    PressureGraphComponent,
    WeatherForecastComponent,
    FooterComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    FormsModule,
    routing,
    ChartModule,
    NgProgressModule,
    MatProgressSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey
    }),
  ],
  providers: [
    WeatherService,
    ForecastService,
    AlertService,
    ShowForecastService,
    ShowGraphService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
