import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Suburb } from "../models/suburb";

@Injectable({
  providedIn: 'root'
})
export class SuburbService {
  public selectedSuburbSubject = new BehaviorSubject({});

  constructor(private _httpClient: HttpClient) { }

  public getSuburbs() {
    return this._httpClient.get<Suburb[]>('/api/suburbs');
  }

  public createSuburb(suburb: Suburb) {
    return this._httpClient.post<Suburb>('/api/suburbs', suburb);
  }

  public updateSuburb(suburb: Suburb) {
    return this._httpClient.put<Suburb>('/api/suburbs/' + suburb.id, suburb);
  }
}
