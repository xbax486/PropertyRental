import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Suburb } from 'src/app/models/suburb';
import { State } from './../../models/state';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import { SuburbService } from './../../services/suburb.service';
import { ToastService } from "../../services/toast.service";
import { RentalQuery } from "../../models/query/rentalQuery";
import { QueryResult } from 'src/app/models/query/queryResult';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rental-table',
  templateUrl: './rental-table.component.html',
  styleUrls: ['./rental-table.component.css']
})
export class RentalTableComponent implements OnInit, OnDestroy {
  private readonly DEFAULT_PAGE = 1;
  private readonly DEFAULT_PAGE_SIZE = 5;
  private readonly DEFAULT_MIN_RENT = 100;
  private readonly DEFAULT_MAX_RENT = 1000;

  public query: RentalQuery = { 
    stateId: -1, 
    suburbId: -1, 
    minimumRent: this.DEFAULT_MIN_RENT, 
    maximumRent: this.DEFAULT_MAX_RENT, 
    startDate: '',
    endDate: '',
    sortBy: '', 
    isSortedAscending: true, 
    page: this.DEFAULT_PAGE, 
    pageSize: this.DEFAULT_PAGE_SIZE 
  };
  public queryResult = {};
  public rentalsLoaded = false;

  public rentals: Rental[] = [];
  public suburbs: Suburb[] = [];
  public states: State[] = [];
  public filteredSuburbs: Suburb[] = [];

  public columns = [
    { title: 'Owner', key: 'owner', isSortable: true },
    { title: 'Tenant', key: 'email', isSortable: true },
    { title: 'Suburb', key: 'suburb', isSortable: true },
    { title: 'State', key: 'state', isSortable: true },
    { title: 'Payment per week(AU$)', key: 'payment', isSortable: true },
    { title: 'Start Date' },
    { title: 'End Date' },
    { title: 'Actions' }
  ];

  public faSortUp = faSortUp;
  public faSortDown = faSortDown;
  
  private _getRentalsSubscription = new Subscription();
  private _deleteRentalSubscription = new Subscription();
  private _suburbsSubscription = new Subscription();
  private _statesSubscription = new Subscription();

  constructor(private _rentalService: RentalService, private _suburbService: SuburbService, private _toastService: ToastService) { }

  ngOnInit() {
    this.rentalsLoaded = false;
    this.getFilteredRentals();
    this.getSuburbs();
    this.getStates();
  }

  public ngOnDestroy() {
    this._getRentalsSubscription.unsubscribe();
    this._deleteRentalSubscription.unsubscribe();
    this._suburbsSubscription.unsubscribe();
    this._statesSubscription.unsubscribe();
  }

  public onEditRental(rental) {
    this._rentalService.selectedRentalSubject.next(rental);
  }

  public onDeleteRental(selectedRental: Rental) {
    if(window.confirm('Do you really want to delete this rental record?')) {
      this._deleteRentalSubscription = this._rentalService.deleteRental(selectedRental.id)
        .subscribe(
          () => {
            let index = this.rentals.findIndex(rental => rental.id == selectedRental.id);
            this.rentals.splice(index, 1);
            this._toastService.onSuccessCall('Successfully delete a rental record');
          },
          (error) => this._toastService.onErrorCall(error, 'Rental record deletion error')
        );
    }
  }

  onStateChange() {
    this.query.suburbId = -1;
    this.query.stateId = +this.query.stateId;
    this.filteredSuburbs = [...this.suburbs];
    if(this.query.stateId && this.query.stateId != -1) {
      this.filteredSuburbs = [...this.filteredSuburbs.filter((suburb: Suburb) => suburb.stateId == this.query.stateId)];
    }
    this.onFilterChanged();
  }

  onSuburbChange() {
    this.query.suburbId = +this.query.suburbId;
    this.onFilterChanged();
  }

  onRentChange() {
    this.query.minimumRent = +this.query.minimumRent;
    this.query.maximumRent = +this.query.maximumRent;
    if(this.query.minimumRent != 0 && this.query.maximumRent != 0 && this.query.minimumRent <= this.query.maximumRent) {
      this.sortBy('payment', true);
    }
    else {
      this._toastService.onErrorCall({ status: 400, error: { Message: '' } }, 'Payment range minimum cannot be greater than its maximum!');
    }
  }

  onDateChange() {
    let startDate: Date = new Date(this.query.startDate);
    let endDate: Date = new Date(this.query.endDate);
    if(this.query.startDate != '' && this.query.endDate != '' && startDate.getTime() <= endDate.getTime()) {
      this.sortBy('payment', true);
    }
    else {
      this._toastService.onErrorCall({ status: 400, error: { Message: '' } }, 'Rental start date cannot be later than its end date!');
    }
  }

  onResetFilter() {
    this.query = { 
      stateId: -1, 
      suburbId: -1, 
      minimumRent: this.DEFAULT_MIN_RENT, 
      maximumRent: this.DEFAULT_MAX_RENT,
      startDate: '',
      endDate: '',
      sortBy: '', 
      isSortedAscending: true, 
      page: this.DEFAULT_PAGE, 
      pageSize: this.DEFAULT_PAGE_SIZE 
    };
    this.onStateChange();
  }

  sortBy(column, isSortedAscending?: boolean) {
    if(this.query.sortBy === column) {
      this.query.isSortedAscending = isSortedAscending ? isSortedAscending : !this.query.isSortedAscending;
    }
    else {
      this.query.sortBy = column;
      this.query.isSortedAscending = true;
    }
    this.getFilteredRentals();
  }

  onPageChanged(page) {
    this.query.page = page;
    this.getFilteredRentals();
  }

  private onFilterChanged() {
    this.query.page = 1;
    this.getFilteredRentals();
  }

  private updateDateTimeFormat(datetime: string) {
    return datetime.substr(0, 10);
  }

  private getFilteredRentals() {
    this._getRentalsSubscription = this._rentalService.getRentals(this.query)
      .subscribe(
        (queryResult: QueryResult<Rental>) => {
          this.queryResult = queryResult;
          this.rentals = queryResult.items;
          this.rentals.forEach(rental => {
            rental.startDate = this.updateDateTimeFormat(rental.startDate);
            rental.endDate = this.updateDateTimeFormat(rental.endDate);
          });
          this.rentalsLoaded = true;
        },
        (error) => this._toastService.onErrorCall(error, 'Rentals fetching error')
      );
  }

  private getSuburbs() {
    this._suburbsSubscription = this._suburbService.getSuburbs({})
      .subscribe(
        (queryResult: QueryResult<Suburb>) => {
          this.queryResult = queryResult;
          this.suburbs = queryResult.items;
          this.filteredSuburbs = [...this.suburbs];
        },
        (error) => this._toastService.onErrorCall(error, 'Suburbs fetching error')
      );
  }

  private getStates() {
    this._statesSubscription = this._suburbService.getStates()
      .subscribe(
        (states: State[]) => this.states = states,
        (error) => this._toastService.onErrorCall(error, 'States fetching error')
      );
  }
}
