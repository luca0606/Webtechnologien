import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrierungService {

  constructor(private http: HttpClient) { }

  addUser(firstName:string,lastName:string,email:string,pw:string,role:boolean) {
    let user = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: pw,
      role: role
    }

    this.http.post("http://localhost:3000/user/", user)
      .subscribe((res) => {
        return true;
        console.log(res);
      });

  }
}
