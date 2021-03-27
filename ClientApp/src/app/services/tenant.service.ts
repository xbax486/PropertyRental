import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { Tenant } from "../models/tenant";
import { TenantFilter } from "../models/tenantFilter";

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  public selectedTenantSubject = new BehaviorSubject({ name: '', email: '', mobile: '', id: -1 });
  private readonly _tenantEndpoint = '/api/tenants';

  constructor(private _httpClient: HttpClient) { }

  public getTenants(filter: TenantFilter) {
    return this._httpClient.get<Tenant[]>(this._tenantEndpoint + this.toQueryString(filter));
  }

  public getAvailableTenants() {
    return this._httpClient.get<Tenant[]>('/api/tenants?available=true');
  }

  public createTenant(tenant: Tenant) {
    return this._httpClient.post<Tenant>(this._tenantEndpoint, tenant);
  }

  public updateTenant(tenant: Tenant) {
    return this._httpClient.put<Tenant>(this._tenantEndpoint + '/' +  tenant.id, tenant);
  }

  public deleteTenant(id: number) {
    return this._httpClient.delete<Tenant>(this._tenantEndpoint + '/' +  id);
  }

  private toQueryString(filter: TenantFilter) {
    let parts = [];
    for(let property in filter) {
      let value = filter[property];
      if(value == 1) {
        value = 'true';
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }
    return parts.length == 0 ? '' : '?' + parts.join('&');
  }
}
