import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoradminComponent } from './doctoradmin.component';

describe('DoctoradminComponent', () => {
  let component: DoctoradminComponent;
  let fixture: ComponentFixture<DoctoradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctoradminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctoradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
