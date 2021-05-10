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

import { TenantFormComponent } from "./tenant-form.component";
import { TenantService } from "../../services/tenant.service";
import { ToastService } from "../../services/toast.service";
import { CustomAuthService } from "../../services/custom.auth.service";

describe("TenantFormComponent", () => {
  let component: TenantFormComponent;
  let fixture: ComponentFixture<TenantFormComponent>;
  let element: DebugElement;
  let tenantServiceSpy: any;
  let toastServiceSpy: any;
  let customAuthServiceSpy: any;
  let tenantService: any;
  let toastService: any;
  let customAuthService: any;

  const selectedTenantSubject = new BehaviorSubject({
    name: "",
    email: "",
    mobile: "",
    id: -1,
  });
  const tenantForCreation = {
    name: "Tenant 2",
    email: "tenant2example.com",
    mobile: "0412345672",
    id: -1,
  };
  const tenantForUpdate = {
    name: "Tenant 1",
    email: "tenant1example.com",
    mobile: "0412345678",
    id: 1,
  };
  const tenantCreationSuccessMessage = "Successfully created a tenant";
  const tenantUpdateSuccessMessage = "Successfully updated a tenant";
  const navigateTo = "tenants";

  beforeEach(
    waitForAsync(() => {
      tenantServiceSpy = jasmine.createSpyObj("TenantService", [
        "createTenant",
        "updateTenant",
      ]);
      tenantServiceSpy.selectedTenantSubject = selectedTenantSubject;

      toastServiceSpy = jasmine.createSpyObj("ToastService", [
        "onSuccessCall",
        "onErrorCall",
      ]);

      customAuthServiceSpy = jasmine.createSpyObj("CustomAuthService", [
        "navigateTo",
      ]);

      TestBed.configureTestingModule({
        imports: [CommonModule, FormsModule],
        declarations: [TenantFormComponent],
        providers: [
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
          fixture = TestBed.createComponent(TenantFormComponent);
          component = fixture.componentInstance;
          element = fixture.debugElement;
          tenantService = TestBed.inject(TenantService);
          toastService = TestBed.inject(ToastService);
          customAuthService = TestBed.inject(CustomAuthService);
          component.selectedTenant = tenantForCreation;
          
          tenantService.createTenant.and.returnValue(of(tenantCreationSuccessMessage));
          tenantService.updateTenant.and.returnValue(of(tenantUpdateSuccessMessage));
          
          fixture.detectChanges();
        });
    })
  );

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create a new tenant if creation operation succeeds", fakeAsync(() => {
    component.selectedTenant = tenantForCreation;
    fixture.detectChanges();
    tick();
    let name = fixture.debugElement.query(By.css('#name')).nativeElement;
    let email = fixture.debugElement.query(By.css('#email')).nativeElement;
    let mobile = fixture.debugElement.query(By.css('#mobile')).nativeElement;

    expect(name.value).toBe(component.selectedTenant.name);
    expect(email.value).toBe(component.selectedTenant.email);
    expect(mobile.value).toBe(component.selectedTenant.mobile);

    let ngForm = component.ngForm;
    let formValue = ngForm.form.value;
    expect(formValue.name).toBe(component.selectedTenant.name);
    expect(formValue.email).toBe(component.selectedTenant.email);
    expect(formValue.mobile).toBe(component.selectedTenant.mobile);

    component.onSubmit(ngForm);
    expect(toastService.onSuccessCall).toHaveBeenCalledWith(tenantCreationSuccessMessage, ngForm, navigateTo);
  }));

  it("should update a tenant if update operation succeeds", fakeAsync(() => {
    component.selectedTenant = tenantForUpdate;
    fixture.detectChanges();
    tick();
    
    let name = fixture.debugElement.query(By.css('#name')).nativeElement;
    let email = fixture.debugElement.query(By.css('#email')).nativeElement;
    let mobile = fixture.debugElement.query(By.css('#mobile')).nativeElement;

    expect(name.value).toBe(component.selectedTenant.name);
    expect(email.value).toBe(component.selectedTenant.email);
    expect(mobile.value).toBe(component.selectedTenant.mobile);
    
    let ngForm = component.ngForm;
    let formValue = ngForm.form.value;
    formValue.id = component.selectedTenant.id;
    expect(formValue.name).toBe(component.selectedTenant.name);
    expect(formValue.email).toBe(component.selectedTenant.email);
    expect(formValue.mobile).toBe(component.selectedTenant.mobile);

    component.onSubmit(ngForm);
    expect(toastService.onSuccessCall).toHaveBeenCalledWith(tenantUpdateSuccessMessage, ngForm, navigateTo);
  }));

  it("should navigate to 'tenants' when cancel button is clicked", fakeAsync(() => {
    component.selectedTenant = tenantForCreation;
    fixture.detectChanges();
    tick();
    const cancelButton = element.queryAll(By.css("fieldset button"))[1].nativeElement;
    cancelButton.click();
    expect(customAuthServiceSpy.navigateTo).toHaveBeenCalledWith(navigateTo);
  }));

  it("should clear the form when clear button is clicked", fakeAsync(() => {
    component.selectedTenant = tenantForCreation;
    let ngForm = component.ngForm;
    let formValue = ngForm.form.value;
    const clearButton = element.queryAll(By.css("fieldset button"))[2].nativeElement;
    clearButton.click();
    fixture.detectChanges();
    expect(formValue.name).toEqual('');
    expect(formValue.email).toEqual('');
    expect(formValue.mobile).toEqual('');
  }));
});
