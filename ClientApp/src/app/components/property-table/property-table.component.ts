import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertyService } from './../../services/property.service';
import { SuburbService } from './../../services/suburb.service';
import { ToastService } from "../../services/toast.service";
import { Property } from './../../models/property';
import { Suburb } from './../../models/suburb';
import { State } from './../../models/state';
import { PropertyQuery } from "../../models/propertyQuery";
import { faCheckCircle, faTimesCircle, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.css']
})
export class PropertyTableComponent implements OnInit, OnDestroy {
  private readonly DEFAULT_PAGE = 1;
  private readonly DEFAULT_PAGE_SIZE = 5;

  public properties: Property[] = [];
  public suburbs: Suburb[] = [];
  public filteredSuburbs: Suburb[] = [];
  public states: State[] = [];
  public propertiesLoaded = false;
  public query: PropertyQuery = { stateId: -1, suburbId: -1, available: -1, sortBy: '', isSortedAscending: true, page: this.DEFAULT_PAGE, pageSize: this.DEFAULT_PAGE_SIZE };
  public queryResult = {};
  public columns = [
    { title: 'Suburb', key: 'suburb', isSortable: true },
    { title: 'State', key: 'state', isSortable: true },
    { title: 'Bedroom' },
    { title: 'Bathroom' },
    { title: 'Parking' },
    { title: 'Pets Allowed' },
    { title: 'Built-in Wardrobe' },
    { title: 'Gas Available' },
    { title: 'Has Study Room' },
    { title: 'Furnished' },
    { title: 'Available' },
    { title: 'Actions' }
  ];

  public faCheckCircle = faCheckCircle;
  public faTimesCircle = faTimesCircle;
  public faSortUp = faSortUp;
  public faSortDown = faSortDown;

  private _propertiesSubscription = new Subscription();
  private _suburbsSubscription = new Subscription();
  private _statesSubscription = new Subscription();
  private _deletePropertySubscription = new Subscription();

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
    this.query.suburbId = -1;
    this.query.stateId = +this.query.stateId;
    this.filteredSuburbs = [...this.suburbs];
    if(this.query.stateId) {
      this.filteredSuburbs = [...this.filteredSuburbs.filter((suburb: Suburb) => suburb.stateId == this.query.stateId)];
    }
    this.onFilterChanged();
  }

  onSuburbChange() {
    this.query.suburbId = +this.query.suburbId;
    this.onFilterChanged();
  }

  onAvailableChange() {
    this.query.available = +this.query.available;
    this.onFilterChanged();
  }

  onResetFilter() {
    this.query = { stateId: -1, suburbId: -1, available: -1, sortBy: '', isSortedAscending: true, page: this.DEFAULT_PAGE, pageSize: this.DEFAULT_PAGE_SIZE };
    this.onFilterChanged();
  }

  sortBy(column) {
    if(this.query.sortBy === column) {
      this.query.isSortedAscending = !this.query.isSortedAscending;
    }
    else {
      this.query.sortBy = column;
      this.query.isSortedAscending = true;
    }
    this.getFilteredProperties();
  }

  onPageChanged(page) {
    this.query.page = page;
    this.getFilteredProperties();
  }

  private onFilterChanged() {
    this.query.page = 1;
    this.getFilteredProperties();
  }

  private getFilteredProperties() {
    this._propertiesSubscription = this._propertyService.getProperties(this.query)
      .subscribe(
        (queryResult) => {
          this.queryResult = queryResult;
          this.properties = queryResult.items;
          this.propertiesLoaded = true;
        },
        (error) => this._toastService.onErrorCall(error, 'Properties fetching error')
      );
  }
}
