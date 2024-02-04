import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempGraphComponent } from './temp-graph.component';

describe('TempGraphComponent', () => {
  let component: TempGraphComponent;
  let fixture: ComponentFixture<TempGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
