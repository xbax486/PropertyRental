import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tenant } from 'src/app/models/tenant';
import { TenantService } from 'src/app/services/tenant.service';

@Component({
  selector: 'app-tenant-table',
  templateUrl: './tenant-table.component.html',
  styleUrls: ['./tenant-table.component.css']
})
export class TenantTableComponent implements OnInit, OnDestroy {
  public tenants: Tenant[] = [];
  public tenantsLoaded = false;
  
  private _getTenantsSubscription = new Subscription();
  private _deleteTenantSubscription = new Subscription();

  constructor(private _tenantService: TenantService) { }

  ngOnInit() {
    this.tenantsLoaded = false;
    this._getTenantsSubscription = this._tenantService.getTenants()
      .subscribe(
        (tenants: Tenant[]) => {
          this.tenants = tenants;
          this.tenantsLoaded = true;
        },
        (error) => console.log('Tenants fetching error', error)
      );
  }

  ngOnDestroy() {
    this._getTenantsSubscription.unsubscribe();
    this._deleteTenantSubscription.unsubscribe();
  }

  onEditTenant(tenant) {
    this._tenantService.selectedTenantSubject.next(tenant);
  }

  onDeleteTenant(selectedTenant: Tenant) {
    if(window.confirm('Do you really want to delete this suburb?')) {
      this._deleteTenantSubscription = this._tenantService.deleteTenant(selectedTenant.id)
        .subscribe(
          () => {
            let index = this.tenants.findIndex(tenant => tenant.id == selectedTenant.id);
            this.tenants.splice(index, 1);
            console.log('Successfully delete an tenant');
          },
          (error) => console.log('Tenant deletion error', error)
        );
    }
  }
}
