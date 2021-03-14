import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

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

  constructor(private _rentalService: RentalService) { }

  ngOnInit() {
    this.rentalsLoaded = false;
    this._getRentalsSubscription = this._rentalService.getRentals()
      .subscribe(
        (rentals: Rental[]) => {
          this.rentals = rentals;
          console.log('rentals', this.rentals);
          
          this.rentalsLoaded = true;
        },
        (error) => console.log('Rentals fetching error', error)
      );
  }

  ngOnDestroy() {
    this._getRentalsSubscription.unsubscribe();
    this._deleteRentalSubscription.unsubscribe();
  }

  onEditRental(rental) {
    this._rentalService.selectedRentalSubject.next(rental);
  }

  onDeleteRental(selectedRental: Rental) {
    if(window.confirm('Do you really want to delete this rental record?')) {
      this._deleteRentalSubscription = this._rentalService.deleteRental(selectedRental.id)
        .subscribe(
          () => {
            let index = this.rentals.findIndex(rental => rental.id == selectedRental.id);
            this.rentals.splice(index, 1);
            console.log('Successfully delete a rental record');
          },
          (error) => console.log('Rental record deletion error', error)
        );
    }
  }
}
