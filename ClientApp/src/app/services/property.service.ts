import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Property } from '../models/property';
import { PropertyType } from '../models/propertyType';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  public selectedPropertySubject = new BehaviorSubject({ 
    owner: { name: '' },
    ownerId: -1,
    suburb: { state: { name: '' } },  
    suburbId: -1,
    propertyType: { name: ''},
    propertyTypeId: -1,
    bedroom: 0,
    bathroom: 0,
    parking: 0,
    petsAllowed: false,
    builtInWardrobe: false,
    gasAvailable: false,
    hasStudyRoom: false,
    furnished: false,
    available: true,
    street: '',
    unit: '',
    id: -1
  });
  private readonly _propertyEndpoint = '/api/properties';
  private readonly _propertyTypeEndpoint = '/api/propertytypes';

  constructor(private _httpClient: HttpClient) { }

  public getAllProperties() {
    return this._httpClient.get<Property[]>(this._propertyEndpoint);
  }

  public getAvailableProperties() {
    return this._httpClient.get<Property[]>(this._propertyEndpoint + '?available=true');
  }

  public createProperty(property: Property) {
    return this._httpClient.post<Property>(this._propertyEndpoint, property);
  }

  public updateProperty(property: Property) {
    return this._httpClient.put<Property>(this._propertyEndpoint + '/' + property.id, property);
  }

  public deleteProperty(id: number) {
    return this._httpClient.delete<Property>(this._propertyEndpoint + '/' + id);
  }

  public getPropertyTypes() {
    return this._httpClient.get<PropertyType[]>(this._propertyTypeEndpoint);
  }
}