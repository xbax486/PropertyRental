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
  }

  public onSubmit(ownerForm: NgForm) {
    let ownerDetails = ownerForm.form.value;
    ownerDetails.id = this.selectedOwner.id;
    console.log('ownerDetails', ownerDetails);
    
  }

  public onCancel() {
    this._router.navigate(['owners']);
  }

  public onClear(ownerForm: NgForm) {
    ownerForm.reset();
  }

  private navigateToOwners(ownerForm) {
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
