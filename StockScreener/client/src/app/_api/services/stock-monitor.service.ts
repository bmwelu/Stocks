import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Stock } from '../../_shared/models/stock';
import { AuthGuard } from './auth-guard.service';

@Injectable()
export class StockMonitorService {
    constructor(private httpClient: HttpClient,
                private auth: AuthGuard) { }

    public getStocks(stocks: string[]): Observable<Stock[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${this.auth.getToken()}`
            })
        };
        return this.httpClient.get<Stock[]>(`${environment.apiURL}api/stockquote/?tickers=${stocks}`, httpOptions);
    }

    public getStockDetail(ticker: string): Observable<Stock> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${this.auth.getToken()}`
            })
        };
        return this.httpClient.get<Stock>(`${environment.apiURL}api/stock/${ticker}/detail`, httpOptions);
    }

    public getStockTimeSeriesData(ticker: string, interval: number): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${this.auth.getToken()}`
            })
        };
        return this.httpClient.get<any>(`${environment.apiURL}api/stock/${ticker}/timeseries/${interval}`, httpOptions);
    }

    public getSuggestedStocks(searchString: string): Observable<Stock[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${this.auth.getToken()}`
            })
        };
        return this.httpClient.get<Stock[]>(`${environment.apiURL}api/suggestedstock/?searchString=${searchString}`, httpOptions);
    }
}
