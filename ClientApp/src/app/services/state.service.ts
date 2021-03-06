import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { State } from "../models/state";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private _httpClient: HttpClient) { }

  public getStates() {
    return this._httpClient.get<State[]>('/api/states');
  }
}
