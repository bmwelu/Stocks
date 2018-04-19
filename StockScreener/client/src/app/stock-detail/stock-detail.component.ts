import { Component, OnInit} from '@angular/core';
import { StockComponentSharedService } from '../_shared/stock-component-shared.service';
import { StockMonitorService } from '../_api/services/stock-monitor.service';
import { ChartComponent } from '../_shared/chart/chart.component';
import { SubscriberEntity } from '../_core/subscriber-entity';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html'
})

export class StockDetailComponent extends SubscriberEntity implements OnInit  {
  public hideDetail = true;
  public ticker = '';
  public chart: ChartComponent;
  constructor(
    private stockComponentSharedService: StockComponentSharedService,
    private stockMonitorService: StockMonitorService) {
      super();
      this.chart = new ChartComponent();
      stockComponentSharedService.tickerStream
        .takeUntil(this.destroyed)
        .subscribe(
          (ticker) => {
            this.ticker = ticker;
            this.generateChart(this.stockComponentSharedService.getCachedStockData(this.ticker, 0),
              this.stockComponentSharedService.getCachedStockLabels(this.ticker, 0));
            this.hideDetail = false;
        });
   }

  public ngOnInit(): void {
    this.hideDetail = true;
  }

  public hideStockDetails(): void {
    this.chart.populateData([], []);
    this.hideDetail = true;
    this.stockComponentSharedService.clearTicker(this.ticker);
  }

  public changeChartTimeSpan(interval: number): void {
    this.generateChart(this.stockComponentSharedService.getCachedStockData(this.ticker, interval),
        this.stockComponentSharedService.getCachedStockLabels(this.ticker, interval));
  }

  public generateChart(data: number[], labels: string[]): void {
    this.chart.populateData(data, labels);
  }
}
