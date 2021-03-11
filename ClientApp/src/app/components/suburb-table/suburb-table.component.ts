import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Suburb } from 'src/app/models/suburb';
import { SuburbService } from 'src/app/services/suburb.service';

@Component({
  selector: 'app-suburb-table',
  templateUrl: './suburb-table.component.html',
  styleUrls: ['./suburb-table.component.css']
})
export class SuburbTableComponent implements OnInit, OnDestroy {
  public suburbs: Suburb[] = [];
  public suburbsLoaded = false;
  private _getSuburbsSubscription = new Subscription();
  private _deleteSuburbSubscription = new Subscription();

  constructor(private _suburbService: SuburbService) { }

  ngOnInit() {
    this.suburbsLoaded = false;
    this._getSuburbsSubscription = this._suburbService.getSuburbs()
      .subscribe(
        (suburbs: Suburb[]) => {
          this.suburbs = suburbs;
          this.suburbsLoaded = true;
        },
        (error) => console.log('Suburbs fetching error', error)
      );
  }

  ngOnDestroy() {
    this._getSuburbsSubscription.unsubscribe();
    this._deleteSuburbSubscription.unsubscribe();
  }

  onEditSuburb(suburb) {
    this._suburbService.selectedSuburbSubject.next(suburb);
  }

  onDeleteSuburb(selectedSuburb: Suburb) {
    if(window.confirm('Do you really want to delete this suburb?')) {
      this._deleteSuburbSubscription = this._suburbService.deleteSuburb(selectedSuburb.id)
        .subscribe(
          () => {
            let index = this.suburbs.findIndex(suburb => suburb.id == selectedSuburb.id);
            this.suburbs.splice(index, 1);
            console.log('Successfully delete a suburb');
          },
          (error) => console.log('Suburb deletion error', error)
        );
    }
  }
}
