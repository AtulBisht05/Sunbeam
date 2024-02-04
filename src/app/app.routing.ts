import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrentComponent } from './current-weather/current.component';
import { TempGraphComponent } from './temperature-graph/temp-graph.component';
import { WindGraphComponent } from './wind-graph/wind-graph.component';
import { ChartComponent } from './chart/chart.component';
import { HourlyComponent } from './hourly-forecast/hourly.component';
import { ForecastComponent } from './days-forecast/forecast.component';
import { MapComponent } from './map/map.component';
import { HumidityGraphComponent } from './humidity-graph/humidity-graph.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';

const WeatherRoutes: Routes = [
    { path: '', component: CurrentComponent },
    { path: 'weatherForecast', component: WeatherForecastComponent },
    { path: 'hourly', component: HourlyComponent },
    { path: 'forecast', component: ForecastComponent },
    { path: 'chart', component: ChartComponent },
    { path: 'map', component: MapComponent },
    { path: 'tempGraph', component: TempGraphComponent },
    { path: 'windGraph', component: WindGraphComponent },
    { path: 'HumidityGraph', component: HumidityGraphComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(WeatherRoutes);
