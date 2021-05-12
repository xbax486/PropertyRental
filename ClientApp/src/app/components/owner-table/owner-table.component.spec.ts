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
import { OwnerTableComponent } from "./owner-table.component";
import { OwnerService } from "../../services/owner.service";
import { ToastService } from "../../services/toast.service";
import { OwnerQuery } from './../../models/query/ownerQuery';

describe('OwnerTableComponent', () => {
  let component: OwnerTableComponent;
  let fixture: ComponentFixture<OwnerTableComponent>;
  let ownerServiceSpy: any;
  let toastServiceSpy: any;
  let ownerService: any;
  let toastService: any;

  const selectedOwnerSubject = new BehaviorSubject({
    name: "",
    email: "",
    mobile: "",
    id: -1,
  });

  const ownersQueryResult = {
    totalItems: 3,
    items: [
      {
        name: "Owner 1",
        email: "owner1example.com",
        mobile: "0412345678",
        id: 1
      },
      {
        name: "Owner 2",
        email: "owner2example.com",
        mobile: "0412345672",
        id: 2
      },
      {
        name: "Owner 3",
        email: "owner3example.com",
        mobile: "0412345673",
        id: 3
      }
    ]
  };

  const ownerForDeletion = {
    name: "Owner 2",
    email: "owner2example.com",
    mobile: "0412345672",
    id: 2
  };

  const query: OwnerQuery = { sortBy: '', isSortedAscending: true, page: 1, pageSize: 3 };

  const ownerDeletionSuccessMessage = "Successfully delete an owner";
  const navigateTo = "owners";

  beforeEach(waitForAsync(() => {
    ownerServiceSpy = jasmine.createSpyObj("OwnerService", [
      "deleteOwner",
      "getOwners",
    ]);
    ownerServiceSpy.selectedOwnerSubject = selectedOwnerSubject;

    toastServiceSpy = jasmine.createSpyObj("ToastService", [
      "onSuccessCall",
      "onErrorCall",
    ]);

    TestBed.configureTestingModule({
      imports: [CommonModule, ToastyModule],
      declarations: [OwnerTableComponent],
      providers: [
        {
          provide: OwnerService,
          useValue: ownerServiceSpy,
        },
        {
          provide: ToastService,
          useValue: toastServiceSpy,
        }
      ],
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(OwnerTableComponent);
      component = fixture.componentInstance;
      ownerService = TestBed.inject(OwnerService);
      toastService = TestBed.inject(ToastService);
      
      component.query = query;
      ownerService.deleteOwner.and.returnValue(of(ownerDeletionSuccessMessage));
      ownerService.getOwners.and.returnValue(of(ownersQueryResult));
      
      fixture.detectChanges();
    });
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.owners).toEqual(ownersQueryResult.items);
  });

  it("should delete a new owner if delete operation succeeds", fakeAsync(() => {
    component.onDeleteOwner(ownerForDeletion);
    fixture.detectChanges();
    tick();
    expect(component.owners.length).toBe(2);
    expect(toastService.onSuccessCall).toHaveBeenCalledWith(ownerDeletionSuccessMessage);
  }));

  it("should update the sortBy property of the query if the current value is not equal to the passed one", fakeAsync(() => {
    component.sortBy('name');
    fixture.detectChanges();
    tick();
    expect(component.query.sortBy).toBe('name');
    expect(component.query.isSortedAscending).toBeTruthy();
  }));

  it("should reverse the isSortedAscending property of the query if the current value is equal to the passed one", fakeAsync(() => {
    component.query.sortBy = 'name';
    component.sortBy('name');
    fixture.detectChanges();
    tick();
    expect(component.query.isSortedAscending).toBeFalsy();
  }));

  it("should change the page of the pagination and get owners according to the page and page size", fakeAsync(() => {
    component.owners = [];
    component.onPageChanged(2);
    fixture.detectChanges();
    tick();
    expect(component.query.page).toBe(2);
  }));
});
