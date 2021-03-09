import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription, throwError, of } from 'rxjs';
import { switchMap, catchError } from "rxjs/operators";
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
    owner: {}, 
    ownerId: -1,
    suburb: {},  
    suburbId: -1,
    propertyType: {},
    propertyTypeId: -1,
    bedroom: 0,
    bathroom: 0,
    parking: 0,
    petsAllowed: false,
    builtInWardrobe: false,
    gasAvailable: false,
    hasStudyRoom: false,
    furnished: false,
    street: "",
    unit: '',
    id: -1
  };
  public suburbs: Suburb[] = [];
  public propertyTypes: PropertyType[] = [];
  public ownerOfProperty: Owner = null;

  private _selectedPropertySubscription = new Subscription();
  private _updatePropertySubscription = new Subscription();
  private _suburbsSubscription = new Subscription();
  private _propertyTypesSubscription = new Subscription();

  constructor(
    private _propertyService: PropertyService, 
    private _suburbService: SuburbService,
    private _ownerService: OwnerService,
    private _router: Router) { }

  ngOnInit() {
    this._selectedPropertySubscription = this._propertyService.selectedPropertySubject
      .pipe(
        switchMap(
          (selectedProperty: Property) => {
            this.selectedProperty = selectedProperty;
            if(this.selectedProperty.id != -1) {
              return this._ownerService.getOwner(this.selectedProperty.ownerId)
                .pipe(
                  catchError(error => throwError(error))
                );
            }
            return of({});
          }
        )
      )
      .subscribe(
        (owner: Owner) => this.ownerOfProperty = owner,
        (error) => console.log('Owner fetching error', error)
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
  }

  ngOnDestroy() {
    this.clearFields();
    this._selectedPropertySubscription.unsubscribe();
    this._updatePropertySubscription.unsubscribe();
    this._suburbsSubscription.unsubscribe();
    this._propertyTypesSubscription.unsubscribe();
  }

  public onSuburbChange(suburbId) {
    this.selectedProperty.suburb = Object.assign({}, this.suburbs.find(suburb => suburb.id == suburbId));
  }

  public onPropertyTypeChange(propertyTypeId) {
    this.selectedProperty.propertyType = Object.assign({}, this.propertyTypes.find(propertyType => propertyType.id == propertyTypeId));
  }

  public onCancel() {
    this._router.navigate(['properties']);
  }

  public onClear() {
    this.selectedProperty.owner = {};
    this.selectedProperty.ownerId = -1;
    this.selectedProperty.suburb = { state: { name: '' } };
    this.selectedProperty.suburbId = -1;
    this.selectedProperty.propertyType = {};
    this.selectedProperty.propertyTypeId = -1;

    this.selectedProperty.unit = '';
    this.selectedProperty.street = '';

    this.selectedProperty.bedroom = 0;
    this.selectedProperty.bathroom = 0;
    this.selectedProperty.parking = 0;

    this.selectedProperty.petsAllowed = false;
    this.selectedProperty.builtInWardrobe = false;
    this.selectedProperty.gasAvailable = false;
    this.selectedProperty.hasStudyRoom = false;
    this.selectedProperty.furnished = false;

    this.selectedProperty.id = -1;
  }

  public onSubmit(propertyForm: NgForm) {
    let propertyDetails = propertyForm.form.value;
    propertyDetails.id = this.selectedProperty.id;
    propertyDetails.ownerId = +this.selectedProperty.ownerId;
    propertyDetails.suburbId = +this.selectedProperty.suburbId;
    propertyDetails.propertyTypeId = +this.selectedProperty.propertyTypeId;
    console.log('propertyDetails', propertyDetails);
    
    // this._updatePropertySubscription = this._propertyService.updateProperty(propertyDetails)
    //   .subscribe(
    //     (message) => {
    //       console.log('Successfully updated a property', message);
    //       this.navigateToSuburbs(propertyForm);
    //     },
    //     (error) => console.log('Update a suburb fails', error)
    //   );
  }

  private navigateToSuburbs(propertyForm) {
    propertyForm.reset();
    this._router.navigate(['properties']);
  }

  private clearFields() {
    this.selectedProperty.id = -1;
    this.onClear();
  }
}
