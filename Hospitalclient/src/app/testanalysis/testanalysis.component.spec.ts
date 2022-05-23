import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestanalysisComponent } from './testanalysis.component';

describe('TestanalysisComponent', () => {
  let component: TestanalysisComponent;
  let fixture: ComponentFixture<TestanalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestanalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
