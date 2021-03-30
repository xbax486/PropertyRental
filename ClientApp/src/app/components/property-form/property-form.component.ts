import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Property } from './../../models/property';
import { Suburb } from './../../models/suburb';
import { PropertyType } from './../../models/propertyType';
import { Owner } from 'src/app/models/owner';
import { PropertyService } from './../../services/property.service';
import { SuburbService } from './../../services/suburb.service';
import { OwnerService } from './../../services/owner.service';
import { ToastService } from "../../services/toast.service";
import { OwnerQuery } from "../../models/query/ownerQuery";
import { QueryResult } from 'src/app/models/query/queryResult';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit, OnDestroy {
  private readonly DEFAULT_PAGE = 1;
  private readonly DEFAULT_PAGE_SIZE = 3;
  public query = {};
  public queryResult = {};

  public selectedProperty = { 
    owner: { name: '' },
    ownerId: -1,
    suburb: { state: { name: '' } },  
    suburbId: -1,
    propertyType: { name: ''},
    propertyTypeId: -1,
    bedroom: 0,
    bathroom: 0,
    parking: 0,
    petsAllowed: false,
    builtInWardrobe: false,
    gasAvailable: false,
    hasStudyRoom: false,
    furnished: false,
    available: true,
    street: '',
    unit: '',
    id: -1
  };
  public state = '';
  public available = '';
  public suburbs: Suburb[] = [];
  public propertyTypes: PropertyType[] = [];
  public owners: Owner[] = [];

  public ownersLoaded = false;
  
  private _selectedPropertySubscription = new Subscription();
  private _createPropertySubscription = new Subscription();
  private _updatePropertySubscription = new Subscription();
  private _suburbsSubscription = new Subscription();
  private _propertyTypesSubscription = new Subscription();
  private _ownersSubscription = new Subscription();

  constructor(
    private _propertyService: PropertyService, 
    private _suburbService: SuburbService,
    private _ownerService: OwnerService,
    private _toastService: ToastService,
    private _router: Router) { }

  ngOnInit() {
    this._selectedPropertySubscription = this._propertyService.selectedPropertySubject
        .subscribe(
          (selectedProperty: Property) => {
            this.selectedProperty = selectedProperty;
            this.state = this.selectedProperty.suburb.state.name;
            this.available = this.selectedProperty.available ? 'TRUE' : 'FALSE';
          },
          (error) => this._toastService.onErrorCall(error, 'Selected property fetching error')
      );

    this._propertyTypesSubscription = this._propertyService.getPropertyTypes()
      .subscribe(
        (propertyTypes: PropertyType[]) => this.propertyTypes = propertyTypes,
        (error) => this._toastService.onErrorCall(error, 'Property types fetching error')
      );
    
    this.getSuburbs();
    this.getOwners();
  }

  ngOnDestroy() {
    this.clearForm();
    this._selectedPropertySubscription.unsubscribe();
    this._createPropertySubscription.unsubscribe();
    this._updatePropertySubscription.unsubscribe();
    this._suburbsSubscription.unsubscribe();
    this._propertyTypesSubscription.unsubscribe();
    this._ownersSubscription.unsubscribe();
  }

  public onSuburbChange(suburbId) {
    this.selectedProperty.suburb = Object.assign({}, this.suburbs.find(suburb => suburb.id == suburbId));
    this.state = this.selectedProperty.suburb.state.name;
  }

  public onPropertyTypeChange(propertyTypeId) {
    this.selectedProperty.propertyType = Object.assign({}, this.propertyTypes.find(propertyType => propertyType.id == propertyTypeId));
  }

  public onOwnerChange(ownerId) {
    this.selectedProperty.owner = Object.assign({}, this.owners.find(owner => owner.id == ownerId));
  }

  public onCancel() {
    this._router.navigate(['properties']);
  }

  public onClear(propertyForm: NgForm) {
    propertyForm.reset();
  }

  public onSubmit(propertyForm: NgForm) {
    let propertyDetails = propertyForm.form.value;
    propertyDetails.id = this.selectedProperty.id;
    propertyDetails.ownerId = +this.selectedProperty.ownerId;
    propertyDetails.suburbId = +this.selectedProperty.suburbId;
    propertyDetails.propertyTypeId = +this.selectedProperty.propertyTypeId;
    propertyDetails.available = this.selectedProperty.available;
    if(propertyDetails.id == -1) {
      this._createPropertySubscription = this._propertyService.createProperty(propertyDetails)
        .subscribe(
          (message) => this._toastService.onSuccessCall('Successfully created a property', propertyForm, 'properties'),
          (error) => this._toastService.onErrorCall(error)
        );
    }
    else {
      this._updatePropertySubscription = this._propertyService.updateProperty(propertyDetails)
        .subscribe(
          (message) => this._toastService.onSuccessCall('Successfully updated a property', propertyForm, 'properties'),
          (error) => this._toastService.onErrorCall(error)
        );
    }
  }

  private clearForm() {
    this.selectedProperty.id = -1;
    this.selectedProperty.owner = { name: '' };  
    this.selectedProperty.ownerId = -1;
    this.selectedProperty.suburb = { state: { name: '' } };  
    this.selectedProperty.suburbId = -1;
    this.selectedProperty.propertyType = { name: ''};
    this.selectedProperty.propertyTypeId = -1;
    this.selectedProperty.bedroom = 0;
    this.selectedProperty.bathroom = 0;
    this.selectedProperty.parking = 0;
    this.selectedProperty.petsAllowed = false;
    this.selectedProperty.builtInWardrobe = false;
    this.selectedProperty.gasAvailable = false;
    this.selectedProperty.hasStudyRoom = false;
    this.selectedProperty.furnished = false;
    this.selectedProperty.available = true;
    this.selectedProperty.street = '';
    this.selectedProperty.unit = '';
  }

  private getSuburbs() {
    this._suburbsSubscription = this._suburbService.getSuburbs(this.query)
      .subscribe(
        (queryResult: QueryResult<Suburb>) => {
          this.queryResult = queryResult;
          this.suburbs = queryResult.items;
        },
        (error) => this._toastService.onErrorCall(error, 'Suburbs fetching error')
      );
  }

  private getOwners() {
    this._ownersSubscription = this._ownerService.getOwners(this.query)
      .subscribe(
        (queryResult: QueryResult<Owner>) => {
          this.queryResult = queryResult;
          this.owners = queryResult.items;
          this.ownersLoaded = true;
        },
        (error) => this._toastService.onErrorCall(error, 'Owners fetching error')
      );
  }
}
