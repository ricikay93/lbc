import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialOutreachComponent } from './social-outreach.component';

describe('SocialOutreachComponent', () => {
  let component: SocialOutreachComponent;
  let fixture: ComponentFixture<SocialOutreachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialOutreachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialOutreachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
