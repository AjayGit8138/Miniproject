import { TestBed } from '@angular/core/testing';

import { DoctorauthGuard } from './doctorauth.guard';

describe('DoctorauthGuard', () => {
  let guard: DoctorauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DoctorauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
