import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SuburbService } from './../../services/suburb.service';
import { ToastService } from "../../services/toast.service";
import { Suburb } from './../../models/suburb';
import { State } from './../../models/state';

@Component({
  selector: 'app-suburb-form',
  templateUrl: './suburb-form.component.html',
  styleUrls: ['./suburb-form.component.css']
})
export class SuburbFormComponent implements OnInit, OnDestroy {
  public selectedSuburb:Suburb = { name: '', postcode: -1, state: { name: '', acronym: '', id: -1 }, stateId: -1, id: -1 };
  public states: State[] = [];

  private _selectedSuburbSubscription = new Subscription();
  private _getAllStatesSubscription = new Subscription();
  private _createSuburbSubscription = new Subscription();
  private _updateSuburbSubscription = new Subscription();

  constructor(
    private _suburbService: SuburbService, 
    private _toastService: ToastService, 
    private _router: Router) { }

  ngOnInit() {
    this._selectedSuburbSubscription = this._suburbService.selectedSuburbSubject
      .subscribe(
        (selectedSuburb: Suburb) => this.selectedSuburb = selectedSuburb,
        (error) => this._toastService.onErrorCall(error, 'Selected suburb fetching error')
      );
    this._getAllStatesSubscription = this._suburbService.getStates()
      .subscribe(
        (states: State[]) => this.states = states,
        (error) => this._toastService.onErrorCall(error, 'States fetching error')
      );
  }

  ngOnDestroy() {
    this.clearForm();
    this._selectedSuburbSubscription.unsubscribe();
    this._getAllStatesSubscription.unsubscribe();
    this._createSuburbSubscription.unsubscribe();
    this._updateSuburbSubscription.unsubscribe();
  }

  public onSubmit(suburbForm: NgForm) {
    let suburbDetails = suburbForm.form.value;
    suburbDetails.id = this.selectedSuburb.id;
    suburbDetails.stateId = +suburbDetails.stateId;
    if(suburbDetails.id == -1) {
      this._createSuburbSubscription = this._suburbService.createSuburb(suburbDetails)
        .subscribe(
          (message) => this._toastService.onSuccessCall('Successfully created a suburb', suburbForm, 'suburbs'),
          (error) => this._toastService.onErrorCall(error)
        );
    }
    else {
      this._updateSuburbSubscription = this._suburbService.updateSuburb(suburbDetails)
        .subscribe(
          (message) => this._toastService.onSuccessCall('Successfully updated a suburb', suburbForm, 'suburbs'),
          (error) => this._toastService.onErrorCall(error)
        );
    }
  }

  public onCancel() {
    this._router.navigate(['suburbs']);
  }

  public onClear(suburbForm: NgForm) {
    suburbForm.reset();
  }

  private clearForm() {
    this.selectedSuburb.id = -1;
    this.selectedSuburb.name = '';
    this.selectedSuburb.postcode = -1;
    this.selectedSuburb.stateId = -1;
  }
}
