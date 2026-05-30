import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ISalesConfiguration } from '../model/sales.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesConfigurationService {

  private readonly salesConfigurationApiUrl = environment.baseUrl + '/v1/onepay/salesConfiguration'
  constructor(
    private http: HttpClient
  ) { }

  createSalesConfiguration(salesConfiguration: ISalesConfiguration): Observable<ISalesConfiguration>{
    return this.http.post<ISalesConfiguration>(this.salesConfigurationApiUrl, salesConfiguration);
  }
}
