import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Owner } from "./../../models/owner";
import { OwnerService } from "./../../services/owner.service";
import { ToastService } from "../../services/toast.service";
import { CustomAuthService } from "../../services/custom.auth.service";

@Component({
  selector: "app-owner-form",
  templateUrl: "./owner-form.component.html",
  styleUrls: ["./owner-form.component.css"],
})
export class OwnerFormComponent implements OnInit, OnDestroy {
  public selectedOwner = { name: "", email: "", mobile: "", id: -1 };

  private _selectedOwnerSubscription = new Subscription();
  private _createOwnerSubscription = new Subscription();
  private _updateOwnerSubscription = new Subscription();

  @ViewChild(NgForm) ngForm: NgForm;

  constructor(
    private _ownerService: OwnerService,
    private _toastService: ToastService,
    private _customAuthService: CustomAuthService
  ) {}

  ngOnInit() {
    this.getSelectedOwner();
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
    if (ownerDetails.id == -1) {
      this._createOwnerSubscription = this._ownerService
        .createOwner(ownerDetails)
        .subscribe(
          (message) =>
            this._toastService.onSuccessCall(
              "Successfully created an owner",
              ownerForm,
              "owners"
            ),
          (error) => this._toastService.onErrorCall(error)
        );
    } else {
      this._updateOwnerSubscription = this._ownerService
        .updateOwner(ownerDetails)
        .subscribe(
          (message) =>
            this._toastService.onSuccessCall(
              "Successfully updated an owner",
              ownerForm,
              "owners"
            ),
          (error) => this._toastService.onErrorCall(error)
        );
    }
  }

  public onCancel() {
    this._customAuthService.navigateTo("owners");
  }

  public onClear(ownerForm: NgForm) {
    ownerForm.reset();
  }

  private clearForm() {
    this.selectedOwner.id = -1;
    this.selectedOwner.name = "";
    this.selectedOwner.email = "";
    this.selectedOwner.mobile = "";
  }

  private getSelectedOwner() {
    this._selectedOwnerSubscription = this._ownerService.selectedOwnerSubject.subscribe(
      (selectedOwner: Owner) => (this.selectedOwner = selectedOwner),
      (error) =>
        this._toastService.onErrorCall(error, "Selected owner fetching error")
    );
  }
}
