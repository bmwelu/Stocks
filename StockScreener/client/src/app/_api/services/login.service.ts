import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {
    constructor(private httpClient: HttpClient) { }

    public Login(credentials: any): Observable<any> {
        const body = new URLSearchParams();
        body.set('username', credentials.username);
        body.set('password', credentials.password);
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        return this.httpClient.post<any>(`${environment.apiURL}api/auth/login`, body.toString(), httpOptions);
    }
}
