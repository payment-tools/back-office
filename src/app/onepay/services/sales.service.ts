import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ISales } from '../model/sales.model';
import { IPage } from '../model/page.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private readonly salesApiUrl = environment.baseUrl + '/v1/onepay/sales';

  constructor(
    private http: HttpClient
  ) { }

  createSales(sales: ISales): Observable<ISales> {
    return this.http.post<ISales>(this.salesApiUrl, sales);
  }

  getSales(): Observable<ISales[]> {
    return this.http.get<IPage<ISales>>(this.salesApiUrl + '?size=100').pipe(
      map(page => page.content)
    );
  }
}
