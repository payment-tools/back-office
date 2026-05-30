import { TestBed } from '@angular/core/testing';

import { EnterpriseConfigurationService } from './enterprise-configuration.service';

describe('EnterpriseConfigurationService', () => {
  let service: EnterpriseConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnterpriseConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
