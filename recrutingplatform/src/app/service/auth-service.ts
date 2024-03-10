import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthModel } from './auth-model'
import { BASE_URL } from '../shared/sharedData'
import { Router } from '@angular/router'
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })

export class AuthService {

  constructor(private http: HttpClient, private router: Router, private dataService: DataService) {
  }

  anmelden(email: string, password: string) {
    const authData: AuthModel = { email: email, password: password };
    //Login request (Backend): 
    this.http.post(`${BASE_URL}auth/login/`, authData)
      .subscribe(async (res) => {
        if (res) {
          localStorage.setItem("loggedIn", "true")
          this.dataService.updateIsLoggedIn(true);
          const result = await this.dataService.updateUser(res);
          localStorage.setItem("user", JSON.stringify(res));
          this.router.navigate(['stellenportal'], { state: { user: res } })

        }
      })
  }

  abmelden() {
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("user")
    this.dataService.updateIsLoggedIn(false);
    this.router.navigate(['anmeldung'])
  }

}
