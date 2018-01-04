import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchItemComponent } from './church-item.component';

describe('ChurchItemComponent', () => {
  let component: ChurchItemComponent;
  let fixture: ComponentFixture<ChurchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChurchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChurchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
