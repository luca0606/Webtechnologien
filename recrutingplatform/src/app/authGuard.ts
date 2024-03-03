import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    // check if user is logged in and redirect to login page if not
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const isLoggedIn = this.checkIfUserIsLoggedIn();

        if (!isLoggedIn) {
            this.router.navigate(['/anmeldung']);
            return false;
        }

        return true;
    }
    // check if user is logged in
    private checkIfUserIsLoggedIn(): boolean {
        const isLoggedIn = localStorage.getItem('loggedIn')
        return isLoggedIn === "true";
    }
}
