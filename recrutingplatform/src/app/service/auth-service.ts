import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from './auth-model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  registrieren(email: string, password: string) {
    const authData: AuthModel = { username: email, password: password };

    this.http
      .post('http://localhost:4200/registrierung/', authData)
      .subscribe((res) => {
        //registrierung Kontrolle
        console.log(res);
      });
  }

  anmelden(email: string, password: string) {
    const authData: AuthModel = { username: email, password: password };

    this.http
      .post('http://localhost:4200/anmdelung/', authData)
      .subscribe((res) => {
        //login Kontrolle
        console.log(res);
      });
  }
}
