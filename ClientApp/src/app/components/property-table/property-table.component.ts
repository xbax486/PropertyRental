import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertyService } from './../../services/property.service';
import { SuburbService } from './../../services/suburb.service';
import { ToastService } from "../../services/toast.service";
import { Property } from './../../models/property';
import { Suburb } from './../../models/suburb';
import { State } from './../../models/state';
import { PropertyFilter } from "./../../models/propertyFilter";
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.css']
})
export class PropertyTableComponent implements OnInit, OnDestroy {
  public properties: Property[] = [];
  public suburbs: Suburb[] = [];
  public filteredSuburbs: Suburb[] = [];
  public states: State[] = [];
  public propertiesLoaded = false;
  public filter: PropertyFilter = { stateId: -1, suburbId: -1, available: -1 };
  
  private _propertiesSubscription = new Subscription();
  private _suburbsSubscription = new Subscription();
  private _statesSubscription = new Subscription();
  private _deletePropertySubscription = new Subscription();

  public faCheckCircle = faCheckCircle;
  public faTimesCircle = faTimesCircle;

  constructor(
    private _propertyService: PropertyService, 
    private _suburbService: SuburbService,
    private _toastService: ToastService) { }

  ngOnInit() {
    this.propertiesLoaded = false;
    this.getFilteredProperties();
    this._suburbsSubscription = this._suburbService.getSuburbs()
      .subscribe(
        (suburbs: Suburb[]) => {
          this.suburbs = suburbs;
          this.filteredSuburbs = [...suburbs];
        },
        (error) => this._toastService.onErrorCall(error, 'Suburbs fetching error')
      );
    this._statesSubscription = this._suburbService.getStates()
      .subscribe(
        (states: State[]) => this.states = states,
        (error) => this._toastService.onErrorCall(error, 'States fetching error')
      );
  }

  ngOnDestroy() {
    this._propertiesSubscription.unsubscribe();
    this._suburbsSubscription.unsubscribe();
    this._statesSubscription.unsubscribe();
    this._deletePropertySubscription.unsubscribe();
  }

  onEditProperty(selectedProperty: Property) {
    this._propertyService.selectedPropertySubject.next(selectedProperty);
  }

  onDeleteProperty(selectedProperty: Property) {
    if(window.confirm('Do you really want to delete this property?')) {
      this._deletePropertySubscription = this._propertyService.deleteProperty(selectedProperty.id)
        .subscribe(
          () => {
            let index = this.properties.findIndex(property => property.id == selectedProperty.id);
            this.properties.splice(index, 1);
            this._toastService.onSuccessCall('Successfully delete a property');
          },
          (error) => this._toastService.onErrorCall(error, 'Property deletion error')
        );
    }
  }

  onStateChange() {
    this.filter.suburbId = -1;
    this.filter.stateId = +this.filter.stateId;
    this.filteredSuburbs = [...this.suburbs];
    if(this.filter.stateId) {
      this.filteredSuburbs = [...this.filteredSuburbs.filter((suburb: Suburb) => suburb.stateId == this.filter.stateId)];
    }
    console.log(this.filter);
    this.getFilteredProperties();
  }

  onSuburbChange() {
    this.filter.suburbId = +this.filter.suburbId;
    this.getFilteredProperties();
  }

  onAvailableChange() {
    this.filter.available = +this.filter.available;
    this.getFilteredProperties();
  }

  private getFilteredProperties() {
    this._propertiesSubscription = this._propertyService.getProperties(this.filter)
      .subscribe(
        (properties) => {
          this.properties = properties;
          this.propertiesLoaded = true;
        },
        (error) => this._toastService.onErrorCall(error, 'Properties fetching error')
      );
  }
}
