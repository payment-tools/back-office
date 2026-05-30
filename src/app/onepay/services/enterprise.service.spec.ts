import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'environments/environment';

import { EnterpriseService } from './enterprise.service';
import { IEnterprise } from '../model/enterprise.model';
import { IPage } from '../model/page.model';

describe('EnterpriseService', () => {
  let service: EnterpriseService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.baseUrl + '/v1/onepay/enterprise';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EnterpriseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createEnterprise should POST and return enterprise', () => {
    const enterprise: IEnterprise = { id: 1, name: 'Test' };
    service.createEnterprise(enterprise).subscribe(result => {
      expect(result).toEqual(enterprise);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(enterprise);
  });

  it('getEnterprises should GET page and return content array', () => {
    const page: IPage<IEnterprise> = {
      content: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }],
      totalElements: 2,
      totalPages: 1,
      number: 0,
      size: 100
    };
    service.getEnterprises().subscribe(result => {
      expect(result).toEqual(page.content);
      expect(result.length).toBe(2);
    });
    const req = httpMock.expectOne(apiUrl + '?size=100');
    expect(req.request.method).toBe('GET');
    req.flush(page);
  });
});