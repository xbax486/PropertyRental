import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Rental } from '../models/rental';

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
    payment: -1,
    id: -1
  });

  constructor(private _httpClient: HttpClient) { }

  public getRentals() {
    return this._httpClient.get<Rental[]>('/api/rentals');
  }

  public createRental(rental: Rental) {
    return this._httpClient.post<Rental>('/api/rentals', rental);
  }

  public updateRental(rental: Rental) {
    return this._httpClient.put<Rental>('/api/rentals/' + rental.id, rental);
  }

  public deleteRental(id: number) {
    return this._httpClient.delete<Rental>('/api/rentals/' + id);
  }
}
