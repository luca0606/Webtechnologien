import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; //Für Formulare
import { Router } from '@angular/router'; //Router für Weiterleitung nach Submit
import { AuthService } from '../service/auth-service';
import { hashPassword } from '../shared/helpers';

@Component({
  selector: 'app-anmeldung',
  templateUrl: './anmeldung.component.html',
  styleUrls: ['./anmeldung.component.scss'],
})
export class AnmeldungComponent {
  isRecruiter = false;

  /*Formular*/
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  /*Router und AuthService instanziieren*/
  constructor(private router: Router, private authService: AuthService) {
    console.log('Router und AuthService wurde instanziiert!');
  }

  onSubmit(): void {
    this.authService.anmelden(
      this.loginForm.value.email,
      hashPassword(this.loginForm.value.password)
    );

    // Hier kommt der Service-Aufruf, um Email bzw. Benutzer und Passwort abzugleichen -> Serviceaufruf(email,pw,isRecruiter) mit Rückgabewert successLogin=true/false
    //Abhängig vom Rückgabewert des Service-Aufrufs wird weitergeroutet
    //Zugriff auf Email über: this.loginForm.value.email
    //Zugriff auf Passwort über: this.loginForm.value.password

    //Route to stellenportal 

  }

  toggleRole(): void {
    console.log(this.isRecruiter);
    this.isRecruiter = !this.isRecruiter;
  }
}
