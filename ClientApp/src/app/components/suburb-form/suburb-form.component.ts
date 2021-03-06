import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SuburbService } from './../../services/suburb.service';
import { StateService } from './../../services/state.service';
import { Suburb } from './../../models/suburb';
import { State } from './../../models/state';

@Component({
  selector: 'app-suburb-form',
  templateUrl: './suburb-form.component.html',
  styleUrls: ['./suburb-form.component.css']
})
export class SuburbFormComponent implements OnInit, OnDestroy {
  private _selectedSuburbSubscription = new Subscription();
  private _getAllStatesSubscription = new Subscription();
  private _createSuburbSubscription = new Subscription();
  private _updateSuburbSubscription = new Subscription();

  public selectedSuburb:Suburb = { name: '', postcode: -1, state: { name: '', acronym: '', id: -1 }, stateId: -1, id: -1 };
  public states: State[] = [];

  constructor(
    private _suburbService: SuburbService, 
    private _stateService: StateService,
    private _router: Router) { }

  ngOnInit() {
    this._selectedSuburbSubscription = this._suburbService.selectedSuburbSubject
      .subscribe(
        (selectedSuburb: Suburb) => this.selectedSuburb = selectedSuburb,
        (error) => console.log('Selected suburb fetching error', error)
      );
    this._getAllStatesSubscription = this._stateService.getStates()
      .subscribe(
        (states: State[]) => this.states = states,
        (error) => console.log('States fetching error', error)
      );
  }

  ngOnDestroy() {
    this.clearFields();
    this._selectedSuburbSubscription.unsubscribe();
    this._getAllStatesSubscription.unsubscribe();
    this._createSuburbSubscription.unsubscribe();
    this._updateSuburbSubscription.unsubscribe();
  }

  onSubmit(suburbForm: NgForm) {
    var suburbDetails = suburbForm.form.value;
    suburbDetails.stateId = +suburbDetails.stateId;
    suburbDetails.id = this.selectedSuburb.id;
    
    if(suburbDetails.id == -1) {
      this._createSuburbSubscription = this._suburbService.createSuburb(suburbDetails)
        .subscribe(
          (message) => {
            console.log('Successfully created a suburb', message);
            this.navigateToSuburbs(suburbForm);
          },
          (error) => console.log('Create a suburb fails', error)
        );
    }
    else {
      this._updateSuburbSubscription = this._suburbService.updateSuburb(suburbDetails)
        .subscribe(
          (message) => {
            console.log('Successfully updated a suburb', message);
            this.navigateToSuburbs(suburbForm);
          },
          (error) => console.log('Update a suburb fails', error)
        );
    }
  }

  onCancel() {
    this._router.navigate(['suburbs']);
  }

  private navigateToSuburbs(suburbForm) {
    suburbForm.reset();
    this._router.navigate(['suburbs']);
  }

  private clearFields() {
    this.selectedSuburb.id = -1;
    this.selectedSuburb.name = '';
    this.selectedSuburb.postcode = 0;
    this.selectedSuburb.stateId = 0;
  }
}
