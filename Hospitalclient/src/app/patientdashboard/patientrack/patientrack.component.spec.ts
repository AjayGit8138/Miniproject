import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientrackComponent } from './patientrack.component';

describe('PatientrackComponent', () => {
  let component: PatientrackComponent;
  let fixture: ComponentFixture<PatientrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
