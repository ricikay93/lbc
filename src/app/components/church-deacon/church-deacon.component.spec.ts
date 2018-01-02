import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchDeaconComponent } from './church-deacon.component';

describe('ChurchDeaconComponent', () => {
  let component: ChurchDeaconComponent;
  let fixture: ComponentFixture<ChurchDeaconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChurchDeaconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChurchDeaconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
