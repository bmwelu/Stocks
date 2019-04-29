import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { News } from '../../_shared/models/news';
import { AuthGuard } from './auth-guard.service';

@Injectable()
export class NewsMonitorService {
    constructor(private httpClient: HttpClient,
                private auth: AuthGuard) { }

    public getNews(): Observable<News[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.auth.getToken()}`
            })
        };
        return this.httpClient.get<News[]>(`${environment.apiURL}api/market/news/`, httpOptions);
    }
}
