import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../_api/services/login.service';
import { SubscriberEntity } from '../_core/subscriber-entity';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends SubscriberEntity {
  constructor(private router: Router,
              private loginService: LoginService,
              private toastr: ToastsManager) {super(); }

  public login(form: NgForm): void {
    this.loginService.Login(form.value)
    .subscribe(response => {
      localStorage.setItem('jwt', (<any>response).token);
      this.router.navigate(['/']);
    }, err => {
        if (err.status === 401) {
            this.toastr.error('Invalid username or password!', 'Error!');
        } else {
            this.toastr.error('Server Error', 'Error!');
        }
    });
  }
}


