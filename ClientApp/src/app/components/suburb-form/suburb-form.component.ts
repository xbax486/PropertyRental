import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs';
import { SuburbService } from './../../services/suburb.service';
import { Suburb } from './../../models/suburb';

@Component({
  selector: 'app-suburb-form',
  templateUrl: './suburb-form.component.html',
  styleUrls: ['./suburb-form.component.css']
})
export class SuburbFormComponent implements OnInit, OnDestroy {
  private _selectedSuburbSubscription = new Subscription();
  private _createSuburbSubscription = new Subscription();
  private _updateSuburbSubscription = new Subscription();

  public selectedSuburb:Suburb = { name: "", postcode: -1, state: "", abbreviation: "", id: -1 };

  constructor(
    private _suburbService: SuburbService, 
    private _router: Router) { }

  ngOnInit() {
    this._selectedSuburbSubscription = this._suburbService.selectedSuburbSubject
      .subscribe(
        (selectedSuburb: Suburb) => this.selectedSuburb = selectedSuburb,
        (error) => console.log('Selected suburb fetching error', error)
      );
  }

  ngOnDestroy() {
    this.clearFields();
    this._selectedSuburbSubscription.unsubscribe();
    this._createSuburbSubscription.unsubscribe();
    this._updateSuburbSubscription.unsubscribe();
  }

  onSubmit(suburbForm: NgForm) {
    var suburbDetails = suburbForm.form.value;
    if(suburbForm.form.valid && !suburbDetails.id) {
      this._createSuburbSubscription = this._suburbService.createSuburb(suburbDetails)
        .subscribe(
          (message) => {
            console.log('Successfully created a suburb', message);
            this.navigateToSuburbs(suburbForm);
          },
          (error) => console.log('Create a suburb fails', error)
        );
    }
    else if(suburbForm.form.valid && suburbDetails.id) {
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
    this.selectedSuburb.name = '';
    this.selectedSuburb.postcode = 1000;
    this.selectedSuburb.state = '';
    this.selectedSuburb.abbreviation = '';
  }
}
