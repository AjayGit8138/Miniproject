import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientenquiryComponent } from './patientenquiry.component';

describe('PatientenquiryComponent', () => {
  let component: PatientenquiryComponent;
  let fixture: ComponentFixture<PatientenquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientenquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientenquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
