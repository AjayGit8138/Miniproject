import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourdoctorComponent } from './yourdoctor.component';

describe('YourdoctorComponent', () => {
  let component: YourdoctorComponent;
  let fixture: ComponentFixture<YourdoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourdoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourdoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
