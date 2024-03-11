import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class RegistrierungService {

  constructor(private http: HttpClient) { }

  hashPassword(password: string) {
    let hashPassword = CryptoJS.SHA256(password).toString();
    return hashPassword;
  }

  addUser(firstName: string, lastName: string, email: string, role: boolean) {
    let user = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      // password: this.hashPassword(password),
      recruiterRole: role
    }
    try {
      this.http.post("http://localhost:3000/user/register", user)
        .subscribe((res) => {
          console.log(res)
        })
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 
   */
  addUserAuthData(email: string, password: string) {

    let user = {
      email: email,
      password: this.hashPassword(password)
    }

    this.http.post("http://localhost:3000/auth/", user).subscribe(res => {
      console.log(res)
      console.log('AuthData added')
    })
  }
}
