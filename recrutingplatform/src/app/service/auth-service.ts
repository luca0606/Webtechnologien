import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthModel } from './auth-model'
import { BASE_URL } from '../shared/sharedData'
import { Router } from '@angular/router'

@Injectable({ providedIn: 'root' })

export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
  }

  registrieren() {
    //Email-Validierung
  }

  anmelden(email: string, password: string) {
    const authData: AuthModel = { email: email, password: password };
    //Login request (Backend): 
    this.http.post(`${BASE_URL}auth/login/`, authData)
      .subscribe((res) => {
        console.log(res);
        if (res) {
          localStorage.setItem("loggedIn", "true")
          this.router.navigate(['stellenportal'])
        }
      })
  }

  abmelden() {
    localStorage.removeItem("loggedIn")
    this.router.navigate(['anmeldung'])
  }

}
