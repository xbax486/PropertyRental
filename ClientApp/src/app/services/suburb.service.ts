import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Suburb } from '../models/suburb';
import { State } from '../models/state';
import { SuburbQuery } from "../models/query/suburbQuery";
import { QueryResult } from '../models/query/queryResult';

@Injectable({
  providedIn: 'root'
})
export class SuburbService {
  public selectedSuburbSubject = new BehaviorSubject({ 
    name: '', 
    postcode: '', 
    state: { 
      name: '', 
      acronym: '', 
      id: -1 
    }, 
    stateId: -1, 
    id: -1 
  });
  private readonly _suburbEndpoint = '/api/suburbs';
  private readonly _stateEndpoint = '/api/states';

  constructor(private _httpClient: HttpClient) { }

  public getSuburbs(query) {
    return this._httpClient.get<QueryResult<Suburb>>(this._suburbEndpoint + this.toQueryString(query));
  }

  public createSuburb(suburb: Suburb) {
    return this._httpClient.post<Suburb>(this._suburbEndpoint, suburb);
  }

  public updateSuburb(suburb: Suburb) {
    return this._httpClient.put<Suburb>(this._suburbEndpoint + '/' + suburb.id, suburb);
  }

  public deleteSuburb(id: number) {
    return this._httpClient.delete<any>(this._suburbEndpoint + '/' + id);
  }

  public getStates() {
    return this._httpClient.get<State[]>(this._stateEndpoint);
  }

  private toQueryString(query: SuburbQuery) {
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
