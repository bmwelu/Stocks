import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Stock } from '../../_shared/models/stock';

@Injectable()
export class StockMonitorService {
    constructor(private httpClient: HttpClient) { }

    public getStocks(stocks: string[]): Observable<Stock[]> {
        return this.httpClient.get<Stock[]>(`${environment.apiURL}api/stockquote/?tickers=${stocks}`);
    }

    public getStockDetail(ticker: string): Observable<Stock> {
        return this.httpClient.get<Stock>(`${environment.apiURL}api/stock/${ticker}/detail`);
    }

    public getStockTimeSeriesData(ticker: string, interval: number): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiURL}api/stock/${ticker}/timeseries/${interval}`);
    }

    public getSuggestedStocks(searchString: string): Observable<Stock[]> {
        return this.httpClient.get<Stock[]>(`${environment.apiURL}api/suggestedstock/?searchString=${searchString}`);
    }
}
