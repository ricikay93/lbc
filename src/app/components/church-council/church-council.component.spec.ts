import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchCouncilComponent } from './church-council.component';

describe('ChurchCouncilComponent', () => {
  let component: ChurchCouncilComponent;
  let fixture: ComponentFixture<ChurchCouncilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChurchCouncilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChurchCouncilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
