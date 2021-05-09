import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { BehaviorSubject, of } from "rxjs";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";

import { OwnerFormComponent } from "./owner-form.component";
import { OwnerService } from "../../services/owner.service";
import { ToastService } from "../../services/toast.service";
import { CustomAuthService } from "../../services/custom.auth.service";
import { Owner } from "src/app/models/owner";

fdescribe("OwnerFormComponent", () => {
  let component: OwnerFormComponent;
  let fixture: ComponentFixture<OwnerFormComponent>;
  let element: DebugElement;
  let ownerServiceSpy: any;
  let toastServiceSpy: any;
  let customAuthServiceSpy: any;
  let ownerService: any;
  let toastService: any;
  let customAuthService: any;

  const selectedOwnerSubject = new BehaviorSubject({
    name: "",
    email: "",
    mobile: "",
    id: -1,
  });
  const ownerForCreation = {
    name: "Owner 2",
    email: "owner2example.com",
    mobile: "0412345672",
    id: -1,
  };
  const ownerForUpdate = {
    name: "Owner 1",
    email: "owner1example.com",
    mobile: "0412345678",
    id: 1,
  };
  const ownerCreationSuccessMessage = "Successfully created an owner";
  const ownerUpdateSuccessMessage = "Successfully updated an owner";
  const navigateTo = "owners";

  beforeEach(
    waitForAsync(() => {
      ownerServiceSpy = jasmine.createSpyObj("OwnerService", [
        "createOwner",
        "updateOwner",
      ]);
      ownerServiceSpy.selectedOwnerSubject = selectedOwnerSubject;

      toastServiceSpy = jasmine.createSpyObj("ToastService", [
        "onSuccessCall",
        "onErrorCall",
      ]);

      customAuthServiceSpy = jasmine.createSpyObj("CustomAuthService", [
        "navigateTo",
      ]);

      TestBed.configureTestingModule({
        imports: [CommonModule, FormsModule],
        declarations: [OwnerFormComponent],
        providers: [
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
          fixture = TestBed.createComponent(OwnerFormComponent);
          component = fixture.componentInstance;
          element = fixture.debugElement;
          ownerService = TestBed.inject(OwnerService);
          toastService = TestBed.inject(ToastService);
          customAuthService = TestBed.inject(CustomAuthService);
          component.selectedOwner = ownerForCreation;
          fixture.detectChanges();
          ownerService.createOwner.and.returnValue(of(ownerCreationSuccessMessage));
        });
    })
  );

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create a new owner if creation operation succeeds", fakeAsync(() => {
    component.selectedOwner = ownerForCreation;
    fixture.detectChanges();
    tick();
    let name = fixture.debugElement.query(By.css('#name')).nativeElement;
    let email = fixture.debugElement.query(By.css('#email')).nativeElement;
    let mobile = fixture.debugElement.query(By.css('#mobile')).nativeElement;

    expect(name.value).toBe(component.selectedOwner.name);
    expect(email.value).toBe(component.selectedOwner.email);
    expect(mobile.value).toBe(component.selectedOwner.mobile);

    let ngForm = component.ngForm;
    let formValue = ngForm.form.value;
    expect(formValue.name).toBe(component.selectedOwner.name);
    expect(formValue.email).toBe(component.selectedOwner.email);
    expect(formValue.mobile).toBe(component.selectedOwner.mobile);

    component.onSubmit(ngForm);
    expect(toastService.onSuccessCall).toHaveBeenCalledWith(ownerCreationSuccessMessage, ngForm, navigateTo);
  }));

  it("should navigate to 'owners' when cancel button is clicked", fakeAsync(() => {
    component.selectedOwner = ownerForCreation;
    fixture.detectChanges();
    tick();
    const cancelButton = element.queryAll(By.css("fieldset button"))[1].nativeElement;
    cancelButton.click();
    expect(customAuthServiceSpy.navigateTo).toHaveBeenCalledWith(navigateTo);
  }));

  it("should clear the form when reset button is clicked", fakeAsync(() => {
    component.selectedOwner = ownerForCreation;
    fixture.detectChanges();
    tick();
    let ngForm = component.ngForm;
    let formValue = ngForm.form.value;
    const resetButton = element.queryAll(By.css("fieldset button"))[2].nativeElement;
    resetButton.click();
    fixture.detectChanges();
    expect(formValue.name).toEqual('');
    expect(formValue.email).toEqual('');
    expect(formValue.mobile).toEqual('');
  }));
});
