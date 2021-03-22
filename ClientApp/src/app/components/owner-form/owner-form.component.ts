import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OwnerService } from './../../services/owner.service';
import { Owner } from './../../models/owner';
import { ToastService } from "../../services/toast.service";

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.css']
})
export class OwnerFormComponent implements OnInit, OnDestroy {
  public selectedOwner = { name: '', email: '', mobile: '', id: -1 };

  private _selectedOwnerSubscription = new Subscription();
  private _createOwnerSubscription = new Subscription();
  private _updateOwnerSubscription = new Subscription();

  constructor(
    private _ownerService: OwnerService, 
    private _toastService: ToastService,
    private _router: Router) {}

  ngOnInit() {
    this._selectedOwnerSubscription = this._ownerService.selectedOwnerSubject
      .subscribe(
        (selectedOwner: Owner) => this.selectedOwner = selectedOwner,
        (error) => {
          console.log('Selected owner fetching error', error);
          this.onErrorCall(error, 'Selected owner fetching error');
        }
      );
  }

  ngOnDestroy() {
    this.clearForm();
    this._selectedOwnerSubscription.unsubscribe();
    this._createOwnerSubscription.unsubscribe();
    this._updateOwnerSubscription.unsubscribe();
  }

  public onSubmit(ownerForm: NgForm) {
    let ownerDetails = ownerForm.form.value;
    ownerDetails.id = this.selectedOwner.id;
    if(ownerDetails.id == -1) {
      this._createOwnerSubscription = this._ownerService.createOwner(ownerDetails)
        .subscribe(
          (message) => {
            // console.log('Successfully created an owner', message);
            this.onSuccessCall(ownerForm, 'Successfully created an owner');
          },
          (error) => {
            // console.log('Create an owner fails', error);
            this.onErrorCall(error);
          }
        );
    }
    else {
      this._updateOwnerSubscription = this._ownerService.updateOwner(ownerDetails)
        .subscribe(
          (message) => {
            this.onSuccessCall(ownerForm, 'Successfully updated an owner');
          },
          (error) => {
            // console.log('Update an owner fails', error);
            this.onErrorCall(error);
          }
        );
    }
  }

  public onCancel() {
    this._router.navigate(['owners']);
  }

  public onClear(ownerForm: NgForm) {
    ownerForm.reset();
  }

  private clearForm() {
    this.selectedOwner.id = -1;
    this.selectedOwner.name = '';
    this.selectedOwner.email = '';
    this.selectedOwner.mobile = '';
  }

  private onSuccessCall(ownerForm, message) {
    this._toastService.addToast('Success', { status: 200, message: message }, ownerForm, 'owners');
  }

  private onErrorCall(error, message?) {
    if(message) {
      error.error.Message = message;
    }
    console.log('Update an owner fails', error);
    this._toastService.addToast('Error', error);
  }
}
