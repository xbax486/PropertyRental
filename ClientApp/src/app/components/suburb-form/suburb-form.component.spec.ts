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
import { ToastyModule } from "ng2-toasty";
import { FormsModule } from "@angular/forms";
import { BehaviorSubject, from, of, scheduled } from "rxjs";

import { SuburbFormComponent } from "./suburb-form.component";
import { SuburbService } from "../../services/suburb.service";
import { ToastService } from "../../services/toast.service";
import { CustomAuthService } from "../../services/custom.auth.service";
import { State } from "src/app/models/state";

describe("SuburbFormComponent", () => {
  let component: SuburbFormComponent;
  let fixture: ComponentFixture<SuburbFormComponent>;
  let element: DebugElement;
  let suburbServiceSpy: any;
  let toastServiceSpy: any;
  let customAuthServiceSpy: any;
  let suburbService: any;
  let toastService: any;
  let customAuthService: any;

  const selectedSuburbSubject = new BehaviorSubject({
    name: "",
    postcode: "",
    state: { name: "", acronym: "", id: -1 },
    stateId: -1,
    id: -1
  });
  const suburbForCreation = {
    name: "Suburb 1",
    postcode: "2050",
    state: { name: "New South Wales", acronym: "NSW", id: 1 },
    stateId: 1,
    id: -1
  };
  const suburbForUpdate = {
    name: "Suburb 2",
    postcode: "2051",
    state: { name: "New South Wales", acronym: "NSW", id: 1 },
    stateId: 1,
    id: 2
  };
  const states: State[] = [
    { name: "New South Wales", acronym: "NSW", id: 1 }
  ]
  const suburbCreationSuccessMessage = "Successfully created a suburb";
  const suburbUpdateSuccessMessage = "Successfully updated a suburb";
  const navigateTo = "suburbs";

  beforeEach(
    waitForAsync(() => {
      suburbServiceSpy = jasmine.createSpyObj("SuburbService", [
        "createSuburb",
        "updateSuburb",
        "getStates"
      ]);
      suburbServiceSpy.selectedSuburbSubject = selectedSuburbSubject;

      toastServiceSpy = jasmine.createSpyObj("ToastService", [
        "onSuccessCall",
        "onErrorCall",
      ]);

      customAuthServiceSpy = jasmine.createSpyObj("CustomAuthService", [
        "navigateTo",
      ]);

      TestBed.configureTestingModule({
        imports: [CommonModule, ToastyModule, FormsModule],
        declarations: [SuburbFormComponent],
        providers: [
          {
            provide: SuburbService,
            useValue: suburbServiceSpy,
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
          fixture = TestBed.createComponent(SuburbFormComponent);
          component = fixture.componentInstance;
          element = fixture.debugElement;
          suburbService = TestBed.inject(SuburbService);
          toastService = TestBed.inject(ToastService);
          customAuthService = TestBed.inject(CustomAuthService);
          
          suburbService.createSuburb.and.returnValue(of(suburbCreationSuccessMessage));
          suburbService.updateSuburb.and.returnValue(of(suburbUpdateSuccessMessage));
          suburbService.getStates.and.returnValue(of(states));
          
          fixture.detectChanges();
        });
    })
  );

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create a new suburb if creation operation succeeds", fakeAsync(() => {
    component.selectedSuburb = suburbForCreation;
    fixture.detectChanges();
    tick();
    let name = fixture.debugElement.query(By.css('#name')).nativeElement;
    let postcode = fixture.debugElement.query(By.css('#postcode')).nativeElement;
    
    expect(name.value).toBe(component.selectedSuburb.name);
    expect(postcode.value).toBe(component.selectedSuburb.postcode);

    let ngForm = component.ngForm;
    let formValue = ngForm.form.value;
    expect(formValue.name).toBe(component.selectedSuburb.name);
    expect(formValue.postcode).toBe(component.selectedSuburb.postcode);

    component.onSubmit(ngForm);
    expect(toastService.onSuccessCall).toHaveBeenCalledWith(suburbCreationSuccessMessage, ngForm, navigateTo);
  }));

  it("should update a suburb if update operation succeeds", fakeAsync(() => {
    component.selectedSuburb = suburbForUpdate;
    fixture.detectChanges();
    tick();
    
    let name = fixture.debugElement.query(By.css('#name')).nativeElement;
    let postcode = fixture.debugElement.query(By.css('#postcode')).nativeElement;
    let stateId = fixture.debugElement.query(By.css('#state')).nativeElement;

    expect(name.value).toBe(component.selectedSuburb.name);
    expect(postcode.value).toBe(component.selectedSuburb.postcode);
    expect(+stateId.value).toBe(component.selectedSuburb.stateId);
    
    let ngForm = component.ngForm;
    let formValue = ngForm.form.value;
    formValue.id = component.selectedSuburb.id;
    expect(formValue.name).toBe(component.selectedSuburb.name);
    expect(formValue.postcode).toBe(component.selectedSuburb.postcode);
    expect(formValue.stateId).toBe(component.selectedSuburb.stateId);

    component.onSubmit(ngForm);
    expect(toastService.onSuccessCall).toHaveBeenCalledWith(suburbUpdateSuccessMessage, ngForm, navigateTo);
  }));

  it("should navigate to 'suburbs' when cancel button is clicked", fakeAsync(() => {
    component.selectedSuburb = suburbForCreation;
    fixture.detectChanges();
    tick();
    const cancelButton = element.queryAll(By.css("fieldset button"))[1].nativeElement;
    cancelButton.click();
    expect(customAuthServiceSpy.navigateTo).toHaveBeenCalledWith(navigateTo);
  }));

  it("should clear the form when clear button is clicked", fakeAsync(() => {
    component.selectedSuburb = suburbForCreation;
    let ngForm = component.ngForm;
    let formValue = ngForm.form.value;
    const clearButton = element.queryAll(By.css("fieldset button"))[2].nativeElement;
    clearButton.click();
    fixture.detectChanges();
    expect(formValue.name).toEqual('');
    expect(formValue.postcode).toEqual('');
    expect(formValue.stateId).toEqual(-1);
  }));
});
