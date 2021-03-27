import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { Owner } from "../models/owner";

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  public selectedOwnerSubject = new BehaviorSubject({ name: '', email: '', mobile: '', id: -1 });

  constructor(private _httpClient: HttpClient) { }

  public getOwners() {
    return this._httpClient.get<Owner[]>('/api/owners');
  }

  public createOwner(owner: Owner) {
    return this._httpClient.post<Owner>('/api/owners', owner);
  }

  public updateOwner(owner: Owner) {
    return this._httpClient.put<Owner>('/api/owners/' + owner.id, owner);
  }

  public deleteOwner(id: number) {
    return this._httpClient.delete<Owner>('/api/owners/' + id);
  }
}
