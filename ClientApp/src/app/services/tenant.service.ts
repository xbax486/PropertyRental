import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { Tenant } from "../models/tenant";

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  public selectedTenantSubject = new BehaviorSubject({ name: '', email: '', mobile: '', id: -1 });

  constructor(private _httpClient: HttpClient) { }

  public getTenants() {
    return this._httpClient.get<Tenant[]>('/api/tenants');
  }

  public getAvailableTenants() {
    return this._httpClient.get<Tenant[]>('/api/tenants?available=true');
  }

  public getTenant(id: number) {
    return this._httpClient.get<Tenant>('/api/tenants/' + id);
  }

  public createTenant(tenant: Tenant) {
    return this._httpClient.post<Tenant>('/api/tenants', tenant);
  }

  public updateTenant(tenant: Tenant) {
    return this._httpClient.put<Tenant>('/api/tenants/' + tenant.id, tenant);
  }

  public deleteTenant(id: number) {
    return this._httpClient.delete<Tenant>('/api/tenants/' + id);
  }
}
