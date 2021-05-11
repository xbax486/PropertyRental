import { Tenant } from 'src/app/models/tenant';
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
import { ToastyModule } from "ng2-toasty";
import { BehaviorSubject, of } from "rxjs";

import { RentalFormComponent } from "./rental-form.component";
import { RentalService } from "../../services/rental.service";
import { PropertyService } from "../../services/property.service";
import { TenantService } from "../../services/tenant.service";
import { ToastService } from "../../services/toast.service";
import { CustomAuthService } from "../../services/custom.auth.service";
import { Property } from "src/app/models/property";


describe('RentalFormComponent', () => {
  let component: RentalFormComponent;
  let fixture: ComponentFixture<RentalFormComponent>;
  let element: DebugElement;

  let rentalServiceSpy: any;
  let propertyServiceSpy: any;
  let tenantServiceSpy: any;
  let toastServiceSpy: any;
  let customAuthServiceSpy: any;

  let rentalService: any;
  let propertyService: any;
  let tenantService: any;
  let toastService: any;
  let customAuthService: any;

  const selectedRentalSubject = new BehaviorSubject({ 
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
  });
  const rentalForCreation = {
    property: { 
      unit: '123',
      street: '45 Test Street',
      suburb: { 
        name: "Suburb 1",
        postcode: "2050",
        state: { 
          name: "New South Wales",
          acronym: "NSW",
          id: 1
        },
        stateId: 1,
        id: 1
      },
      suburbId: 1,
      owner: { 
        name: "Owner 1",
        id: 1 
      },
      ownerId: 1,
      propertyTypeId: 1,
      bedroom: 3,
      bathroom: 2,
      parking: 2,
      petsAllowed: true,
      builtInWardrobe: false,
      gasAvailable: true,
      hasStudyRoom: false,
      furnished: false,
      available: true,
      id: 1
    },
    propertyId: 1,
    tenant: {
      name: "Tenant 1",
      email: "tenant1example.com",
      mobile: "0412345678",
      id: 1
    },
    tenantId: 1,
    startDate: '2019-08-15',
    endDate: '2020-10-06',
    payment: 300,
    id: -1
  };
  const rentalForUpdate = {
    property: { 
      unit: '678',
      street: '56 Test Street',
      suburb: { 
        name: "Suburb 1",
        postcode: "2050",
        state: { 
          name: "New South Wales",
          acronym: "NSW",
          id: 1
        },
        stateId: 1,
        id: 1
      },
      suburbId: 1,
      owner: { 
        name: "Owner 1",
        id: 1 
      },
      ownerId: 1,
      propertyTypeId: 1,
      bedroom: 3,
      bathroom: 2,
      parking: 2,
      petsAllowed: true,
      builtInWardrobe: false,
      gasAvailable: true,
      hasStudyRoom: false,
      furnished: false,
      available: true,
      id: 1
    },
    propertyId: 1,
    tenant: {
      name: "Tenant 1",
      email: "tenant1example.com",
      mobile: "0412345678",
      id: 1
    },
    tenantId: 1,
    startDate: '2019-09-10',
    endDate: '2020-05-10',
    payment: 300,
    id: 1
  };

  const rentalCreationSuccessMessage = "Successfully created a rental record";
  const rentalUpdateSuccessMessage = "Successfully updated a rental record";
  const navigateTo = "rentals";

  const availableProperties: Property[] = [
    {
      owner: { 
        name: "Owner 1",
        email: "owner1@example.com",
        mobile: "0412345678",
        id: 1
      },
      ownerId: 1,
      suburb: { 
        name: "Suburb 1",
        postcode: "2050",
        state: { 
          name: "New South Wales",
          acronym: "NSW",
          id: 1
        },
        stateId: 1,
        id: 1
      },
      suburbId: 1,
      propertyType: { 
        name: "House",
        id: 1
      },
      propertyTypeId: 1,
      bedroom: 3,
      bathroom: 2,
      parking: 2,
      petsAllowed: true,
      builtInWardrobe: false,
      gasAvailable: true,
      hasStudyRoom: false,
      furnished: false,
      available: true,
      street: "Test Street 1",
      unit: "Test Unit 1",
      id: 1
    },
    {
      owner: { 
        name: "Owner 1",
        email: "owner1@example.com",
        mobile: "0412345678",
        id: 1
      },
      ownerId: 1,
      suburb: { 
        name: "Suburb 2",
        postcode: "2050",
        state: { 
          name: "New South Wales",
          acronym: "NSW",
          id: 1
        },
        stateId: 1,
        id: 2
      },
      suburbId: 1,
      propertyType: { 
        name: "House",
        id: 1
      },
      propertyTypeId: 1,
      bedroom: 3,
      bathroom: 2,
      parking: 2,
      petsAllowed: true,
      builtInWardrobe: false,
      gasAvailable: true,
      hasStudyRoom: false,
      furnished: false,
      available: true,
      street: "Test Street 1",
      unit: "Test Unit 1",
      id: 2
    },
    {
      owner: { 
        name: "Owner 1",
        email: "owner1@example.com",
        mobile: "0412345678",
        id: 1
      },
      ownerId: 1,
      suburb: { 
        name: "Suburb 3",
        postcode: "2050",
        state: { 
          name: "New South Wales",
          acronym: "NSW",
          id: 1
        },
        stateId: 1,
        id: 3
      },
      suburbId: 1,
      propertyType: { 
        name: "House",
        id: 1
      },
      propertyTypeId: 1,
      bedroom: 3,
      bathroom: 2,
      parking: 2,
      petsAllowed: true,
      builtInWardrobe: false,
      gasAvailable: true,
      hasStudyRoom: false,
      furnished: false,
      available: true,
      street: "Test Street 1",
      unit: "Test Unit 1",
      id: 3
    },
  ];
  const availableTenants: Tenant[] = [
    {
      name: "Tenant 1",
      email: "tenant1example.com",
      mobile: "0412345671",
      id: 1
    },
    {
      name: "Tenant 2",
      email: "tenant1example.com",
      mobile: "0412345672",
      id: 2
    },
    {
      name: "Tenant 3",
      email: "tenant3example.com",
      mobile: "0412345673",
      id: 3
    }
  ];

  beforeEach(
    waitForAsync(() => {
      rentalServiceSpy = jasmine.createSpyObj("RentalService", [
        "createRental",
        "updateRental"
      ]);
      rentalServiceSpy.selectedRentalSubject = selectedRentalSubject;

      propertyServiceSpy = jasmine.createSpyObj("PropertyService", [
        "getProperties"
      ]);

      tenantServiceSpy = jasmine.createSpyObj("TenantService", [
        "getTenants"
      ]);

      toastServiceSpy = jasmine.createSpyObj("ToastService", [
        "onSuccessCall",
        "onErrorCall",
      ]);

      customAuthServiceSpy = jasmine.createSpyObj("CustomAuthService", [
        "navigateTo"
      ]);

      TestBed.configureTestingModule({
        imports: [CommonModule, ToastyModule, FormsModule],
        declarations: [RentalFormComponent],
        providers: [
          {
            provide: RentalService,
            useValue: rentalServiceSpy,
          },
          {
            provide: PropertyService,
            useValue: propertyServiceSpy,
          },
          {
            provide: TenantService,
            useValue: tenantServiceSpy,
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
          fixture = TestBed.createComponent(RentalFormComponent);
          component = fixture.componentInstance;
          element = fixture.debugElement;
          rentalService = TestBed.inject(RentalService);
          propertyService = TestBed.inject(PropertyService);
          tenantService = TestBed.inject(TenantService);
          toastService = TestBed.inject(ToastService);
          customAuthService = TestBed.inject(CustomAuthService);
          component.selectedRental = rentalForCreation;
          
          rentalService.createRental.and.returnValue(of(rentalCreationSuccessMessage));
          rentalService.updateRental.and.returnValue(of(rentalUpdateSuccessMessage));
          propertyService.getProperties.and.returnValue(of(availableProperties));
          tenantService.getTenants.and.returnValue(of(availableTenants));

          fixture.detectChanges();
        });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should create a new rental record if creation operation succeeds", fakeAsync(() => {
    component.selectedRental = rentalForCreation;
    fixture.detectChanges();
    tick();
    
    let owner = fixture.debugElement.query(By.css('#owner')).nativeElement;
    let tenant = fixture.debugElement.query(By.css('#selected-tenant')).nativeElement;
    let unit = fixture.debugElement.query(By.css('#unit')).nativeElement;
    let street = fixture.debugElement.query(By.css('#street')).nativeElement;
    let suburb = fixture.debugElement.query(By.css('#suburb')).nativeElement;
    let state = fixture.debugElement.query(By.css('#state')).nativeElement;
    let payment = fixture.debugElement.query(By.css('#payment')).nativeElement;
    let startDate = fixture.debugElement.query(By.css('#startDate')).nativeElement;
    let endDate = fixture.debugElement.query(By.css('#endDate')).nativeElement;
    
    expect(owner.value).toBe(component.selectedRental.property.owner.name);
    expect(tenant.value).toBe(component.selectedRental.tenant.name);
    expect(unit.value).toBe(component.selectedRental.property.unit);
    expect(street.value).toBe(component.selectedRental.property.street);
    expect(suburb.value).toBe(component.selectedRental.property.suburb.name);
    expect(state.value).toBe(component.selectedRental.property.suburb.state.name);
    expect(+payment.value).toBe(component.selectedRental.payment);
    expect(startDate.value).toBe(component.selectedRental.startDate);
    expect(endDate.value).toBe(component.selectedRental.endDate);

    let ngForm = component.ngForm;
    let formValue = ngForm.form.value;
    
    expect(formValue.payment).toBe(component.selectedRental.payment);
    expect(formValue.startDate).toBe(component.selectedRental.startDate);
    expect(formValue.endDate).toBe(component.selectedRental.endDate);

    component.onSubmit(ngForm);
    expect(toastService.onSuccessCall).toHaveBeenCalledWith(rentalCreationSuccessMessage, ngForm, navigateTo);
  }));

  it("should update a new rental record if update operation succeeds", fakeAsync(() => {
    component.selectedRental = rentalForUpdate;
    fixture.detectChanges();
    tick();
    
    let owner = fixture.debugElement.query(By.css('#owner')).nativeElement;
    let tenant = fixture.debugElement.query(By.css('#selected-tenant')).nativeElement;
    let unit = fixture.debugElement.query(By.css('#unit')).nativeElement;
    let street = fixture.debugElement.query(By.css('#street')).nativeElement;
    let suburb = fixture.debugElement.query(By.css('#suburb')).nativeElement;
    let state = fixture.debugElement.query(By.css('#state')).nativeElement;
    let payment = fixture.debugElement.query(By.css('#payment')).nativeElement;
    let startDate = fixture.debugElement.query(By.css('#startDate')).nativeElement;
    let endDate = fixture.debugElement.query(By.css('#endDate')).nativeElement;
    
    expect(owner.value).toBe(component.selectedRental.property.owner.name);
    expect(tenant.value).toBe(component.selectedRental.tenant.name);
    expect(unit.value).toBe(component.selectedRental.property.unit);
    expect(street.value).toBe(component.selectedRental.property.street);
    expect(suburb.value).toBe(component.selectedRental.property.suburb.name);
    expect(state.value).toBe(component.selectedRental.property.suburb.state.name);
    expect(+payment.value).toBe(component.selectedRental.payment);
    expect(startDate.value).toBe(component.selectedRental.startDate);
    expect(endDate.value).toBe(component.selectedRental.endDate);

    let ngForm = component.ngForm;
    let formValue = ngForm.form.value;
    
    expect(formValue.payment).toBe(component.selectedRental.payment);
    expect(formValue.startDate).toBe(component.selectedRental.startDate);
    expect(formValue.endDate).toBe(component.selectedRental.endDate);

    component.onSubmit(ngForm);
    expect(toastService.onSuccessCall).toHaveBeenCalledWith(rentalUpdateSuccessMessage, ngForm, navigateTo);
  }));

  it("should navigate to 'rentals' when cancel button is clicked", fakeAsync(() => {
    component.selectedRental = rentalForCreation;
    fixture.detectChanges();
    tick();
    const cancelButton = element.queryAll(By.css("fieldset button"))[1].nativeElement;
    cancelButton.click();
    expect(customAuthServiceSpy.navigateTo).toHaveBeenCalledWith(navigateTo);
  }));

  it("should clear the form when clear button is clicked", fakeAsync(() => {
    component.selectedRental = rentalForCreation;
    fixture.detectChanges();
    tick();
    
    let ngForm = component.ngForm;
    let formValue = ngForm.form.value;
    const clearButton = element.queryAll(By.css("fieldset button"))[2].nativeElement;
    clearButton.click();
    fixture.detectChanges();

    expect(formValue.payment).toBe(0);
    expect(formValue.startDate).toBe('');
    expect(formValue.endDate).toBe('');
  }));
});
