import { Component, OnInit} from '@angular/core';
import { StockComponentSharedService } from '../../services/stock-component-shared.service';
import { StockMonitorService } from '../../services/stock-monitor.service';
import { ChartComponent } from '../chart/chart.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})

export class StockDetailComponent implements OnInit {
  subscription: Subscription;
  hideDetail: boolean;
  ticker: string;
  chart: ChartComponent;
  constructor(private stockComponentSharedService: StockComponentSharedService,
              private stockMonitorService: StockMonitorService) {
    this.chart = new ChartComponent();
    stockComponentSharedService.ticker$.subscribe(
      t => {
        this.ticker = t;
        this.generateChart(JSON.parse(localStorage.getItem(this.ticker + ':0:data')),
          JSON.parse(localStorage.getItem(this.ticker + ':0:labels')));
        this.hideDetail = false;
      });
   }

  ngOnInit() {
    this.hideDetail = true;
  }

  private hideStockDetails() {
    this.chart.populateData([], []);
    this.hideDetail = true;
    this.stockComponentSharedService.clearTicker(this.ticker);
  }

  private changeChartTimeSpan(interval) {
    this.generateChart(JSON.parse(localStorage.getItem(this.ticker + ':' + interval + ':data')),
    JSON.parse(localStorage.getItem(this.ticker + ':' + interval + ':labels'));
  }

  private generateChart(data, labels) {
    this.chart.populateData(data, labels);
  }
}
