import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(public authService: AuthService) {
    this.authService.isAuthenticated$.subscribe(result => {
      console.log('result', result);
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  onLogin() {
    this.authService.loginWithRedirect();
  }

  onLogout() {
    this.authService.logout({ returnTo: document.location.origin })
  }
}
