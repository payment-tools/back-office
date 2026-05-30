import { TestBed } from '@angular/core/testing';

import { SalesProfileService } from './sales-profile.service';

describe('SalesProfileService', () => {
  let service: SalesProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
