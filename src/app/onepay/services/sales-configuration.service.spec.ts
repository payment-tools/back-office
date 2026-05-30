import { TestBed } from '@angular/core/testing';

import { SalesConfigurationService } from './sales-configuration.service';

describe('SalesConfigurationService', () => {
  let service: SalesConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
