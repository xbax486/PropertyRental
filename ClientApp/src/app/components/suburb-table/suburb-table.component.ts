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
  private _subscription = new Subscription();

  constructor(private _suburbService: SuburbService) { }

  ngOnInit() {
    this.suburbsLoaded = false;
    this._subscription = this._suburbService.getSuburbs()
      .subscribe(
        (suburbs: Suburb[]) => {
          this.suburbs = suburbs;
          this.suburbsLoaded = true;
        },
        (error) => console.log('Suburbs fetching error', error)
      );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  onEditSuburb(suburb) {
    this._suburbService.selectedSuburbSubject.next(suburb);
  }
}
