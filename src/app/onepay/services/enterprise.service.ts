import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IEnterprise } from '../model/enterprise.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  private readonly entrepriseApiUrl = environment.baseUrl + '/v1/onepay/enterprise';
  constructor(
        private http: HttpClient,
  ) { }

  createEnterprise(enterprise: IEnterprise): Observable<IEnterprise> {
    return this.http.post<IEnterprise>(this.entrepriseApiUrl, enterprise);
  }
}
