import { TestBed } from '@angular/core/testing';

import { DoctorauthService } from './doctorauth.service';

describe('DoctorauthService', () => {
  let service: DoctorauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
