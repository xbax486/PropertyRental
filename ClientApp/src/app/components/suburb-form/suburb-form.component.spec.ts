import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuburbFormComponent } from './suburb-form.component';

describe('SuburbFormComponent', () => {
  let component: SuburbFormComponent;
  let fixture: ComponentFixture<SuburbFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuburbFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuburbFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
