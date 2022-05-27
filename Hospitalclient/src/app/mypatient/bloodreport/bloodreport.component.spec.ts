import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodreportComponent } from './bloodreport.component';

describe('BloodreportComponent', () => {
  let component: BloodreportComponent;
  let fixture: ComponentFixture<BloodreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
