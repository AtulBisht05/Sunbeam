import { TestBed, inject } from '@angular/core/testing';
import { ShowForecastService } from './show-forecast.service';

describe('ShowForecastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowForecastService]
    });
  });

  it('should be created', inject([ShowForecastService], (service: ShowForecastService) => {
    expect(service).toBeTruthy();
  }));
});
