import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { News } from '../../_shared/models/news';

@Injectable()
export class NewsMonitorService {
    constructor(private httpClient: HttpClient) { }

    public getNews(): Observable<News[]> {
        return this.httpClient.get<News[]>(`${environment.apiURL}stocks/news/market`);
    }
}
