import { TestBed, inject } from '@angular/core/testing';
import { ShowGraphService } from './show-graph.service';

describe('ShowGraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowGraphService]
    });
  });

  it('should be created', inject([ShowGraphService], (service: ShowGraphService) => {
    expect(service).toBeTruthy();
  }));
});
