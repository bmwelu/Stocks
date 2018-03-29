import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMonitorComponent } from './stock-monitor.component';

describe('StockMonitorComponent', () => {
  let component: StockMonitorComponent;
  let fixture: ComponentFixture<StockMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
