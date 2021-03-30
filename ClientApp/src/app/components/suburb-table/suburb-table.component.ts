import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Suburb } from 'src/app/models/suburb';
import { SuburbService } from 'src/app/services/suburb.service';
import { ToastService } from "../../services/toast.service";
import { SuburbQuery } from "../../models/query/suburbQuery";
import { QueryResult } from '../../models/query/queryResult';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-suburb-table',
  templateUrl: './suburb-table.component.html',
  styleUrls: ['./suburb-table.component.css']
})
export class SuburbTableComponent implements OnInit, OnDestroy {
  private readonly DEFAULT_PAGE = 1;
  private readonly DEFAULT_PAGE_SIZE = 5;
  public query: SuburbQuery = { postcode: '', stateId: -1, sortBy: '', isSortedAscending: true, page: this.DEFAULT_PAGE, pageSize: this.DEFAULT_PAGE_SIZE };
  public queryResult = {};
  public propertiesLoaded = false;
  public suburbsLoaded = false;

  public suburbs: Suburb[] = [];
  public filteredSuburbs: Suburb[] = [];

  public columns = [
    { title: 'Name', key: 'name', isSortable: true },
    { title: 'Postcode', key: 'postcode', isSortable: true },
    { title: 'State', key: 'state', isSortable: true },
    { title: 'Abbreviation' },
    { title: 'Actions' }
  ];

  public faSortUp = faSortUp;
  public faSortDown = faSortDown;

  private _getSuburbsSubscription = new Subscription();
  private _deleteSuburbSubscription = new Subscription();

  constructor(private _suburbService: SuburbService, private _toastService: ToastService) { }

  ngOnInit() {
    this.suburbsLoaded = false;
    this.getFilteredSuburbs();
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
            this._toastService.onSuccessCall('Successfully delete a suburb');
          },
          (error) => this._toastService.onErrorCall(error, 'Suburb deletion error')
        );
    }
  }

  onStateChange() {
    this.query.postcode = '';
    this.query.stateId = +this.query.stateId;
    this.onFilterChanged();
  }

  onPostcodeChange() {
    this.query.stateId = -1;
    this.query.postcode = this.query.postcode;
    this.onFilterChanged();
  }

  onResetFilter() {
    this.query = { postcode: '', stateId: -1, sortBy: '', isSortedAscending: true, page: this.DEFAULT_PAGE, pageSize: this.DEFAULT_PAGE_SIZE };
    this.onFilterChanged();
  }

  sortBy(column) {
    if(this.query.sortBy === column) {
      this.query.isSortedAscending = !this.query.isSortedAscending;
    }
    else {
      this.query.sortBy = column;
      this.query.isSortedAscending = true;
    }
    this.getFilteredSuburbs();
  }

  onPageChanged(page) {
    this.query.page = page;
    this.getFilteredSuburbs();
  }

  private onFilterChanged() {
    this.query.page = 1;
    this.getFilteredSuburbs();
  }

  private getFilteredSuburbs() {
    this._getSuburbsSubscription = this._suburbService.getSuburbs(this.query)
      .subscribe(
        (queryResult: QueryResult<Suburb>) => {
          this.queryResult = queryResult;
          this.suburbs = queryResult.items;
          this.suburbsLoaded = true;
        },
        (error) => this._toastService.onErrorCall(error, 'Suburbs fetching error')
      );
  }
}
