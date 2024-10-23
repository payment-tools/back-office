import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import {KeycloakProfile} from "keycloak-js/lib/keycloak";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public userProfile$ = new BehaviorSubject<KeycloakProfile>({});

  constructor(
    private http: HttpClient,
  ) {
  }

  getUserProfile(): KeycloakProfile {
    return this.userProfile$.getValue();
  }

  setUserProfile(userProfile: KeycloakProfile): void {
    this.userProfile$.next(userProfile);
  }

}
