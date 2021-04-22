import { Injectable } from '@angular/core';
import { CustomAuthService } from "./custom.auth.service";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CustomAuthGuard implements CanActivate {
    constructor(private authService: CustomAuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.isAdmin();
    }
}