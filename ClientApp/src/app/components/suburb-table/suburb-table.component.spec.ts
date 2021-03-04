import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuburbTableComponent } from './suburb-table.component';

describe('SuburbTableComponent', () => {
  let component: SuburbTableComponent;
  let fixture: ComponentFixture<SuburbTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuburbTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuburbTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
