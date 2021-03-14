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

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit, OnDestroy {
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
    available: false,
    street: '',
    unit: '',
    id: -1
  };
  public state = '';
  public available = '';
  public suburbs: Suburb[] = [];
  public propertyTypes: PropertyType[] = [];
  public owners: Owner[] = [];
  
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
    private _router: Router) { }

  ngOnInit() {
    this._selectedPropertySubscription = this._propertyService.selectedPropertySubject
        .subscribe(
          (selectedProperty: Property) => {
            this.selectedProperty = selectedProperty;
            this.state = this.selectedProperty.suburb.state.name;
            this.available = this.selectedProperty.available ? 'TRUE' : 'FALSE';
          },
          (error) => console.log('Selected property fetching error', error)
      );
    
    this._suburbsSubscription = this._suburbService.getSuburbs()
      .subscribe(
        (suburbs: Suburb[]) => this.suburbs = suburbs,
        (error) => console.log('Suburbs fetching error', error)
      );

    this._propertyTypesSubscription = this._propertyService.getPropertyTypes()
      .subscribe(
        (propertyTypes: PropertyType[]) => this.propertyTypes = propertyTypes,
        (error) => console.log('Property types fetching error', error)
      );

    this._ownersSubscription = this._ownerService.getOwners()
      .subscribe(
        (owners: Owner[]) => this.owners = owners,
        (error) => console.log('Owners fetching error', error)
      );
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
    if(propertyDetails.id == -1) {
      this._createPropertySubscription = this._propertyService.createProperty(propertyDetails)
        .subscribe(
          (message) => {
            console.log('Successfully created a property', message);
            this.navigateToTable(propertyForm);
          },
          (error) => console.log('Create a property fails', error)
        );
    }
    else {
      this._updatePropertySubscription = this._propertyService.updateProperty(propertyDetails)
        .subscribe(
          (message) => {
            console.log('Successfully updated a property', message);
            this.navigateToTable(propertyForm);
          },
          (error) => console.log('Update a suburb fails', error)
        );
    }
  }

  private navigateToTable(propertyForm: NgForm) {
    propertyForm.reset();
    this._router.navigate(['properties']);
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
    this.selectedProperty.street = '';
    this.selectedProperty.unit = '';
  }
}
