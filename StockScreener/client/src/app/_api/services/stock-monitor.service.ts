import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { IStock } from '../../_shared/models/istock';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class StockMonitorService {
    constructor(private httpClient: HttpClient) { }

    getStocks(stocks: string[]): Observable<IStock[]> {
        return this.httpClient.get<IStock[]>(`${environment.apiURL}stocks/` + stocks);
    }

    getStock(ticker: string): Observable<IStock> {
        return this.httpClient.get<IStock>(`${environment.apiURL}stocks/` + ticker);
    }

    getStockTimeSeriesData(ticker: string, interval: number): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiURL}stocks/${ticker}/timeseries-data/` + interval);
    }

    getMonitoredStocks(): Observable<IStock[]> {
        return this.httpClient.get<IStock[]>(`${environment.apiURL}stocks/watchlist/`);
    }

    getSuggestedStocks(searchString: string): Observable<IStock[]> {
        return this.httpClient.get<IStock[]>(`${environment.apiURL}stocks/suggested-stocks/` + searchString);
    }
}
