import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class SubscriberEntity implements OnDestroy  {
    public destroyed = new Subject();
    public ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }
}
