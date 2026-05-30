import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IEnterpriseProfile } from '../model/enterprise.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseProfileService {

  private readonly entrepriseProfileApiUrl = environment.baseUrl + '/v1/onepay/enterpriseProfile';

  constructor(
    private http: HttpClient
  ) { }

  createEnterpriseProfile(enterpiseProfile: IEnterpriseProfile): Observable<IEnterpriseProfile> {
      return this.http.post<IEnterpriseProfile>(this.entrepriseProfileApiUrl, enterpiseProfile)
  }
}
