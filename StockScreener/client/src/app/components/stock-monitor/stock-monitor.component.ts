import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { ClockService } from '../../services/clock.service';
import { StockMonitorService } from '../../services/stock-monitor.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StockComponentSharedService } from '../../services/stock-component-shared.service';
// import { Subscription }   from 'rxjs/Subscription';


@Component({
  selector: 'app-stock-monitor',
  templateUrl: './stock-monitor.component.html',
  styleUrls: ['./stock-monitor.component.css'],
})
export class StockMonitorComponent implements OnInit {
  secondsRemaining: number;
  stocks: Stock[];
  searchString: string;
  selectedStockInfo: StockInfo;
  suggestedStocks: Stock[];
  selectedSuggestedStocks: Stock[];
  emptySuggestions: boolean;
  showMoreDetailTicker: string;
  // subscription: Subscription;

  constructor(private clockService: ClockService,
    private stockMonitorService: StockMonitorService,
    public cdRef: ChangeDetectorRef,
    private toastr: ToastsManager,
    private stockComponentSharedService: StockComponentSharedService) {
      // this.subscription = stockComponentSharedService.updateHideDetail$.subscribe(
      //   hd => {
      //     this.mission = mission;
      // });
    }

  ngOnInit() {
     this.emptySuggestions = true;
     this.suggestedStocks = [];
     this.selectedSuggestedStocks = [];
     this.clockService.getClock().subscribe(secondsRemaining => this.updateTime(secondsRemaining));
     let data = localStorage.getItem('stockList');
     data = (data === 'undefined' || data === null) ? '[]' : data;
     this.stocks = JSON.parse(data);
  }

  private updateTime(seconds: number) {
    this.secondsRemaining = seconds;
    if (this.secondsRemaining % 30 === 0) {
      this.updateStocks(this.stocks);
    }
  }

  private updateStocks(stocks: Stock[]) {
    if (stocks.length > 0) {
      this.stockMonitorService.getStocks(stocks.map(s => s.symbol)).subscribe(returnedStocks => {
        returnedStocks.forEach(returnedStock =>  {
            const stockToUpdate = stocks.find(function(st) {
              return st.symbol === returnedStock.symbol;
            });
            stockToUpdate.latestPrice = returnedStock.latestPrice;
        });
      });
    }
  }

  public getTickerInfo(ticker: string) {
    this.stockComponentSharedService.updateTicker(ticker);
  }

  public addStock() {
    if (this.selectedSuggestedStocks.length > 0) {
      if (this.stocks.filter(stock => stock.symbol === this.selectedSuggestedStocks[0].symbol).length === 0) {
        this.stocks.push(this.selectedSuggestedStocks[0]);
        this.updateStocks([this.selectedSuggestedStocks[0]]);
        localStorage.setItem('stockList', JSON.stringify(this.stocks));
        this.selectedSuggestedStocks = [];
        this.searchString = '';
        this.toastr.success('Stock was added to list below.', 'Success!');
      } else {
        this.toastr.error(this.selectedSuggestedStocks[0].symbol + ': ' + this.selectedSuggestedStocks[0].companyName +
        'is already in the list.', 'Error!');
        this.selectedSuggestedStocks = [];
        this.searchString = '';
      }
    } else {
      this.toastr.error('Please select a stock from the suggested list.', 'Error!');
    }
  }

  public deleteStock(ticker: string) {
    this.stocks = this.stocks.filter(stock => stock.symbol !== ticker);
  }

  public getSuggestedStocks(searchString: string) {
    this.suggestedStocks = [];
    this.emptySuggestions = (this.suggestedStocks.length === 0);
    if (typeof searchString !== 'undefined' && searchString) {
      this.stockMonitorService.getSuggestedStocks(searchString).subscribe(suggestedStocks => {
          this.suggestedStocks = suggestedStocks;
          this.emptySuggestions = (this.suggestedStocks.length === 0);
      });
    }
  }

  // public getMonitoredStocks()
  // {
  //   this.stockMonitorService.getMonitoredStocks().subscribe(monitoredStocks => this.monitoredStocks = monitoredStocks);
  // }

  public suggestedStockSelected() {
    this.searchString = this.selectedSuggestedStocks[0].symbol + ': ' + this.selectedSuggestedStocks[0].companyName;
    this.emptySuggestions = true;
    this.cdRef.detectChanges();
  }

  // ngOnDestroy() {
  //   // prevent memory leak when component destroyed
  //   this.subscription.unsubscribe();
  // }
}

interface Stock {
   companyName: string;
   symbol: string;
   latestPrice: string;
 }

 interface StockInfo {
    companyName: string;
    symbol: string;
    latestPrice: string;
    primaryExchange: string;
    sector: string;
 }