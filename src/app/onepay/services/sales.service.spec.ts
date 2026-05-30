import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'environments/environment';

import { SalesService } from './sales.service';
import { ISales } from '../model/sales.model';
import { IPage } from '../model/page.model';
import { Modules } from '../model/core.enum';

describe('SalesService', () => {
  let service: SalesService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.baseUrl + '/v1/onepay/sales';
  const mockSales: ISales[] = [
    { id: 1, name: 'Sales A', address: 'Dakar', type: Modules.RESTAURATION },
    { id: 2, name: 'Sales B', address: 'Thiès', type: Modules.MARKET }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SalesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createSales should POST and return sales', () => {
    service.createSales(mockSales[0]).subscribe(result => {
      expect(result).toEqual(mockSales[0]);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockSales[0]);
  });

  it('getSales should GET page and return content array', () => {
    const page: IPage<ISales> = {
      content: mockSales,
      totalElements: 2,
      totalPages: 1,
      number: 0,
      size: 100
    };
    service.getSales().subscribe(result => {
      expect(result).toEqual(mockSales);
      expect(result.length).toBe(2);
    });
    const req = httpMock.expectOne(apiUrl + '?size=100');
    expect(req.request.method).toBe('GET');
    req.flush(page);
  });
});