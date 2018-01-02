import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitAddEditComponent } from './circuit-add-edit.component';

describe('CircuitAddEditComponent', () => {
  let component: CircuitAddEditComponent;
  let fixture: ComponentFixture<CircuitAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
