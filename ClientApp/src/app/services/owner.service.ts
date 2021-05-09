import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { Owner } from "../models/owner";
import { OwnerQuery } from "../models/query/ownerQuery";
import { QueryResult } from '../models/query/queryResult';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  public selectedOwnerSubject = new BehaviorSubject({ name: '', email: '', mobile: '', id: -1 });
  private readonly _ownerEndpoint = '/api/owners';

  constructor(private _httpClient: HttpClient) { }

  public getOwners(query) {
    return this._httpClient.get<QueryResult<Owner>>(this._ownerEndpoint + this.toQueryString(query));
  }

  public createOwner(owner: Owner) {
    return this._httpClient.post<Owner>(this._ownerEndpoint, owner);
  }

  public updateOwner(owner: Owner) {
    return this._httpClient.put<Owner>(this._ownerEndpoint + '/' + owner.id, owner);
  }

  public deleteOwner(id: number) {
    return this._httpClient.delete<any>(this._ownerEndpoint + '/' + id);
  }

  private toQueryString(query: OwnerQuery) {
    let parts = [];
    for(let property in query) {
      let value = query[property];
      if(value != null && value != undefined && value != -1) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }
    return parts.length == 0 ? '' : '?' + parts.join('&');
  }
}
