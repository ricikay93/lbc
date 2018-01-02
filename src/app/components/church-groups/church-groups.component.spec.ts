import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchGroupsComponent } from './church-groups.component';

describe('ChurchGroupsComponent', () => {
  let component: ChurchGroupsComponent;
  let fixture: ComponentFixture<ChurchGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChurchGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChurchGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
