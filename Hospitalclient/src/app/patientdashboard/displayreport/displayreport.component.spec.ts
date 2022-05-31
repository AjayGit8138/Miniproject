import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayreportComponent } from './displayreport.component';

describe('DisplayreportComponent', () => {
  let component: DisplayreportComponent;
  let fixture: ComponentFixture<DisplayreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
