import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TenantService } from './../../services/tenant.service';
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

  constructor(private _tenantService: TenantService, private _router: Router) { }

  ngOnInit() {
    this._selectedTenantSubscription = this._tenantService.selectedTenantSubject
      .subscribe(
        (selectedTenant: Tenant) => this.selectedTenant = selectedTenant,
        (error) => console.log('Selected tenant fetching error', error)
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
          (message) => {
            console.log('Successfully created a tenant', message);
            this.navigateToTable(tenantForm);
          },
          (error) => console.log('Create a tenant fails', error)
        );
    }
    else {
      this._updateTenantSubscription = this._tenantService.updateTenant(tenantDetails)
        .subscribe(
          (message) => {
            console.log('Successfully updated a tenant', message);
            this.navigateToTable(tenantForm);
          },
          (error) => console.log('Update a tenant fails', error)
        );
    }
  }

  public onCancel() {
    this._router.navigate(['tenants']);
  }

  public onClear(tenantForm: NgForm) {
    tenantForm.reset();
  }

  private navigateToTable(tenantForm) {
    tenantForm.reset();
    this._router.navigate(['tenants']);
  }

  private clearForm() {
    this.selectedTenant.id = -1;
    this.selectedTenant.name = '';
    this.selectedTenant.email = '';
    this.selectedTenant.mobile = '';
  }
}
