import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastyModule } from "ng2-toasty";
import { BehaviorSubject, of } from "rxjs";
import { PropertyTableComponent } from "./property-table.component";
import { PropertyService } from "../../services/property.service";
import { SuburbService } from "../../services/suburb.service";
import { ToastService } from "../../services/toast.service";
import { PropertyQuery } from './../../models/query/propertyQuery';
import { QueryResult } from "src/app/models/query/queryResult";
import { Suburb } from "src/app/models/suburb";
import { State } from './../../models/state';

describe('PropertyTableComponent', () => {
  let component: PropertyTableComponent;
  let fixture: ComponentFixture<PropertyTableComponent>;
  let propertyServiceSpy: any;
  let suburbServiceSpy: any;
  let toastServiceSpy: any;
  let propertyService: any;
  let suburbService: any;
  let toastService: any;

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

  const propertiesQueryResult = {
    totalItems: 3,
    items: [
      {
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
        street: "Test Street 1",
        unit: "Test Unit 1",
        id: 1
      },
      {
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
      },
      {
        owner: { 
          name: "Owner 3" 
        },
        ownerId: 3,
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
        street: "Test Street 3",
        unit: "Test Unit 3",
        id: 3
      }
    ]
  };

  const suburbsQueryResult: QueryResult<Suburb> = {
    totalItems: 3,
    items: [
      {
        name: "Test suburb 1",
        postcode: "2050",
        state: {
          name: "New South Wales",
          acronym: "NSW",
          id: 1,
        },
        stateId: 1,
        id: 1,
      },
      {
        name: "Test suburb 2",
        postcode: "2050",
        state: {
          name: "New South Wales",
          acronym: "NSW",
          id: 1,
        },
        stateId: 1,
        id: 2,
      },
      {
        name: "Test suburb 3",
        postcode: "2050",
        state: {
          name: "New South Wales",
          acronym: "NSW",
          id: 1,
        },
        stateId: 1,
        id: 3,
      },
    ],
  };

  const statesQueryResult: State[] = [
    {
      name: "New South Wales", 
      acronym: "NSW", 
      id: 1
    },
    {
      name: "Victoria", 
      acronym: "VIC", 
      id: 2
    },
    {
      name: "Australian Capital Territory", 
      acronym: "ACT", 
      id: 3
    }
  ];

  const propertyForDeletion = {
    owner: { 
      name: "Owner 2",
      email: "owner2@example.com",
      mobile: "0412345678",
      id: 2 
    },
    ownerId: 2,
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

  const query: PropertyQuery = { stateId: -1, suburbId: -1, available: -1, sortBy: '', isSortedAscending: true, page: 1, pageSize: 3 };

  const propertyDeletionSuccessMessage = "Successfully delete a property";

  beforeEach(waitForAsync(() => {
    propertyServiceSpy = jasmine.createSpyObj("PropertyService", [
      "deleteProperty",
      "getProperties",
    ]);
    propertyServiceSpy.selectedOwnerSubject = selectedPropertySubject;

    suburbServiceSpy = jasmine.createSpyObj("PropertyService", [
      "getSuburbs",
      "getStates",
    ]);

    toastServiceSpy = jasmine.createSpyObj("ToastService", [
      "onSuccessCall",
      "onErrorCall",
    ]);

    TestBed.configureTestingModule({
      imports: [CommonModule, ToastyModule],
      declarations: [PropertyTableComponent],
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
          provide: ToastService,
          useValue: toastServiceSpy,
        }
      ],
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(PropertyTableComponent);
      component = fixture.componentInstance;
      propertyService = TestBed.inject(PropertyService);
      suburbService = TestBed.inject(SuburbService);
      toastService = TestBed.inject(ToastService);
      
      component.query = query;
      propertyService.deleteProperty.and.returnValue(of(propertyDeletionSuccessMessage));
      propertyService.getProperties.and.returnValue(of(propertiesQueryResult));
      suburbService.getSuburbs.and.returnValue(of(suburbsQueryResult));
      suburbService.getStates.and.returnValue(of(statesQueryResult));
      
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should delete a property if delete operation succeeds", fakeAsync(() => {
    component.onDeleteProperty(propertyForDeletion);
    fixture.detectChanges();
    tick();
    expect(component.properties.length).toBe(2);
    expect(toastService.onSuccessCall).toHaveBeenCalledWith(propertyDeletionSuccessMessage);
  }));

  it("should update the sortBy property of the query if the current value is not equal to the passed one", fakeAsync(() => {
    component.sortBy('suburb');
    fixture.detectChanges();
    tick();
    expect(component.query.sortBy).toBe('suburb');
    expect(component.query.isSortedAscending).toBeTruthy();
  }));

  it("should reverse the isSortedAscending property of the query if the current value is equal to the passed one", fakeAsync(() => {
    component.query.sortBy = 'suburb';
    component.sortBy('suburb');
    fixture.detectChanges();
    tick();
    expect(component.query.isSortedAscending).toBeFalsy();
  }));

  it("should change the page of the pagination and get owners according to the page and page size", fakeAsync(() => {
    component.properties = [];
    component.onPageChanged(2);
    fixture.detectChanges();
    tick();
    expect(component.query.page).toBe(2);
  }));
});
