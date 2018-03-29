import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class ClockService {

  private clock: Observable<number>;

  constructor() {
    this.clock = Observable.interval(1000).map(tick => 30 - (tick % 30));
  }

  getClock(): Observable<number> {
    return this.clock;
  }
}