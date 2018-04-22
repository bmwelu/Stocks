import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Sector } from '../../_shared/models/sector';

@Injectable()
export class SectorMonitorService {
    constructor(private httpClient: HttpClient) { }

    public getSectorInfo(): Observable<Sector[]> {
        return this.httpClient.get<Sector[]>(`${environment.apiURL}sectors/`);
    }
}
