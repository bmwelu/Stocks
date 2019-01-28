import { Component, OnInit} from '@angular/core';
import { StockComponentSharedService } from '../_shared/stock-component-shared.service';
import { ChartComponent } from '../_shared/chart/chart.component';
import { SubscriberEntity } from '../_core/subscriber-entity';
import { Stock } from '../_shared/models/stock';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html'
})

export class StockDetailComponent extends SubscriberEntity implements OnInit  {
  public showDetail = false;
  public ticker = '';
  public chart: ChartComponent;
  public stockDetail: Stock | undefined;
  public intraDayChartAvailable = false;
  public dailyChartAvailable = false;
  public weeklyChartAvailable = false;
  public monthlyChartAvailable = false;
  constructor(
    private stockComponentSharedService: StockComponentSharedService) {
      super();
      this.chart = new ChartComponent();
      stockComponentSharedService.tickerStream
        .takeUntil(this.destroyed)
        .subscribe(
          (ticker) => {
            this.ticker = ticker;
            this.generateStockDetail(ticker);
            // Determine which charts are available based on whether or not data is available
            this.intraDayChartAvailable = this.stockComponentSharedService.getCachedStockData(this.ticker, 0).length > 0;
            this.dailyChartAvailable = this.stockComponentSharedService.getCachedStockData(this.ticker, 1).length > 0;
            this.weeklyChartAvailable = this.stockComponentSharedService.getCachedStockData(this.ticker, 2).length > 0;
            this.monthlyChartAvailable = this.stockComponentSharedService.getCachedStockData(this.ticker, 3).length > 0;
            this.intraDayChartAvailable ? this.generateChart(this.stockComponentSharedService.getCachedStockData(this.ticker, 0),
              this.stockComponentSharedService.getCachedStockLabels(this.ticker, 0)) :
              this.generateChart(this.stockComponentSharedService.getCachedStockData(this.ticker, 1),
              this.stockComponentSharedService.getCachedStockLabels(this.ticker, 1));
            this.showDetail = true;
        });
   }

  public ngOnInit(): void {
    this.showDetail = false;
  }

  public hideStockDetails(): void {
    this.chart.populateData([], []);
    this.showDetail = false;
    this.stockComponentSharedService.clearTicker(this.ticker);
  }

  public changeChartTimeSpan(interval: number): void {
    this.generateChart(this.stockComponentSharedService.getCachedStockData(this.ticker, interval),
        this.stockComponentSharedService.getCachedStockLabels(this.ticker, interval));
  }

  public generateChart(data: number[], labels: string[]): void {
    this.chart.populateData(data, labels);
  }

  private generateStockDetail(ticker: string): void {
      this.stockComponentSharedService.getStockDetail(ticker).subscribe(
          (stockDetail) => this.stockDetail = stockDetail);
  }
}
