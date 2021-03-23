import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertyService } from './../../services/property.service';
import { ToastService } from "../../services/toast.service";
import { Property } from './../../models/property';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.css']
})
export class PropertyTableComponent implements OnInit, OnDestroy {
  public properties: Property[] = [];
  public propertiesLoaded = false;
  
  private _getPropertiesSubscription = new Subscription();
  private _deletePropertySubscription = new Subscription();

  public faCheckCircle = faCheckCircle;
  public faTimesCircle = faTimesCircle;

  constructor(private _propertyService: PropertyService, private _toastService: ToastService) { }

  ngOnInit() {
    this.propertiesLoaded = false;
    this._getPropertiesSubscription = this._propertyService.getAllProperties()
      .subscribe(
        (properties) => {
          this.properties = properties;
          this.propertiesLoaded = true;
        },
        (error) => this._toastService.onErrorCall(error, 'Properties fetching error')
      );
  }

  ngOnDestroy() {
    this._getPropertiesSubscription.unsubscribe();
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
}
