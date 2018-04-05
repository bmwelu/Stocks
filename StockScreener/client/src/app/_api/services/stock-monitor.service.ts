import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { IStock } from '../../_shared/models/istock';
import 'rxjs/add/operator/map';

@Injectable()
export class StockMonitorService {
    constructor(private httpClient: HttpClient) { }

    getStocks(stocks: string[]): Observable<IStock[]> {
         return this.httpClient.get(`${environment.apiURL}stocks/` + stocks)
         .catch((res) => Observable.throw(res.json()));
    }

    getStock(ticker: string): Observable<IStock> {
        return this.httpClient.get(`${environment.apiURL}stocks/` + ticker)
        .catch((res) => Observable.throw(res.json()));
    }

    getStockTimeSeriesData(ticker: string, interval: number): Observable<any> {
        return this.httpClient.get(`${environment.apiURL}stocks/${ticker}/timeseries-data/` + interval)
        .catch((res) => Observable.throw(res.json()));
    }

    getMonitoredStocks(): Observable<IStock[]> {
        return this.httpClient.get(`${environment.apiURL}stocks/watchlist/`)
        .catch((res) => Observable.throw(res.json()));
    }

    getSuggestedStocks(searchString: string): Observable<IStock[]> {
        return this.httpClient.get(`${environment.apiURL}stocks/suggested-stocks/` + searchString)
        .catch((res) => Observable.throw(res.json()));
    }
}
