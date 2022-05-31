import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodcountComponent } from './bloodcount.component';

describe('BloodcountComponent', () => {
  let component: BloodcountComponent;
  let fixture: ComponentFixture<BloodcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodcountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
