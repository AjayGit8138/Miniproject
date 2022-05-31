import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomsformComponent } from './symptomsform.component';

describe('SymptomsformComponent', () => {
  let component: SymptomsformComponent;
  let fixture: ComponentFixture<SymptomsformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymptomsformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
