import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private _toastyService:ToastyService, private _toastyConfig: ToastyConfig, private _router: Router) {
    this._toastyConfig.theme = 'bootstrap';
  }

  public onSuccessCall(message: string, form?: NgForm, navigateTo?: string) {
    this.addToast('Success', { status: 200, message: message }, form, navigateTo);
  }

  public onErrorCall(error, message?: string) {
    if(message)
      error.error.Message = message;
    this.addToast('Error', error);
  }

  public addToast(title, httpResponse, form?: NgForm, navigateTo?: string) {
    var toastOptions:ToastOptions = {
      title: title,
      msg: '',
      showClose: true,
      timeout: 2000,
      onRemove: () => {
        if(form && navigateTo) {
          form.reset();
          this._router.navigate([navigateTo]);
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
}