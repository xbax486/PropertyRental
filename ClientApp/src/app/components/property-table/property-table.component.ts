import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertyService } from './../../services/property.service';
import { Property } from './../../models/property';
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.css']
})
export class PropertyTableComponent implements OnInit, OnDestroy {
  public properties: Property[] = [];
  public propertiesLoaded = false;
  private _subscription = new Subscription();
  public faCheckCircle = faCheckCircle;
  public faTimesCircle = faTimesCircle;

  constructor(private _propertyService: PropertyService) { }

  ngOnInit() {
    this.propertiesLoaded = false;
    this._subscription = this._propertyService.getProperties()
      .subscribe(
        (properties) => {
          this.properties = properties;
          this.propertiesLoaded = true;
        },
        (error) => console.log('Addresses fetching error', error)
      );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  onEditProperty(selectedProperty: Property) {
    this._propertyService.selectedPropertySubject.next(selectedProperty);
  }
}
