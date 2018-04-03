import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { StockMonitorService } from './stock-monitor.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StockComponentSharedService {

  constructor(private stockMonitorService: StockMonitorService) { }

  // Observable string sources
  private ticker = new Subject<string>();

  // Observable string streams
  ticker$ = this.ticker.asObservable();

  // Service message commands
  updateTicker(t: string) {
    // Cache all graph data
    Observable.zip(this.stockMonitorService.getStockTimeSeriesData(t, 0),
                   this.stockMonitorService.getStockTimeSeriesData(t, 1),
                   this.stockMonitorService.getStockTimeSeriesData(t, 2),
                   this.stockMonitorService.getStockTimeSeriesData(t, 3))
              .subscribe(([int0, int1, int2, int3]) => {
                this.cacheChartIntervalData(int0, t, 0);
                this.cacheChartIntervalData(int1, t, 1);
                this.cacheChartIntervalData(int2, t, 2);
                this.cacheChartIntervalData(int3, t, 3);
                this.ticker.next(t); });
  }

  private cacheChartIntervalData(chartData: any, ticker: string, interval: number) {
      const labels = [];
      const data = [];
      for (let i = chartData.length - 1; i > -1; i--) {
         data.push(chartData[i][Object.keys(chartData[i])[0]]);
         labels.push(Object.keys(chartData[i])[0]);
      }
      localStorage.setItem(`${ticker}:${interval}:data`, JSON.stringify(data));
      localStorage.setItem(`${ticker}:${interval}:labels`, JSON.stringify(labels));
  }

  clearTicker(t: string) {
    // Remove all cached graph data
    localStorage.removeItem(`${t}:0:data`);
    localStorage.removeItem(`${t}:0:labels`);
    localStorage.removeItem(`${t}:1:data`);
    localStorage.removeItem(`${t}:1:labels`);
    localStorage.removeItem(`${t}:2:data`);
    localStorage.removeItem(`${t}:2:labels`);
    localStorage.removeItem(`${t}:3:data`);
    localStorage.removeItem(`${t}:3:labels`);
  }
}
