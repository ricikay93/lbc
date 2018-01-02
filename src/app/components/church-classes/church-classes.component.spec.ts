import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchClassesComponent } from './church-classes.component';

describe('ChurchClassesComponent', () => {
  let component: ChurchClassesComponent;
  let fixture: ComponentFixture<ChurchClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChurchClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChurchClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
