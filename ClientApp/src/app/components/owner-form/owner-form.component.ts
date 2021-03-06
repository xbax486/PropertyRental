import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OwnerService } from './../../services/owner.service';
import { Owner } from './../../models/owner';

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

  constructor(private _ownerService: OwnerService, private _router: Router) { }

  ngOnInit() {
    this._selectedOwnerSubscription = this._ownerService.selectedOwnerSubject
      .subscribe(
        (selectedOwner: Owner) => this.selectedOwner = selectedOwner,
        (error) => console.log('Selected owner fetching error', error)
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
            console.log('Successfully created an owner', message);
            this.navigateToTable(ownerForm);
          },
          (error) => console.log('Create an owner fails', error)
        );
    }
    else {
      this._updateOwnerSubscription = this._ownerService.updateOwner(ownerDetails)
        .subscribe(
          (message) => {
            console.log('Successfully updated an owner', message);
            this.navigateToTable(ownerForm);
          },
          (error) => console.log('Update an owner fails', error)
        );
    }
  }

  public onCancel() {
    this._router.navigate(['owners']);
  }

  public onClear(ownerForm: NgForm) {
    ownerForm.reset();
  }

  private navigateToTable(ownerForm) {
    ownerForm.reset();
    this._router.navigate(['owners']);
  }

  private clearForm() {
    this.selectedOwner.id = -1;
    this.selectedOwner.name = '';
    this.selectedOwner.email = '';
    this.selectedOwner.mobile = '';
  }
}
