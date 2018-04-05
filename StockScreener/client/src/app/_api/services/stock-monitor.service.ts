import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Stock } from '../../_shared/models/stock';

@Injectable()
export class StockMonitorService {
    constructor(private httpClient: HttpClient) { }

    public getStocks(stocks: string[]): Observable<Stock[]> {
        return this.httpClient.get<Stock[]>(`${environment.apiURL}stocks/${stocks}`);
    }

    public getStock(ticker: string): Observable<Stock> {
        return this.httpClient.get<Stock>(`${environment.apiURL}stocks/${ticker}`);
    }

    public getStockTimeSeriesData(ticker: string, interval: number): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiURL}stocks/${ticker}/timeseries-data/${interval}`);
    }

    public getMonitoredStocks(): Observable<Stock[]> {
        return this.httpClient.get<Stock[]>(`${environment.apiURL}stocks/watchlist/`);
    }

    public getSuggestedStocks(searchString: string): Observable<Stock[]> {
        return this.httpClient.get<Stock[]>(`${environment.apiURL}stocks/suggested-stocks/${searchString}`);
    }
}
