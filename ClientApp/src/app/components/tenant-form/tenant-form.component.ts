import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TenantService } from './../../services/tenant.service';
import { ToastService } from "../../services/toast.service";
import { Tenant } from './../../models/tenant';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.css']
})
export class TenantFormComponent implements OnInit, OnDestroy {
  public selectedTenant = { name: '', email: '', mobile: '', id: -1 };

  private _selectedTenantSubscription = new Subscription();
  private _createTenantSubscription = new Subscription();
  private _updateTenantSubscription = new Subscription();

  constructor(
    private _tenantService: TenantService, 
    private _toastService: ToastService,
    private _router: Router) { }

  ngOnInit() {
    this._selectedTenantSubscription = this._tenantService.selectedTenantSubject
      .subscribe(
        (selectedTenant: Tenant) => this.selectedTenant = selectedTenant,
        (error) => this._toastService.onErrorCall(error, 'Selected tenant fetching error')
      );
  }

  ngOnDestroy() {
    this.clearForm();
    this._selectedTenantSubscription.unsubscribe();
    this._createTenantSubscription.unsubscribe();
    this._updateTenantSubscription.unsubscribe();
  }

  public onSubmit(tenantForm: NgForm) {
    let tenantDetails = tenantForm.form.value;
    tenantDetails.id = this.selectedTenant.id;
    if(tenantDetails.id == -1) {
      this._createTenantSubscription = this._tenantService.createTenant(tenantDetails)
        .subscribe(
          (message) => this._toastService.onSuccessCall('Successfully created a tenant', tenantForm, 'tenants'),
          (error) => this._toastService.onErrorCall(error)
        );
    }
    else {
      this._updateTenantSubscription = this._tenantService.updateTenant(tenantDetails)
        .subscribe(
          (message) => this._toastService.onSuccessCall('Successfully updated a tenant', tenantForm, 'tenants'),
          (error) => this._toastService.onErrorCall(error)
        );
    }
  }

  public onCancel() {
    this._router.navigate(['tenants']);
  }

  public onClear(tenantForm: NgForm) {
    tenantForm.reset();
  }

  private clearForm() {
    this.selectedTenant.id = -1;
    this.selectedTenant.name = '';
    this.selectedTenant.email = '';
    this.selectedTenant.mobile = '';
  }
}
