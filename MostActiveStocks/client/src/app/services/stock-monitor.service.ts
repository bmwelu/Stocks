import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class StockMonitorService{
    constructor(private http:Http){
    }

    getStocks(){
         return this.http.get('http://localhost:8000/stocks/')
         .map(res => res.json())
         .catch(res => Observable.throw(res.json()))
    }

    getStock(ticker: string){
        return this.http.get('http://localhost:8000/stocks/' + ticker)
        .map(res => res.json())
        .catch(res => Observable.throw(res.json()))
    }

    getMonitoredStocks(){
        return this.http.get('http://localhost:8000/stocks/watchlist/')
        .map(res => res.json())
        .catch(res => Observable.throw(res.json()))
    }
}