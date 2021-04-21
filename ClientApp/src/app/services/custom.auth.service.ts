import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import { environment as env } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomAuthService implements OnDestroy {
  private user = null;
  private roles: string[] = [];
  private readonly adminRole = 'Admin';
  private userSubscription = new Subscription();

  constructor(public authService: AuthService, private _router: Router) {
    this.userSubscription = this.authService.user$.subscribe((user) => {
      if(user != null) {
        this.user = user;
        this.roles = this.user[env.auth.audience + '/roles'];
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.roles = [];
  }

  public onLogin() {
    this.authService.loginWithRedirect();
  }

  public onLogout() {
    this.authService.logout({ returnTo: document.location.origin });
  }

  public isLoggedIn() {
    return this.user != null;
  }

  public isAdmin() {
    return this.roles.includes(this.adminRole);
  }

  public navigateTo(path) {
    this._router.navigate([path]);
  }
}