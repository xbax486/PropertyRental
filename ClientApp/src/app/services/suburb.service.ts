import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Suburb } from '../models/suburb';
import { State } from '../models/state';

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

  public deleteSuburb(id: number) {
    return this._httpClient.delete<Suburb>('/api/suburbs/' + id);
  }

  public getStates() {
    return this._httpClient.get<State[]>('/api/states');
  }
}
