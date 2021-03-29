import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { Tenant } from "../models/tenant";
import { TenantQuery } from "../models/queries/tenantQuery";
import { QueryResult } from '../models/queries/queryResult';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  public selectedTenantSubject = new BehaviorSubject({ name: '', email: '', mobile: '', id: -1 });
  private readonly _tenantEndpoint = '/api/tenants';

  constructor(private _httpClient: HttpClient) { }

  public getTenants(query) {
    return this._httpClient.get<QueryResult<Tenant>>(this._tenantEndpoint + this.toQueryString(query));
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

  private toQueryString(query: TenantQuery) {
    let parts = [];
    for(let property in query) {
      let value = query[property];
      if(value != null && value != undefined && value != -1) {
        if(property == 'available' && value == 0) {
          value = 'false';
        }
        else if(property == 'available' && value == 1) {
          value = 'true';
        }
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }
    return parts.length == 0 ? '' : '?' + parts.join('&');
  }
}
