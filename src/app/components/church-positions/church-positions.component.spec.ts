import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchPositionsComponent } from './church-positions.component';

describe('ChurchPositionsComponent', () => {
  let component: ChurchPositionsComponent;
  let fixture: ComponentFixture<ChurchPositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChurchPositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChurchPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
