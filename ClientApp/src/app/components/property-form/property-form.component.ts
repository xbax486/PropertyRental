import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertyService } from './../../services/property.service';
import { SuburbService } from './../../services/suburb.service';
import { Property } from './../../models/property';
import { Suburb } from './../../models/suburb';
import { PropertyType } from './../../models/propertyType';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit, OnDestroy {
  public selectedProperty = { suburb: {}, propertyType: {} };
  public suburbs: Suburb[] = [];
  public propertyTypes: PropertyType[] = [];

  private _selectedPropertySubscription = new Subscription();
  private _suburbsSubscription = new Subscription();
  private _propertyTypesSubscription = new Subscription();

  constructor(
    private _propertyService: PropertyService, 
    private _suburbService: SuburbService) { }

  ngOnInit() {
    this._selectedPropertySubscription = this._propertyService.selectedPropertySubject
      .subscribe(
        (selectedProperty: Property) => this.selectedProperty = selectedProperty,
        (error) => {
          console.log('Selected property fetching error', error);
        }
      );
    
    this._suburbsSubscription = this._suburbService.getSuburbs()
      .subscribe(
        (suburbs: Suburb[]) => this.suburbs = suburbs,
        (error) => {
          console.log('Suburbs fetching error', error);
        }
      );

    this._propertyTypesSubscription = this._propertyService.getPropertyTypes()
      .subscribe(
        (propertyTypes: PropertyType[]) => this.propertyTypes = propertyTypes,
        (error) => {
          console.log('Property types fetching error', error);
        }
      );
  }

  ngOnDestroy() {
    this._selectedPropertySubscription.unsubscribe();
    this._suburbsSubscription.unsubscribe();
    this._propertyTypesSubscription.unsubscribe();
  }

  onSuburbChange(suburbId) {
    this.selectedProperty.suburb = Object.assign({}, this.suburbs.find(suburb => suburb.id == suburbId));
  }

  onPropertyTypeChange(propertyTypeId) {
    this.selectedProperty.propertyType = Object.assign({}, this.propertyTypes.find(propertyType => propertyType.id == propertyTypeId));
  }

  onSubmit() {

  }
}
