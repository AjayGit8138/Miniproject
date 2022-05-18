import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentdivisionComponent } from './treatmentdivision.component';

describe('TreatmentdivisionComponent', () => {
  let component: TreatmentdivisionComponent;
  let fixture: ComponentFixture<TreatmentdivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentdivisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentdivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
