import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BehaviorSubject, of } from "rxjs";

import { PropertyFormComponent } from "./property-form.component";
import { PropertyService } from "../../services/property.service";
import { SuburbService } from "../../services/suburb.service";
import { OwnerService } from "../../services/owner.service";
import { ToastService } from "../../services/toast.service";
import { CustomAuthService } from "../../services/custom.auth.service";
import { Suburb } from "../../models/suburb";
import { Owner } from "../../models/owner";
import { PropertyType } from '../../models/propertyType';

fdescribe('PropertyFormComponent', () => {
  let component: PropertyFormComponent;
  let fixture: ComponentFixture<PropertyFormComponent>;
  let element: DebugElement;

  let propertyServiceSpy: any;
  let suburbServiceSpy: any;
  let ownerServiceSpy: any;
  let toastServiceSpy: any;
  let customAuthServiceSpy: any;

  let propertyService: any;
  let suburbService: any;
  let ownerService: any;
  let toastService: any;
  let customAuthService: any;

  const selectedPropertySubject = new BehaviorSubject({
    property: { name: '' },
    propertyId: -1,
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
  });
  const propertyForCreation = {
    owner: { 
      name: "Owner 1" 
    },
    ownerId: 1,
    suburb: { 
      state: { 
        name: "New South Wales" 
      } 
    },
    suburbId: 1,
    propertyType: { 
      name: "House" 
    },
    propertyTypeId: 1,
    bedroom: 2,
    bathroom: 2,
    parking: 1,
    petsAllowed: true,
    builtInWardrobe: false,
    gasAvailable: true,
    hasStudyRoom: false,
    furnished: false,
    available: true,
    street: "Test Street",
    unit: "Test Unit",
    id: -1
  };
  const propertyForUpdate = {
    owner: { 
      name: "Owner 2" 
    },
    ownerId: 2,
    suburb: { 
      state: { 
        name: "New South Wales" 
      } 
    },
    suburbId: 1,
    propertyType: { 
      name: "House" 
    },
    propertyTypeId: 2,
    bedroom: 3,
    bathroom: 2,
    parking: 2,
    petsAllowed: true,
    builtInWardrobe: false,
    gasAvailable: true,
    hasStudyRoom: false,
    furnished: false,
    available: true,
    street: "Test Street 2",
    unit: "Test Unit 2",
    id: 2
  };

  const propertyCreationSuccessMessage = "Successfully created a property";
  const propertyUpdateSuccessMessage = "Successfully updated a property";
  const navigateTo = "properties";

  const owners: Owner[] = [
    {
      name: "Property 1",
      email: "owner1example.com",
      mobile: "0412345671",
      id: 1
    },
    {
      name: "Property 2",
      email: "owner2example.com",
      mobile: "0412345672",
      id: 2
    },
    {
      name: "Property 3",
      email: "owner3example.com",
      mobile: "0412345673",
      id: 3
    }
  ];
  const suburbs: Suburb[] = [
    {
      name: "Suburb 1",
      postcode: "2050",
      state: { name: "New South Wales", acronym: "NSW", id: 1 },
      stateId: 1,
      id: 1
    },
    {
      name: "Suburb 2",
      postcode: "2051",
      state: { name: "New South Wales", acronym: "NSW", id: 1 },
      stateId: 1,
      id: 2
    },
    {
      name: "Suburb 3",
      postcode: "2052",
      state: { name: "New South Wales", acronym: "NSW", id: 1 },
      stateId: 1,
      id: 3
    }
  ];
  const propertyTypes: PropertyType[] = [
    {
      name: 'House', id: 1
    },
    {
      name: 'Unit', id: 2
    },
    {
      name: 'Townhouse', id: 3
    },
  ];

  beforeEach(
    waitForAsync(() => {
      propertyServiceSpy = jasmine.createSpyObj("PropertyService", [
        "createProperty",
        "updateProperty",
        "getPropertyTypes"
      ]);
      propertyServiceSpy.selectedPropertySubject = selectedPropertySubject;

      suburbServiceSpy = jasmine.createSpyObj("SuburbService", [
        "getSuburbs"
      ]);

      ownerServiceSpy = jasmine.createSpyObj("OwnerService", [
        "getOwners"
      ]);

      toastServiceSpy = jasmine.createSpyObj("ToastService", [
        "onSuccessCall",
        "onErrorCall",
      ]);

      customAuthServiceSpy = jasmine.createSpyObj("CustomAuthService", [
        "navigateTo",
      ]);

      TestBed.configureTestingModule({
        imports: [CommonModule, FormsModule],
        declarations: [PropertyFormComponent],
        providers: [
          {
            provide: PropertyService,
            useValue: propertyServiceSpy,
          },
          {
            provide: SuburbService,
            useValue: suburbServiceSpy,
          },
          {
            provide: OwnerService,
            useValue: ownerServiceSpy,
          },
          {
            provide: ToastService,
            useValue: toastServiceSpy,
          },
          {
            provide: CustomAuthService,
            useValue: customAuthServiceSpy,
          },
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(PropertyFormComponent);
          component = fixture.componentInstance;
          element = fixture.debugElement;
          propertyService = TestBed.inject(PropertyService);
          suburbService = TestBed.inject(SuburbService);
          ownerService = TestBed.inject(OwnerService);
          toastService = TestBed.inject(ToastService);
          customAuthService = TestBed.inject(CustomAuthService);
          component.selectedProperty = propertyForCreation;
          
          propertyService.createProperty.and.returnValue(of(propertyCreationSuccessMessage));
          propertyService.updateProperty.and.returnValue(of(propertyUpdateSuccessMessage));
          propertyService.getPropertyTypes.and.returnValue(of(propertyTypes));
          ownerService.getOwners.and.returnValue(of(owners));
          suburbService.getSuburbs.and.returnValue(of(suburbs));

          fixture.detectChanges();
        });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should create a new property if creation operation succeeds", fakeAsync(() => {
    component.selectedProperty = propertyForCreation;
    fixture.detectChanges();
    tick();
    let unit = fixture.debugElement.query(By.css('#unit')).nativeElement;
    let street = fixture.debugElement.query(By.css('#street')).nativeElement;
    let bedroom = fixture.debugElement.query(By.css('#bedroom')).nativeElement;
    let bathroom = fixture.debugElement.query(By.css('#bathroom')).nativeElement;
    let parking = fixture.debugElement.query(By.css('#parking')).nativeElement;
    let petsAllowed = fixture.debugElement.query(By.css('#petsAllowed')).nativeElement;
    let builtInWardrobe = fixture.debugElement.query(By.css('#builtInWardrobe')).nativeElement;
    let gasAvailable = fixture.debugElement.query(By.css('#gasAvailable')).nativeElement;
    let hasStudyRoom = fixture.debugElement.query(By.css('#hasStudyRoom')).nativeElement;
    let furnished = fixture.debugElement.query(By.css('#furnished')).nativeElement;
    let available = fixture.debugElement.query(By.css('#available')).nativeElement;
    
    expect(unit.value).toBe(component.selectedProperty.unit);
    expect(street.value).toBe(component.selectedProperty.street);

    expect(+bedroom.value).toBe(component.selectedProperty.bedroom);
    expect(+bathroom.value).toBe(component.selectedProperty.bathroom);
    expect(+parking.value).toBe(component.selectedProperty.parking);

    expect(petsAllowed.checked).toBe(component.selectedProperty.petsAllowed);
    expect(builtInWardrobe.checked).toBe(component.selectedProperty.builtInWardrobe);
    expect(gasAvailable.checked).toBe(component.selectedProperty.gasAvailable);
    expect(hasStudyRoom.checked).toBe(component.selectedProperty.hasStudyRoom);
    expect(furnished.checked).toBe(component.selectedProperty.furnished);

    expect(available.value).toBe("TRUE");

    let ngForm = component.ngForm;
    let formValue = ngForm.form.value;
    
    expect(formValue.unit).toBe(component.selectedProperty.unit);
    expect(formValue.street).toBe(component.selectedProperty.street);
    
    expect(formValue.bedroom).toBe(component.selectedProperty.bedroom);
    expect(formValue.bathroom).toBe(component.selectedProperty.bathroom);
    expect(formValue.parking).toBe(component.selectedProperty.parking);

    expect(formValue.petsAllowed).toBe(component.selectedProperty.petsAllowed);
    expect(formValue.builtInWardrobe).toBe(component.selectedProperty.builtInWardrobe);
    expect(formValue.gasAvailable).toBe(component.selectedProperty.gasAvailable);
    expect(formValue.hasStudyRoom).toBe(component.selectedProperty.hasStudyRoom);
    expect(formValue.furnished).toBe(component.selectedProperty.furnished);

    component.onSubmit(ngForm);
    expect(toastService.onSuccessCall).toHaveBeenCalledWith(propertyCreationSuccessMessage, ngForm, navigateTo);
  }));

  it("should update a new property if update operation succeeds", fakeAsync(() => {
    component.selectedProperty = propertyForUpdate;
    fixture.detectChanges();
    tick();
    let unit = fixture.debugElement.query(By.css('#unit')).nativeElement;
    let street = fixture.debugElement.query(By.css('#street')).nativeElement;
    let bedroom = fixture.debugElement.query(By.css('#bedroom')).nativeElement;
    let bathroom = fixture.debugElement.query(By.css('#bathroom')).nativeElement;
    let parking = fixture.debugElement.query(By.css('#parking')).nativeElement;
    let petsAllowed = fixture.debugElement.query(By.css('#petsAllowed')).nativeElement;
    let builtInWardrobe = fixture.debugElement.query(By.css('#builtInWardrobe')).nativeElement;
    let gasAvailable = fixture.debugElement.query(By.css('#gasAvailable')).nativeElement;
    let hasStudyRoom = fixture.debugElement.query(By.css('#hasStudyRoom')).nativeElement;
    let furnished = fixture.debugElement.query(By.css('#furnished')).nativeElement;
    let available = fixture.debugElement.query(By.css('#available')).nativeElement;
    
    expect(unit.value).toBe(component.selectedProperty.unit);
    expect(street.value).toBe(component.selectedProperty.street);

    expect(+bedroom.value).toBe(component.selectedProperty.bedroom);
    expect(+bathroom.value).toBe(component.selectedProperty.bathroom);
    expect(+parking.value).toBe(component.selectedProperty.parking);

    expect(petsAllowed.checked).toBe(component.selectedProperty.petsAllowed);
    expect(builtInWardrobe.checked).toBe(component.selectedProperty.builtInWardrobe);
    expect(gasAvailable.checked).toBe(component.selectedProperty.gasAvailable);
    expect(hasStudyRoom.checked).toBe(component.selectedProperty.hasStudyRoom);
    expect(furnished.checked).toBe(component.selectedProperty.furnished);

    expect(available.value).toBe("TRUE");

    let ngForm = component.ngForm;
    let formValue = ngForm.form.value;
    
    expect(formValue.unit).toBe(component.selectedProperty.unit);
    expect(formValue.street).toBe(component.selectedProperty.street);
    
    expect(formValue.bedroom).toBe(component.selectedProperty.bedroom);
    expect(formValue.bathroom).toBe(component.selectedProperty.bathroom);
    expect(formValue.parking).toBe(component.selectedProperty.parking);

    expect(formValue.petsAllowed).toBe(component.selectedProperty.petsAllowed);
    expect(formValue.builtInWardrobe).toBe(component.selectedProperty.builtInWardrobe);
    expect(formValue.gasAvailable).toBe(component.selectedProperty.gasAvailable);
    expect(formValue.hasStudyRoom).toBe(component.selectedProperty.hasStudyRoom);
    expect(formValue.furnished).toBe(component.selectedProperty.furnished);

    component.onSubmit(ngForm);
    expect(toastService.onSuccessCall).toHaveBeenCalledWith(propertyUpdateSuccessMessage, ngForm, navigateTo);
  }));

  it("should navigate to 'properties' when cancel button is clicked", fakeAsync(() => {
    component.selectedProperty = propertyForCreation;
    fixture.detectChanges();
    tick();
    const cancelButton = element.queryAll(By.css("fieldset button"))[1].nativeElement;
    cancelButton.click();
    expect(customAuthServiceSpy.navigateTo).toHaveBeenCalledWith(navigateTo);
  }));

  it("should clear the form when clear button is clicked", fakeAsync(() => {
    component.selectedProperty = propertyForCreation;
    fixture.detectChanges();
    tick();
    
    let ngForm = component.ngForm;
    let formValue = ngForm.form.value;
    const clearButton = element.queryAll(By.css("fieldset button"))[2].nativeElement;
    clearButton.click();
    fixture.detectChanges();

    expect(formValue.unit).toBe('');
    expect(formValue.street).toBe('');
    
    expect(formValue.bedroom).toBe(0);
    expect(formValue.bathroom).toBe(0);
    expect(formValue.parking).toBe(0);

    expect(formValue.petsAllowed).toBe(false);
    expect(formValue.builtInWardrobe).toBe(false);
    expect(formValue.gasAvailable).toBe(false);
    expect(formValue.hasStudyRoom).toBe(false);
    expect(formValue.furnished).toBe(false);
  }));
});
