import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Owner } from "../models/owner";

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private _httpClient: HttpClient) { }

  public getOwners() {
    return this._httpClient.get<Owner[]>('/api/owners');
  }

  public getOwner(id: number) {
    return this._httpClient.get<Owner>('/api/owners/' + id);
  }
}
