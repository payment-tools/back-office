import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ISalesProfile } from '../model/sales.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesProfileService {

  private readonly salesProfileApiUrl = environment.baseUrl + '/v1/onepay/salesProfile';

  constructor(
    private http: HttpClient
  ) { }

  createSalesProfile(salesProfile: ISalesProfile): Observable<ISalesProfile> {
        return this.http.post<ISalesProfile>(this.salesProfileApiUrl, salesProfile)
  }
}
