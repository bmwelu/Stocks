import { Component, OnInit } from '@angular/core';
import { ClockService } from '../_shared/clock.service';
import { StockMonitorService } from '../_api/services/stock-monitor.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StockComponentSharedService } from '../_shared/stock-component-shared.service';
import { Stock } from '../_shared/models/stock';
import { SubscriberEntity } from '../_core/subscriber-entity';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-stock-monitor',
  templateUrl: './stock-monitor.component.html'
})
export class StockMonitorComponent extends SubscriberEntity implements OnInit {
  public stocks: Stock[] = [];
  public searchString = '';
  public suggestedStocks: Stock[] = [];
  public selectedSuggestedStock: Stock | undefined;
  public emptySuggestions = true;
  private updateStocksTimeInSeconds = 30;
  private secondsRemainingUntilNextPriceUpdate = 0;

  constructor(
    private clockService: ClockService,
    private stockMonitorService: StockMonitorService,
    private toastr: ToastsManager,
    private stockComponentSharedService: StockComponentSharedService) {
        super();
    }

  public ngOnInit(): void {
     this.emptySuggestions = true;
     this.suggestedStocks = [];
     this.clockService.getClock()
         .takeUntil(this.destroyed)
         .subscribe((secondsRemaining) => this.updateTime(secondsRemaining));
     this.stocks = this.stockComponentSharedService.getCachedStockList();
  }

  private updateTime(seconds: number): void {
    this.secondsRemainingUntilNextPriceUpdate = seconds;
    if (this.secondsRemainingUntilNextPriceUpdate % this.updateStocksTimeInSeconds === 0) {
      this.updateStocks(this.stocks);
    }
  }

  private updateStocks(stocks: Stock[]): void {
    if (stocks.length <= 0) {
        return;
      }
      const stockSymbols = stocks.map((s) => s.symbol);
      const request = this.stockMonitorService.getStocks(stockSymbols);
      request.subscribe((returnedStocks) => {
        for (const stock of returnedStocks) {
          const stockToUpdate = stocks.find((st) => st.symbol === stock.symbol);
          if (stockToUpdate !== undefined) {
            stockToUpdate.latestPrice = stock.latestPrice;
            stockToUpdate.percentChange = stock.percentChange;
          }
        }
      });
  }

  public getTickerInfo(ticker: string): void {
    this.stockComponentSharedService.updateTicker(ticker);
  }

  public addStock(): void {
    if (this.selectedSuggestedStock) {
      const symbolToAdd = (this.selectedSuggestedStock) ? this.selectedSuggestedStock.symbol : null;
      if (this.stocks.filter((stock) => stock.symbol === symbolToAdd).length === 0) {
        this.stocks.push(this.selectedSuggestedStock);
        this.updateStocks([this.selectedSuggestedStock]);
        this.stockComponentSharedService.setCachedStockList(this.stocks);
        this.toastr.success('Stock was added to list below.', 'Success!');
      } else {
        this.toastr.error(
          `${this.selectedSuggestedStock.symbol}: ${this.selectedSuggestedStock.companyName} is already in the list.`, 'Error!');
      }
      this.cleanupSearch();
    } else {
      this.toastr.error('Please select a stock from the suggested list.', 'Error!');
    }
  }

  public deleteStock(ticker: string): void {
    this.stocks = this.stocks.filter(stock => stock.symbol !== ticker);
    this.stockComponentSharedService.setCachedStockList(this.stocks);
  }

  public getSuggestedStocks(searchString: string): void {
    this.suggestedStocks = [];
    this.emptySuggestions = (this.suggestedStocks.length === 0);
    if (typeof searchString !== 'undefined' && searchString) {
      this.stockMonitorService.getSuggestedStocks(searchString).subscribe((suggestedStocks) => {
          this.suggestedStocks = suggestedStocks;
          this.emptySuggestions = (this.suggestedStocks.length === 0);
      });
    }
  }

  public suggestedStockSelected(stock: Stock): void {
    this.searchString = (stock) ? stock.symbol + ': ' + stock.companyName : '';
    this.selectedSuggestedStock = stock;
    this.emptySuggestions = true;
  }

  private cleanupSearch(): void {
    this.selectedSuggestedStock = undefined;
    this.searchString = '';
  }
}