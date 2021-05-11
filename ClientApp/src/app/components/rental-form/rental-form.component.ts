import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Rental } from "../../models/rental";
import { Property } from "../../models/property";
import { Tenant } from "../../models/tenant";
import { QueryResult } from '../../models/query/queryResult';
import { RentalService } from './../../services/rental.service';
import { PropertyService } from './../../services/property.service';
import { TenantService } from './../../services/tenant.service';
import { ToastService } from "../../services/toast.service";
import { CustomAuthService } from "../../services/custom.auth.service";

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.css']
})
export class RentalFormComponent implements OnInit, OnDestroy {
  public propertyQuery = { stateId: -1, suburbId: -1, available: 1, sortBy: '', isSortedAscending: true };
  public tenantQuery = { available: 1, sortBy: '', isSortedAscending: true };
  public queryResult = {};
  public rentalEditingMode = false;

  public selectedRental = { 
    property: { 
      unit: '',
      street: '',
      suburb: { 
        name: "",
        postcode: "",
        state: { 
          name: "",
          acronym: "",
          id: -1
        },
        stateId: -1,
        id: -1
      },
      suburbId: -1,
      owner: {
        name: '',
        id: -1
      },
      ownerId: -1,
    },
    propertyId: -1,
    tenant: { 
      name: '',
      id: -1
    },
    tenantId: -1,
    startDate: '',
    endDate: '',
    payment: 0,
    id: -1
  };
  public availableProperties: Property[] = [];
  public availableTenants: Tenant[] = [];

  private _selectedRentalSubscription = new Subscription();
  private _getAllStatesSubscription = new Subscription();
  private _createRentalSubscription = new Subscription();
  private _updateRentalSubscription = new Subscription();
  private _getAvailablePropertiesSubscription = new Subscription();
  private _getAvailableTenantsSubscription = new Subscription();

  @ViewChild(NgForm) ngForm: NgForm;

  constructor(
    private _rentalService: RentalService,
    private _propertyService: PropertyService,
    private _tenantService: TenantService,
    private _toastService: ToastService,
    private _customAuthService: CustomAuthService) { }

  ngOnInit() {
    this.getSelectedRental();
    this.getAvailableProperties();
    this.getAvailableTenants();
  }

  ngOnDestroy() {
    this.clearForm();
    this._selectedRentalSubscription.unsubscribe();
    this._getAllStatesSubscription.unsubscribe();
    this._createRentalSubscription.unsubscribe();
    this._updateRentalSubscription.unsubscribe();
    this._getAvailablePropertiesSubscription.unsubscribe();
    this._getAvailableTenantsSubscription.unsubscribe();
  }

  public onAvailablePropertyChange(propertyId) {
    this.selectedRental.propertyId = propertyId;
    this.selectedRental.property = Object.assign({}, this.availableProperties.find(property => property.id == propertyId));
  }

  public onTenantChange(tenantId) {
    this.selectedRental.tenantId = tenantId;
    this.selectedRental.tenant = Object.assign({}, this.availableTenants.find(tenant => tenant.id == tenantId));
  }

  public onCancel() {
    this._customAuthService.navigateTo("rentals");
  }

  public onClear(rentalForm: NgForm) {
    rentalForm.reset();
  }

  public onSubmit(rentalForm: NgForm) {
    let rentalDetails = rentalForm.form.value;
    rentalDetails.id = this.selectedRental.id;
    rentalDetails.propertyId = +this.selectedRental.propertyId;
    rentalDetails.tenantId = +this.selectedRental.tenantId;
    rentalDetails.payment = +this.selectedRental.payment;
    rentalDetails.startDate = this.updateDateTimeFormat(rentalDetails.startDate);
    rentalDetails.endDate = this.updateDateTimeFormat(rentalDetails.endDate);
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
      unit: '',
      street: '',
      suburb: { 
        name: "",
        postcode: "",
        state: { 
          name: "",
          acronym: "",
          id: -1
        },
        stateId: -1,
        id: -1
      },
      suburbId: -1,
      owner: {
        name: '',
        id: -1
      },
      ownerId: -1,
    };  
    this.selectedRental.propertyId = -1;
    this.selectedRental.tenant = { name: '', id: -1 };
    this.selectedRental.tenantId = -1;
    this.selectedRental.payment = 0;
    this.selectedRental.startDate = '';
    this.selectedRental.endDate = '';
  }

  private getSelectedRental() {
    this._selectedRentalSubscription = this._rentalService.selectedRentalSubject
      .subscribe(
        (selectedRental: Rental) => {
          this.selectedRental = selectedRental;
          this.rentalEditingMode = this.selectedRental.id == -1 ? false : true;
        },
        (error) => this._toastService.onErrorCall(error, 'Selected rental fetching error')
      );
  }

  private getAvailableProperties() {
    this._getAvailablePropertiesSubscription = this._propertyService.getProperties(this.propertyQuery)
      .subscribe(
        (queryResult: QueryResult<Property>) => {
          this.queryResult = queryResult;
          this.availableProperties = queryResult.items;
        },
        (error) => this._toastService.onErrorCall(error, 'Properties fetching error')
      );
  }

  private getAvailableTenants() {
    this._getAvailableTenantsSubscription = this._tenantService.getTenants(this.tenantQuery)
      .subscribe(
        (queryResult: QueryResult<Tenant>) => {
          this.queryResult = queryResult;
          this.availableTenants = queryResult.items;
        },
        (error) => this._toastService.onErrorCall(error, 'Tenants fetching error')
      );
  }

  private updateDateTimeFormat(datetime: string) {
    return datetime.substr(0, 10);
  }
}
