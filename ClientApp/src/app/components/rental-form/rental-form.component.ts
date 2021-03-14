import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Rental } from "../../models/rental";
import { Owner } from "../../models/owner";
import { Tenant } from "../../models/tenant";
import { Suburb } from './../../models/suburb';
import { RentalService } from './../../services/rental.service';
import { SuburbService } from './../../services/suburb.service';
import { OwnerService } from './../../services/owner.service';
import { TenantService } from "../../services/tenant.service";

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.css']
})
export class RentalFormComponent implements OnInit, OnDestroy {
  public selectedRental = { 
    property: { 
      suburb: { state: { name: '' }},
      suburbId: -1,
      owner: {},
      ownerId: -1,
    },
    propertyId: -1,
    tenant: { name: '' },
    tenantId: -1,
    startDate: '',
    endDate: '',
    payment: -1,
    id: -1
  };
  public state = '';
  public suburbs: Suburb[] = [];
  public owners: Owner[] = [];
  public tenants: Tenant[] = [];

  private _selectedRentalSubscription = new Subscription();
  private _getAllStatesSubscription = new Subscription();
  private _createRentalSubscription = new Subscription();
  private _updateRentalSubscription = new Subscription();
  private _suburbsSubscription = new Subscription();
  private _ownersSubscription = new Subscription();
  private _tenantsSubscription = new Subscription();

  constructor(
    private _rentalService: RentalService, 
    private _suburbService: SuburbService,
    private _ownerService: OwnerService,
    private _tenantService: TenantService,
    private _router: Router) { }

  ngOnInit() {
    this._selectedRentalSubscription = this._rentalService.selectedRentalSubject
      .subscribe(
        (selectedRental: Rental) => {
          this.selectedRental = selectedRental;
          this.state = this.selectedRental.property.suburb.state.name;
          this.selectedRental.startDate = this.updateDateTimeFormat(this.selectedRental.startDate);
          this.selectedRental.endDate = this.updateDateTimeFormat(this.selectedRental.endDate);
        },
        (error) => console.log('Selected rental fetching error', error)
      );

    this._suburbsSubscription = this._suburbService.getSuburbs()
      .subscribe(
        (suburbs: Suburb[]) => this.suburbs = suburbs,
        (error) => console.log('Suburbs fetching error', error)
      );

    this._ownersSubscription = this._ownerService.getOwners()
      .subscribe(
        (owners: Owner[]) => this.owners = owners,
        (error) => console.log('Owners fetching error', error)
      );

    this._tenantsSubscription = this._tenantService.getTenants()
      .subscribe(
        (tenants: Tenant[]) => this.tenants = tenants,
        (error) => console.log('Tenants fetching error', error)
      );
  }

  ngOnDestroy() {
    this.clearForm();
    this._selectedRentalSubscription.unsubscribe();
    this._getAllStatesSubscription.unsubscribe();
    this._createRentalSubscription.unsubscribe();
    this._updateRentalSubscription.unsubscribe();
    this._suburbsSubscription.unsubscribe();
    this._ownersSubscription.unsubscribe();
    this._tenantsSubscription.unsubscribe();
  }

  public onSuburbChange(suburbId) {
    this.selectedRental.property.suburb = Object.assign({}, this.suburbs.find(suburb => suburb.id == suburbId));
    this.state = this.selectedRental.property.suburb.state.name;
  }

  public onOwnerChange(ownerId) {
    this.selectedRental.property.owner = Object.assign({}, this.owners.find(owner => owner.id == ownerId));
  }

  public onTenantChange(tenantId) {
    this.selectedRental.tenant = Object.assign({}, this.tenants.find(tenant => tenant.id == tenantId));
  }

  public onCancel() {
    this._router.navigate(['rentals']);
  }

  public onClear(propertyForm: NgForm) {
    propertyForm.reset();
  }

  public onSubmit(propertyForm: NgForm) {
    let rentalDetails = propertyForm.form.value;
    rentalDetails.id = this.selectedRental.id;
    rentalDetails.propertyId = +this.selectedRental.propertyId;
    rentalDetails.tenantId = +this.selectedRental.tenantId;
    console.log('rentalDetails', rentalDetails);
    
    // if(rentalDetails.id == -1) {
    //   this._createRentalSubscription = this._rentalService.createRental(rentalDetails)
    //     .subscribe(
    //       (message) => {
    //         console.log('Successfully created a rental record', message);
    //         this.navigateToTable(propertyForm);
    //       },
    //       (error) => console.log('Create a property fails', error)
    //     );
    // }
    // else {
    //   this._updateRentalSubscription = this._rentalService.updateRental(rentalDetails)
    //     .subscribe(
    //       (message) => {
    //         console.log('Successfully updated a rental record', message);
    //         this.navigateToTable(propertyForm);
    //       },
    //       (error) => console.log('Update a suburb fails', error)
    //     );
    // }
  }

  private updateDateTimeFormat(datetime: string) {
    return datetime.substr(0, 10);
  }

  private navigateToTable(propertyForm: NgForm) {
    propertyForm.reset();
    this._router.navigate(['rentals']);
  }

  private clearForm() {
    this.selectedRental.id = -1;
    this.selectedRental.property = {
      suburb: { state: { name: '' }},
      suburbId: -1,
      owner: {},
      ownerId: -1,
    };  
    this.selectedRental.propertyId = -1;
    this.selectedRental.tenant = { name: '' };
    this.selectedRental.tenantId = -1;
    this.selectedRental.payment = -1;
    this.selectedRental.startDate = '';
    this.selectedRental.startDate = '';
  }
}
