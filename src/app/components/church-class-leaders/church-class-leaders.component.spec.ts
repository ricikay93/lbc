import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchClassLeadersComponent } from './church-class-leaders.component';

describe('ChurchClassLeadersComponent', () => {
  let component: ChurchClassLeadersComponent;
  let fixture: ComponentFixture<ChurchClassLeadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChurchClassLeadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChurchClassLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
