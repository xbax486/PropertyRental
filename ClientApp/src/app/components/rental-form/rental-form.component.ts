import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Rental } from "../../models/rental";
import { Property } from "../../models/property";
import { Tenant } from "../../models/tenant";
import { PropertyFilter } from "./../../models/propertyFilter";
import { TenantFilter } from "./../../models/tenantFilter";
import { RentalService } from './../../services/rental.service';
import { PropertyService } from './../../services/property.service';
import { TenantService } from './../../services/tenant.service';
import { ToastService } from "../../services/toast.service";

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
    payment: 0,
    id: -1
  };
  public availableProperties: Property[] = [];
  public tenants: Tenant[] = [];
  public rentalEditingMode = false;
  public propertyFilter: PropertyFilter = { stateId: -1, suburbId: -1, available: 1 };
  public tenantFilter: TenantFilter = { available: 1 };

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
    private _toastService: ToastService,
    private _router: Router) { }

  ngOnInit() {
    this._selectedRentalSubscription = this._rentalService.selectedRentalSubject
      .subscribe(
        (selectedRental: Rental) => {
          this.selectedRental = selectedRental;
          this.rentalEditingMode = this.selectedRental.id == -1 ? false : true;
        },
        (error) => this._toastService.onErrorCall(error, 'Selected rental fetching error')
      );
    
    this._getAvailablePropertiesSubscription = this._propertyService.getProperties(this.propertyFilter)
      .subscribe(
        (availableProperties: Property[]) => this.availableProperties = availableProperties,
        (error) => this._toastService.onErrorCall(error, 'Available properties fetching error')
      );
    
    this._getTenantsSubscription = this._tenantService.getTenants(this.tenantFilter)
      .subscribe(
        (tenants: Tenant[]) => this.tenants = tenants,
        (error) => this._toastService.onErrorCall(error, 'Tenants fetching error')
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
    this.selectedRental.propertyId = propertyId;
    this.selectedRental.property = Object.assign({}, this.availableProperties.find(property => property.id == propertyId));
  }

  public onTenantChange(tenantId) {
    this.selectedRental.tenantId = tenantId;
    this.selectedRental.tenant = Object.assign({}, this.tenants.find(tenant => tenant.id == tenantId));
  }

  public onCancel() {
    this._router.navigate(['rentals']);
  }

  public onClear(rentalForm: NgForm) {
    rentalForm.reset();
  }

  public onSubmit(rentalForm: NgForm) {
    let rentalDetails = rentalForm.form.value;
    rentalDetails.id = this.selectedRental.id;
    rentalDetails.propertyId = +this.selectedRental.propertyId;
    rentalDetails.tenantId = +this.selectedRental.tenantId;
    if(rentalDetails.id == -1) {
      this._createRentalSubscription = this._rentalService.createRental(rentalDetails)
        .subscribe(
          (message) => this._toastService.onSuccessCall('Successfully created a rental record', rentalForm, 'rentals'),
          (error) => this._toastService.onErrorCall(error)
        );
    }
    else {
      this._updateRentalSubscription = this._rentalService.updateRental(rentalDetails)
        .subscribe(
          (message) => this._toastService.onSuccessCall('Successfully updated a rental record', rentalForm, 'rentals'),
          (error) => this._toastService.onErrorCall(error)
        );
    }
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
    this.selectedRental.payment = 0;
    this.selectedRental.startDate = '';
    this.selectedRental.startDate = '';
  }
}
