import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SuburbService } from './../../services/suburb.service';
import { Suburb } from './../../models/suburb';

@Component({
  selector: 'app-suburb-form',
  templateUrl: './suburb-form.component.html',
  styleUrls: ['./suburb-form.component.css']
})
export class SuburbFormComponent implements OnInit, OnDestroy {
  public selectedSuburb = {};
  private _selectedSuburbSubscription = new Subscription();

  constructor(private _suburbService: SuburbService) { }

  ngOnInit() {
    this._selectedSuburbSubscription = this._suburbService.selectedSuburbSubject
      .subscribe(
        (selectedSuburb: Suburb) => this.selectedSuburb = selectedSuburb,
        (error) => console.log('Selected suburb fetching error', error)
      );
  }

  ngOnDestroy() {
    this._selectedSuburbSubscription.unsubscribe();
  }

  onSubmitSuburb() {
    //this._suburbService.
  }
}
