import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchAddEditComponent } from './church-add-edit.component';

describe('ChurchAddEditComponent', () => {
  let component: ChurchAddEditComponent;
  let fixture: ComponentFixture<ChurchAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChurchAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChurchAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
