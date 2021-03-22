import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private _toastyService:ToastyService, private _toastyConfig: ToastyConfig, private _router: Router) {
    this._toastyConfig.theme = 'bootstrap';
  }

  public addToast(title, httpResponse, form?: NgForm, navigatPath?: string) {
    var toastOptions:ToastOptions = {
      title: title,
      msg: '',
      showClose: true,
      timeout: 2000,
      onRemove: () => {
        if(form && navigatPath) {
          this.navigateToTable(form, navigatPath);
        }
      }
    };
    if(httpResponse.status && httpResponse.status == 400) {
      toastOptions.msg = httpResponse.error.Message;
      this._toastyService.error(toastOptions);
    }
    else if(httpResponse.status && httpResponse.status == 200) {
      toastOptions.msg = httpResponse.message;
      this._toastyService.success(toastOptions);
    }
  }

  private navigateToTable(form: NgForm, navigatPath: string) {
    form.reset();
    this._router.navigate([navigatPath]);
  }
}