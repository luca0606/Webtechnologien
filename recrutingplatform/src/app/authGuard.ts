import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

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

    private checkIfUserIsLoggedIn(): boolean {
        console.log(!!localStorage.getItem('loggedIn'))
        return !!localStorage.getItem('loggedIn');
    }
}
