import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ClockService } from '../_shared/clock.service';
import { StockMonitorService } from '../_api/services/stock-monitor.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StockComponentSharedService } from '../_shared/stock-component-shared.service';
import { IStock } from '../_shared/models/istock';
import { SubscriberEntity } from '../_core/subscriber-entity';

@Component({
  selector: 'app-stock-monitor',
  templateUrl: './stock-monitor.component.html'
})
export class StockMonitorComponent extends SubscriberEntity implements OnInit {
  secondsRemaining: number;
  stocks: IStock[];
  searchString: string;
  selectedStockInfo: IStock;
  suggestedStocks: IStock[];
  selectedSuggestedStocks: IStock[];
  emptySuggestions: boolean;
  showMoreDetailTicker: string;

  constructor(
    private clockService: ClockService,
    private stockMonitorService: StockMonitorService,
    private toastr: ToastsManager,
    private stockComponentSharedService: StockComponentSharedService) {
        super();
    }

  ngOnInit() {
     this.emptySuggestions = true;
     this.suggestedStocks = [];
     this.selectedSuggestedStocks = [];
     this.clockService.getClock()
         .takeUntil(this.destroyed)
         .subscribe((secondsRemaining) => this.updateTime(secondsRemaining));
     this.stocks = this.stockComponentSharedService.getCachedStockList();
  }

  private updateTime(seconds: number) {
    this.secondsRemaining = seconds;
    if (this.secondsRemaining % 30 === 0) {
      this.updateStocks(this.stocks);
    }
  }

  private updateStocks(stocks: IStock[]) {
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
          }
        }
      });
  }

  public getTickerInfo(ticker: string) {
    this.stockComponentSharedService.updateTicker(ticker);
  }

  public addStock() {
    // This needs to be refactored.  selectedSuggestedStocks is populated from a multiselect that will only always have
    // 1 or 0 selected; never multi
    if (this.selectedSuggestedStocks.length > 0) {
      if (this.stocks.filter((stock) => stock.symbol === this.selectedSuggestedStocks[0].symbol).length === 0) {
        this.stocks.push(this.selectedSuggestedStocks[0]);
        this.updateStocks([this.selectedSuggestedStocks[0]]);
        this.stockComponentSharedService.setCachedStockList(this.stocks);
        this.toastr.success('Stock was added to list below.', 'Success!');
      } else {
        this.toastr.error(
          `${this.selectedSuggestedStocks[0].symbol}: ${this.selectedSuggestedStocks[0].companyName} is already in the list.`, 'Error!');
      }
      this.cleanupSearch();
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
      this.stockMonitorService.getSuggestedStocks(searchString).subscribe((suggestedStocks) => {
          this.suggestedStocks = suggestedStocks;
          this.emptySuggestions = (this.suggestedStocks.length === 0);
      });
    }
  }

  public suggestedStockSelected() {
    this.searchString = this.selectedSuggestedStocks[0].symbol + ': ' + this.selectedSuggestedStocks[0].companyName;
    this.emptySuggestions = true;
  }

  private cleanupSearch() {
    this.selectedSuggestedStocks = [];
    this.searchString = '';
  }
}
