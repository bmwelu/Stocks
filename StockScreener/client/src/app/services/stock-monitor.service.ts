import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class StockMonitorService {
    constructor(private http: Http) {
    }

    getStocks(stocks: string[]) {
         return this.http.get('http://localhost:8000/stocks/' + stocks)
         .map(res => res.json())
         .catch(res => Observable.throw(res.json()));
    }

    getStock(ticker: string) {
        return this.http.get('http://localhost:8000/stocks/' + ticker)
        .map(res => res.json())
        .catch(res => Observable.throw(res.json()));
    }

    getStockTimeSeriesData(ticker: string, interval: number) {
        return this.http.get('http://localhost:8000/stocks/' + ticker + '/timeseries-data/' + interval)
        .map(res => res.json())
        .catch(res => Observable.throw(res.json()));
    }

    getMonitoredStocks() {
        return this.http.get('http://localhost:8000/stocks/watchlist/')
        .map(res => res.json())
        .catch(res => Observable.throw(res.json()));
    }

    getSuggestedStocks(searchString: string) {
        return this.http.get('http://localhost:8000/stocks/suggested-stocks/' + searchString)
        .map(res => res.json())
        .catch(res => Observable.throw(res.json()));
    }
}
