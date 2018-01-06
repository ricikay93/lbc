import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorItemComponent } from './visitor-item.component';

describe('VisitorItemComponent', () => {
  let component: VisitorItemComponent;
  let fixture: ComponentFixture<VisitorItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
