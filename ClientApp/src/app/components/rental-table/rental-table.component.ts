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

}
