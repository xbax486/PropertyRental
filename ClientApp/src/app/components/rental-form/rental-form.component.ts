import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Rental } from "../../models/rental";
import { Property } from "../../models/property";
import { Tenant } from "../../models/tenant";
import { RentalService } from './../../services/rental.service';
import { PropertyService } from './../../services/property.service';
import { TenantService } from './../../services/tenant.service';

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
  public availableProperties: Property[] = [];
  public tenants: Tenant[] = [];
  public rentalEditingMode = false;

  private _selectedRentalSubscription = new Subscription();
  private _getAllStatesSubscription = new Subscription();
  private _createRentalSubscription = new Subscription();
  private _updateRentalSubscription = new Subscription();
  private _getAvailablePropertiesSubscription = new Subscription();
  private _getTenantsSubscription = new Subscription();

  constructor(
    private _rentalService: RentalService,
    private _propertyService: PropertyService,
    private _tenantService: TenantService,
    private _router: Router) { }

  ngOnInit() {
    this._selectedRentalSubscription = this._rentalService.selectedRentalSubject
      .subscribe(
        (selectedRental: Rental) => {
          this.selectedRental = selectedRental;
          this.selectedRental.startDate = this.updateDateTimeFormat(this.selectedRental.startDate);
          this.selectedRental.endDate = this.updateDateTimeFormat(this.selectedRental.endDate);
          this.rentalEditingMode = this.selectedRental.id == -1 ? false : true;
          console.log('this.rentalEditingMode', this.rentalEditingMode);
        },
        (error) => console.log('Selected rental fetching error', error)
      );
    
    this._getAvailablePropertiesSubscription = this._propertyService.getAvailableProperties()
      .subscribe(
        (availableProperties: Property[]) => this.availableProperties = availableProperties,
        (error) => console.log('Available properties fetching error', error)
      );
    
    this._getTenantsSubscription = this._tenantService.getAvailableTenants()
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
    this._getAvailablePropertiesSubscription.unsubscribe();
    this._getTenantsSubscription.unsubscribe();
  }

  public onAvailablePropertyChange(propertyId) {
    this.selectedRental.property = Object.assign({}, this.availableProperties.find(property => property.id == propertyId));
  }

  public onTenantChange(tenantId) {
    this.selectedRental.tenantId = tenantId;
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
