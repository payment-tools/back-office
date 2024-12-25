import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEnterpriseProfile } from '../model/enterprise.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService{

  private adminApiUrl = environment.baseUrl + '/v1/onepay';
  private readonly entrepriseProfileApiUrl = this.adminApiUrl + '/enterpriseProfile';
  private readonly salesProfileApiUrl = this.adminApiUrl + '/salesProfile';


  constructor(
    private http: HttpClient,
  ) { }

  createEnterpriseAdmin(enterpiseProfile: IEnterpriseProfile): Observable<IEnterpriseProfile> {
    return this.http.post<IEnterpriseProfile>(this.entrepriseProfileApiUrl, enterpiseProfile)
  }
}
