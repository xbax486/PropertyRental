import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
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
  public query: RentalQuery = { sortBy: '', isSortedAscending: true, page: this.DEFAULT_PAGE, pageSize: this.DEFAULT_PAGE_SIZE };
  public queryResult = {};
  public rentalsLoaded = false;

  public rentals: Rental[] = [];

  public columns = [
    { title: 'Owner', key: 'owner', isSortable: true },
    { title: 'Tenant', key: 'email', isSortable: true },
    { title: 'Payment per week(AU$)' },
    { title: 'Start Date' },
    { title: 'End Date' },
    { title: 'Actions' }
  ];

  public faSortUp = faSortUp;
  public faSortDown = faSortDown;
  
  private _getRentalsSubscription = new Subscription();
  private _deleteRentalSubscription = new Subscription();

  constructor(private _rentalService: RentalService, private _toastService: ToastService) { }

  ngOnInit() {
    this.rentalsLoaded = false;
    this.getRentals();
  }

  public ngOnDestroy() {
    this._getRentalsSubscription.unsubscribe();
    this._deleteRentalSubscription.unsubscribe();
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

  sortBy(column) {
    if(this.query.sortBy === column) {
      this.query.isSortedAscending = !this.query.isSortedAscending;
    }
    else {
      this.query.sortBy = column;
      this.query.isSortedAscending = true;
    }
    this.getRentals();
  }

  onPageChanged(page) {
    this.query.page = page;
    this.getRentals();
  }

  private updateDateTimeFormat(datetime: string) {
    return datetime.substr(0, 10);
  }

  private getRentals() {
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
}
