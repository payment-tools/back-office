import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IPartnership } from '../model/partnership.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnershipService {

  private readonly partnershipApiUrl = environment.baseUrl + '/v1/onepay/partnership';

  constructor(
    private http: HttpClient
  ) { }

  createPartnership(partnership: IPartnership): Observable<IPartnership> {
    return this.http.post<IPartnership>(this.partnershipApiUrl, partnership);
  }
}
