import { Component, OnInit } from '@angular/core';
import { ShowGraphService } from '../service/show-graph.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(public showGraphService: ShowGraphService) { }

  ngOnInit() {
    this.showGraphService.showGraphPressure('pressureComponent');
    this.showGraphService.showGraphWind('windComponent');
    this.showGraphService.showGraphHumidity('humidityComponent');
    this.showGraphService.showGraphTemp('tempComponent');
  }
}
