import { Component, OnInit,  } from '@angular/core';
import { ClockService } from '../../services/clock.service';
import { StockMonitorService } from '../../services/stock-monitor.service'

@Component({
  selector: 'app-stock-monitor',
  templateUrl: './stock-monitor.component.html',
  styleUrls: ['./stock-monitor.component.css']
})
export class StockMonitorComponent implements OnInit {
  secondsRemaining:number;
  stocks:[Stock];
  companyFilter:string;
  selectedStockInfo:StockInfo;
  showMoreDetail:boolean;
  monitoredStocks:[Stock];

  constructor(private clockService:ClockService, private stockMonitorService:StockMonitorService) { }

  ngOnInit() {
     this.clockService.getClock().subscribe(secondsRemaining => this.updateTime(secondsRemaining));
     this.showMoreDetail = false;
     this.getMonitoredStocks();
  }

  private updateTime(seconds: number)
  {
    this.secondsRemaining = seconds;
    if(this.secondsRemaining % 10 === 0)
    {
      this.updateStocks();
    }
  }

  private updateStocks()
  {
    this.stockMonitorService.getStocks().subscribe(stocks => this.stocks = stocks);
  }

  public getTickerInfo(ticker: string)
  {
    this.stockMonitorService.getStock(ticker).subscribe(stockInfo => {this.selectedStockInfo = stockInfo, this.showMoreDetail = true});
    
  }

  public getMonitoredStocks()
  {
    this.stockMonitorService.getMonitoredStocks().subscribe(monitoredStocks => this.monitoredStocks = monitoredStocks);
  }
}

interface Stock{
   companyName:string,
   symbol:string,
   latestPrice:string
 }

 interface StockInfo{
    companyName:string,
    symbol:string,
    latestPrice:string,
    primaryExchange:string,
    sector:string,
 }