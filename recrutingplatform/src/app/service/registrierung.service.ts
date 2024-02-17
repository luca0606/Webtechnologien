import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class RegistrierungService {

  constructor(private http: HttpClient) { }

hashPassword(password: string) {
    let hashPassword =  CryptoJS.SHA256(password).toString();
    console.log(hashPassword);
    return hashPassword;
  }

  addUser(firstName:string,lastName:string,email:string,pw:string,role:boolean) {
    let user = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: this.hashPassword(pw),
      role: role
    }

    this.http.post("http://localhost:3000/user/", user)
      .subscribe((res) => {
        return true;
        console.log(res);
      });

  }
}
