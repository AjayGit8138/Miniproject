import { TestBed } from '@angular/core/testing';

import { PatienauthService } from './patienauth.service';

describe('PatienauthService', () => {
  let service: PatienauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatienauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
