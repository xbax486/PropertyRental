import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CustomAuthService } from "../../services/custom.auth.service";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent{
  public isExpanded = false;

  constructor(public authService: AuthService, public customAuthService: CustomAuthService) {}

  public collapse() {
    this.isExpanded = false;
  }

  public toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public onLogin() {
    this.customAuthService.onLogin();
  }

  public onLogout() {
    this.customAuthService.onLogout();
  }
}
