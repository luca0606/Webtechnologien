import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from './auth-model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  registrieren() {
   //Email-Validierung
  }

  anmelden(email: string, password: string) {
    const authData: AuthModel = { username: email, password: password };
    //Serviceaufruf (Backend): 
    //1. get Email & password (Frontend)
    //2. Eingabe-Pw-Verschlüsselung (Frontend)
    //3. Vergleich der Hash-strings
    
    this.http
      .post('http://localhost:4200/anmeldung/', authData)
      .subscribe((res) => {
        //login Kontrolle
        console.log(res);
      });
  }
}
