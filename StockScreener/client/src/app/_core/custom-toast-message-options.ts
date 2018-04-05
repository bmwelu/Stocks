import {ToastOptions} from 'ng2-toastr';

export class CustomToastOptions extends ToastOptions {
  positionClass = 'toast-top-center';
  toastLife = 2500;
}
