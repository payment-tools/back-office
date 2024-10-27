import { Injectable } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public userProfile$ = new BehaviorSubject<KeycloakProfile>({});

  constructor(
  ) {
  }

  getUserProfile(): KeycloakProfile {
    return this.userProfile$.getValue();
  }

  setUserProfile(userProfile: KeycloakProfile): void {
    this.userProfile$.next(userProfile);
  }
}
