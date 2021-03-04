import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Suburb } from "../models/suburb";

@Injectable({
  providedIn: 'root'
})
export class SuburbService {

  constructor(private _httpClient: HttpClient) { }

  public getSuburbs() {
    return this._httpClient.get<Suburb[]>('/api/suburbs');
  }

  public createSuburb(suburb: Suburb) {
    return this._httpClient.post<Suburb[]>('/api/suburbs', suburb);
  }
}
