import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Property } from "../models/property";
import { PropertyType } from "../models/propertyType";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  public selectedPropertySubject = new BehaviorSubject({});

  constructor(private _httpClient: HttpClient) { }

  public getProperties() {
    return this._httpClient.get<Property[]>('/api/properties');
  }

  public getPropertyTypes() {
    return this._httpClient.get<PropertyType[]>('/api/propertytypes');
  }
}