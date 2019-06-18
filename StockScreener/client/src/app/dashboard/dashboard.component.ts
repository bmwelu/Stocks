import { Component} from '@angular/core';
import { AuthGuard } from '../_api/services/auth-guard.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
   constructor(public auth: AuthGuard) {
   }
}
