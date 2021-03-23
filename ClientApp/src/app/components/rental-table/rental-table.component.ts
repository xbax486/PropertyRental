import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import { ToastService } from "../../services/toast.service";

@Component({
  selector: 'app-rental-table',
  templateUrl: './rental-table.component.html',
  styleUrls: ['./rental-table.component.css']
})
export class RentalTableComponent implements OnInit, OnDestroy {
  public rentals: Rental[] = [];
  public rentalsLoaded = false;
  private _getRentalsSubscription = new Subscription();
  private _deleteRentalSubscription = new Subscription();

  constructor(private _rentalService: RentalService, private _toastService: ToastService) { }

  ngOnInit() {
    this.rentalsLoaded = false;
    this._getRentalsSubscription = this._rentalService.getRentals()
      .subscribe(
        (rentals: Rental[]) => {
          this.rentals = rentals;
          this.rentals.forEach(rental => {
            rental.startDate = this.updateDateTimeFormat(rental.startDate);
            rental.endDate = this.updateDateTimeFormat(rental.endDate);
          });
          this.rentalsLoaded = true;
        },
        (error) => this._toastService.onErrorCall(error, 'Rentals fetching error')
      );
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

  private updateDateTimeFormat(datetime: string) {
    return datetime.substr(0, 10);
  }
}
