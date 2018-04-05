import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

@Injectable()
export class ClockService {

  private clock: Observable<number> = Observable.interval(1000).map((tick) => 30 - (tick % 30));

  public getClock(): Observable<number> {
    return this.clock;
  }
}
