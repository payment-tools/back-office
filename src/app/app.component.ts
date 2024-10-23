import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private keycloakService: KeycloakService,
  ) {
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  public async ngOnInit() {
    const isLoggedIn = await this.keycloakService.isLoggedIn();
    // await this.keycloakService.logout();
  }
}
