import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tenant } from 'src/app/models/tenant';
import { TenantService } from 'src/app/services/tenant.service';
import { ToastService } from "../../services/toast.service";
import { TenantQuery } from "../../models/queries/tenantQuery";
import { QueryResult } from 'src/app/models/queries/queryResult';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tenant-table',
  templateUrl: './tenant-table.component.html',
  styleUrls: ['./tenant-table.component.css']
})
export class TenantTableComponent implements OnInit, OnDestroy {
  private readonly DEFAULT_PAGE = 1;
  private readonly DEFAULT_PAGE_SIZE = 5;

  public tenants: Tenant[] = [];
  public tenantsLoaded = false;
  public query: TenantQuery = { available: -1, sortBy: '', isSortedAscending: true, page: this.DEFAULT_PAGE, pageSize: this.DEFAULT_PAGE_SIZE };
  public queryResult = {};

  public columns = [
    { title: 'Name', key: 'name', isSortable: true },
    { title: 'Email', key: 'email', isSortable: true },
    { title: 'Mobile' },
    { title: 'Actions' }
  ];

  public faSortUp = faSortUp;
  public faSortDown = faSortDown;
  
  private _getTenantsSubscription = new Subscription();
  private _deleteTenantSubscription = new Subscription();

  constructor(private _tenantService: TenantService, private _toastService: ToastService) { }

  ngOnInit() {
    this.tenantsLoaded = false;
    this.getTenants();
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
            this._toastService.onSuccessCall('Successfully delete a tenant');
          },
          (error) => this._toastService.onErrorCall(error, 'Tenant deletion error')
        );
    }
  }

  sortBy(column) {
    if(this.query.sortBy === column) {
      this.query.isSortedAscending = !this.query.isSortedAscending;
    }
    else {
      this.query.sortBy = column;
      this.query.isSortedAscending = true;
    }
    this.getTenants();
  }

  onPageChanged(page) {
    this.query.page = page;
    this.getTenants();
  }

  private getTenants() {
    this._getTenantsSubscription = this._tenantService.getTenants(this.query)
      .subscribe(
        (queryResult: QueryResult<Tenant>) => {
          this.queryResult = queryResult;
          this.tenants = queryResult.items;
          this.tenantsLoaded = true;
        },
        (error) => this._toastService.onErrorCall(error, 'Tenants fetching error')
      );
  }
}
