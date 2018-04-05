import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { Stock } from '../../_shared/models/stock';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class StockMonitorService {
    constructor(private httpClient: HttpClient) { }

    getStocks(stocks: string[]): Observable<Stock[]> {
        return this.httpClient.get<Stock[]>(`${environment.apiURL}stocks/${stocks}`);
    }

    getStock(ticker: string): Observable<Stock> {
        return this.httpClient.get<Stock>(`${environment.apiURL}stocks/${ticker}`);
    }

    getStockTimeSeriesData(ticker: string, interval: number): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiURL}stocks/${ticker}/timeseries-data//${interval}`);
    }

    getMonitoredStocks(): Observable<Stock[]> {
        return this.httpClient.get<Stock[]>(`${environment.apiURL}stocks/watchlist/`);
    }

    getSuggestedStocks(searchString: string): Observable<Stock[]> {
        return this.httpClient.get<Stock[]>(`${environment.apiURL}stocks/suggested-stocks//${searchString}`);
    }
}
