import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Rental } from '../models/rental';
import { RentalQuery } from "../models/query/rentalQuery";
import { QueryResult } from '../models/query/queryResult';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  public selectedRentalSubject = new BehaviorSubject({ 
    property: { 
      suburb: { state: { name: '' }},
      suburbId: -1,
      owner: {},
      ownerId: -1,
    },
    propertyId: -1,
    tenant: { name: '' },
    tenantId: -1,
    startDate: '',
    endDate: '',
    payment: 0,
    id: -1
  });
  private readonly _propertyEndpoint = '/api/rentals';

  constructor(private _httpClient: HttpClient) { }

  public getRentals(query) {
    return this._httpClient.get<QueryResult<Rental>>(this._propertyEndpoint + this.toQueryString(query));
  }

  public createRental(rental: Rental) {
    return this._httpClient.post<Rental>(this._propertyEndpoint, rental);
  }

  public updateRental(rental: Rental) {
    return this._httpClient.put<Rental>(this._propertyEndpoint + '/' + rental.id, rental);
  }

  public deleteRental(id: number) {
    return this._httpClient.delete<Rental>(this._propertyEndpoint + '/' + id);
  }

  private toQueryString(query: RentalQuery) {
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
