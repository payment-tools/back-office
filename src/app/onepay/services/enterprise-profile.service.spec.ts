import { TestBed } from '@angular/core/testing';

import { EnterpriseProfileService } from './enterprise-profile.service';

describe('EnterpriseProfileService', () => {
  let service: EnterpriseProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnterpriseProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
