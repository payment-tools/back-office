import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IEnterpriseConfiguration } from '../model/enterprise-configuration.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseConfigurationService {
  private readonly entrepriseConfigurationApiUrl = environment.baseUrl + '/v1/onepay/enterpriseConfiguration';

  constructor(
    private http: HttpClient
  ) { }

  createEnterpriseConfiguration(enterpriseConfiguration: IEnterpriseConfiguration): Observable<IEnterpriseConfiguration>{
    return this.http.post<IEnterpriseConfiguration>(this.entrepriseConfigurationApiUrl, enterpriseConfiguration);
  }
}
