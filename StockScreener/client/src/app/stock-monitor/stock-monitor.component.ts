import { Component, OnInit } from '@angular/core';
import { ClockService } from '../_shared/clock.service';
import { StockMonitorService } from '../_api/services/stock-monitor.service';
import { ToastrService } from 'ngx-toastr';
import { StockComponentSharedService } from '../_shared/stock-component-shared.service';
import { Stock } from '../_shared/models/stock';
import { SubscriberEntity } from '../_core/subscriber-entity';
import { take } from 'rxjs/operators';
import 'rxjs/add/operator/takeUntil';
import { AuthGuard } from '../_api/services/auth-guard.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/';
import { MatDialog } from '@angular/material';
import { StockDetailComponent } from '../stock-detail/stock-detail.component';

@Component({
  selector: 'app-stock-monitor',
  templateUrl: './stock-monitor.component.html',
  styleUrls: ['./stock-monitor.component.css']
})
export class StockMonitorComponent extends SubscriberEntity implements OnInit {
  public stocks: Stock[] = [];
  public searchString = '';
  public suggestedStocks: Stock[] = [];
  public selectedSuggestedStock: Stock | undefined;
  private updateStocksTimeInSeconds = 30;
  private secondsRemainingUntilNextPriceUpdate = 0;
  public displayedColumns = ['companyName', 'symbol', 'latestPrice', 'percentChange', 'delete'];

  constructor(
    private clockService: ClockService,
    private stockMonitorService: StockMonitorService,
    private toastr: ToastrService,
    private stockComponentSharedService: StockComponentSharedService,
    private auth: AuthGuard,
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
        super();
        iconRegistry.addSvgIcon(
            'info',
            sanitizer.bypassSecurityTrustResourceUrl('../../assets/info-icon.svg'));
    }

  public ngOnInit(): void {
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
    if (this.auth.isLoggedIn()) {
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
  }

  public showStockDetail(ticker: string): void {
    // this.stockComponentSharedService.updateTimeSeriesValues(ticker);
    // this.stockComponentSharedService.tickerStream
    // .subscribe(() => {
    //     const intraDayChartAvailable = this.stockComponentSharedService.getCachedStockData(ticker, 0).length > 0;
    //     const dailyChartAvailable = this.stockComponentSharedService.getCachedStockData(ticker, 1).length > 0;
    //     const weeklyChartAvailable = this.stockComponentSharedService.getCachedStockData(ticker, 2).length > 0;
    //     const monthlyChartAvailable = this.stockComponentSharedService.getCachedStockData(ticker, 3).length > 0;
    //     this.stockComponentSharedService.getStockDetail(ticker).subscribe((results) => {
    //         const dialogRef = this.dialog.open(StockDetailComponent,
    //         {
    //             data: {
    //                       ticker: ticker, stockDetail: results, intraDayChartAvailable: intraDayChartAvailable,
    //                       dailyChartAvailable: dailyChartAvailable, weeklyChartAvailable: weeklyChartAvailable,
    //                       monthlyChartAvailable: monthlyChartAvailable
    //                   }
    //         });
    //         dialogRef.afterClosed().pipe(take(1)).subscribe();
    //     });
    //   });
    const st: any = {
        companyName: 'testCompany',
        symbol: 'xxx',
        percentChange: '111',
        latestPrice: '222',
        primaryExchange: 'primExchange',
        sector: 'sectorName',
        week52High: 'soDamnHigh',
        week52Low: 'soDamnLow',
        previousClose: 'lastCloseSucked'
    };
    const dialogRef = this.dialog.open(StockDetailComponent,
            {
                data: {
                          ticker: 'xxx', stockDetail: st, intraDayChartAvailable: false,
                          dailyChartAvailable: false, weeklyChartAvailable: false,
                          monthlyChartAvailable: false
                      }
            });
            dialogRef.afterClosed().pipe(take(1)).subscribe();
  }

  public addStock(): void {
    if (this.selectedSuggestedStock) {
      const symbolToAdd = (this.selectedSuggestedStock) ? this.selectedSuggestedStock.symbol : null;
      if (this.stocks.filter((stock) => stock.symbol === symbolToAdd).length === 0) {
        this.stocks = this.stocks.concat([this.selectedSuggestedStock]);
        this.updateStocks([this.selectedSuggestedStock]);
        this.stockComponentSharedService.setCachedStockList(this.stocks);
        this.toastr.success('Stock was added to list below.', 'Success!', {
            positionClass: 'toast-top-center'
          });
      } else {
        this.toastr.error(
          `${this.selectedSuggestedStock.symbol}: ${this.selectedSuggestedStock.companyName} is already in the list.`, 'Error!', {
            positionClass: 'toast-top-center'
          });
      }
      this.cleanupSearch();
    } else {
      this.toastr.error('Please select a stock from the suggested list.', 'Error!', {
        positionClass: 'toast-top-center'
      });
    }
  }

  public deleteStock(ticker: string): void {
    this.stocks = this.stocks.filter(stock => stock.symbol !== ticker);
    this.stockComponentSharedService.setCachedStockList(this.stocks);
  }

  public getSuggestedStocks(searchString: string): void {
    this.cleanupSearch(searchString);
    if (typeof searchString !== 'undefined' && searchString ) {
      this.stockMonitorService.getSuggestedStocks(searchString).subscribe((suggestedStocks) => {
          this.suggestedStocks = suggestedStocks;
      });
    } else {
        this.suggestedStocks = [];
    }
  }

  public suggestedStockSelected(stock ?: Stock): void {
      if (stock) {
        this.searchString = stock.symbol + ': ' + stock.companyName;
        this.selectedSuggestedStock = stock;
        this.suggestedStocks = [];
      }
  }

  private cleanupSearch(searchString ?: string): void {
    this.selectedSuggestedStock = undefined;
    this.searchString = searchString ? searchString : '';
    this.suggestedStocks = [];
  }
}
