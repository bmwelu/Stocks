import { Component, ViewContainerRef  } from '@angular/core';
import { AuthGuard } from '../_api/services/auth-guard.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(public toastr: ToastsManager, vRef: ViewContainerRef, public auth: AuthGuard) {
    this.toastr.setRootViewContainerRef(vRef);
  }
}
