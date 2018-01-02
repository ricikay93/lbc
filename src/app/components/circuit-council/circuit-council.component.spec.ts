import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitCouncilComponent } from './circuit-council.component';

describe('CircuitCouncilComponent', () => {
  let component: CircuitCouncilComponent;
  let fixture: ComponentFixture<CircuitCouncilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitCouncilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitCouncilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
