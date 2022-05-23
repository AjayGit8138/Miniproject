import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanreportComponent } from './scanreport.component';

describe('ScanreportComponent', () => {
  let component: ScanreportComponent;
  let fixture: ComponentFixture<ScanreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
