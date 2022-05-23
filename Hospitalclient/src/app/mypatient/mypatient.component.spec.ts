import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypatientComponent } from './mypatient.component';

describe('MypatientComponent', () => {
  let component: MypatientComponent;
  let fixture: ComponentFixture<MypatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MypatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MypatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
