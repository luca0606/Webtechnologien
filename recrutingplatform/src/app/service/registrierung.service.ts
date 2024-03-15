import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { BASE_URL } from '../shared/sharedData';

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
      recruiterRole: role
    }
    try {
      this.http.post(`${BASE_URL}user/register`, user)
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

    this.http.post(`${BASE_URL}auth/`, user).subscribe(res => {
      console.log(res)
      console.log('AuthData added')
    })
  }
}
