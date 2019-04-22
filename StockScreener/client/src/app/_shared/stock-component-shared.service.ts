import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { StockMonitorService } from '../_api/services/stock-monitor.service';
import { Observable } from 'rxjs/Observable';
import { Stock } from '../_shared/models/stock';
import 'rxjs/add/observable/zip';

@Injectable()
export class StockComponentSharedService {

  constructor(private stockMonitorService: StockMonitorService) { }

  // Observable string sources
  private ticker = new Subject<string>();

  // Observable string streams
  public tickerStream = this.ticker.asObservable();

  // Service message commands
  public updateTicker(ticker: string): void {
    // Cache all graph data
    Observable.zip(this.stockMonitorService.getStockTimeSeriesData(ticker, 0),
                   this.stockMonitorService.getStockTimeSeriesData(ticker, 1),
                   this.stockMonitorService.getStockTimeSeriesData(ticker, 2),
                   this.stockMonitorService.getStockTimeSeriesData(ticker, 3))
              .subscribe(([oneDay, oneWeek, oneYear, fiveYears]) => {
                    this.cacheChartIntervalData(oneDay, ticker, 0),
                    this.cacheChartIntervalData(oneWeek, ticker, 1),
                    this.cacheChartIntervalData(oneYear, ticker, 2),
                    this.cacheChartIntervalData(fiveYears, ticker, 3);
                    this.ticker.next(ticker);
                });
  }

  public getCachedStockList(): Stock[] {
    let data = localStorage.getItem('stockList');
    data = (data === 'undefined' || data === null) ? '[]' : data;
    return JSON.parse(data);
  }

  public setCachedStockList(stocks: Stock[]): void {
    localStorage.setItem('stockList', JSON.stringify(stocks));
  }

  public getCachedStockData(ticker: string, interval: number): number[] {
    return JSON.parse(localStorage.getItem(`${ticker}:${interval}:data`)  || '{}');
  }

  public getCachedStockLabels(ticker: string, interval: number): string[] {
    return JSON.parse(localStorage.getItem(`${ticker}:${interval}:labels`)  || '{}');
  }

  private cacheChartIntervalData(chartData: any, ticker: string, interval: number): void {
      const labels: String[] = [];
      const data: Number[] = [];
      for (let i = 0; i < chartData.length; i++) {
         data.push(chartData[i]['value']);
         labels.push(chartData[i]['time']);
      }

      localStorage.setItem(`${ticker}:${interval}:data`, JSON.stringify(data));
      localStorage.setItem(`${ticker}:${interval}:labels`, JSON.stringify(labels));
  }

  public clearTicker(ticker: string): void {
    // Remove all cached graph data
    localStorage.removeItem(`${ticker}:0:data`);
    localStorage.removeItem(`${ticker}:0:labels`);
    localStorage.removeItem(`${ticker}:1:data`);
    localStorage.removeItem(`${ticker}:1:labels`);
    localStorage.removeItem(`${ticker}:2:data`);
    localStorage.removeItem(`${ticker}:2:labels`);
    localStorage.removeItem(`${ticker}:3:data`);
    localStorage.removeItem(`${ticker}:3:labels`);
  }

  public getStockDetail(ticker: string): Observable<Stock> {
    return this.stockMonitorService.getStockDetail(ticker);
  }
}
