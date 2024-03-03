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
    console.log(hashPassword);
    return hashPassword;
  }

  addUser(firstName: string, lastName: string, email: string, password: string, role: boolean) {
    let user = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      // password: this.hashPassword(password),
      recruiterRole: role
    }

    this.http.post("http://localhost:3000/user/", user)
      .subscribe((res) => {
        console.log(res)
      });

  }
  /**
   * 
   */
  addUserAuthData(email: string, password: string) {

    console.log("hi addUserAuthData")
    console.log(password)
    console.log("before hash")
    let user = {
      email: email,
      password: this.hashPassword(password)
    }

    this.http.post("http://localhost:3000/auth/", user).subscribe(res => {
      console.log(res)
    })
  }
}
