import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Sector } from '../../_shared/models/sector';
import { AuthGuard } from './auth-guard.service';

@Injectable()
export class SectorMonitorService {
    constructor(private httpClient: HttpClient,
                private auth: AuthGuard) { }

    public getSectorInfo(): Observable<Sector[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${this.auth.getToken()}`
            })
        };
        return this.httpClient.get<Sector[]>(`${environment.apiURL}api/sectors/`, httpOptions);
    }
}
