import { Component, OnInit, Inject} from '@angular/core';
import { StockComponentSharedService } from '../_shared/stock-component-shared.service';
import { ChartComponent } from '../_shared/chart/chart.component';
import { Stock } from '../_shared/models/stock';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})

export class StockDetailComponent {
  public chart: ChartComponent;
  public ticker: string;
  public stockDetail: Stock;
  public intraDayChartAvailable: boolean;
  public dailyChartAvailable: boolean;
  public weeklyChartAvailable: boolean;
  public monthlyChartAvailable: boolean;
  constructor(
    private stockComponentSharedService: StockComponentSharedService,
    public dialogRef: MatDialogRef<StockDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.chart = new ChartComponent();
      this.ticker = data.ticker;
      this.stockDetail = data.stockDetail;
      this.intraDayChartAvailable = data.intraDayChartAvailable;
      this.dailyChartAvailable = data.dailyChartAvailable;
      this.weeklyChartAvailable = data.weeklyChartAvailable;
      this.monthlyChartAvailable = data.monthlyChartAvailable;
    //   this.intraDayChartAvailable ? this.generateChart(this.stockComponentSharedService.getCachedStockData(this.ticker, 0),
    //   this.stockComponentSharedService.getCachedStockLabels(this.ticker, 0)) :
    //   this.generateChart(this.stockComponentSharedService.getCachedStockData(this.ticker, 1),
    //   this.stockComponentSharedService.getCachedStockLabels(this.ticker, 1));
   }

  public hideStockDetails(): void {
    this.chart.populateData([], []);
    this.stockComponentSharedService.clearTicker(this.ticker);
    this.dialogRef.close();
  }

  public changeChartTimeSpan(interval: number): void {
    this.generateChart(this.stockComponentSharedService.getCachedStockData(this.ticker, interval),
        this.stockComponentSharedService.getCachedStockLabels(this.ticker, interval));
  }

  public generateChart(data: number[], labels: string[]): void {
    this.chart.populateData(data, labels);
  }
}
