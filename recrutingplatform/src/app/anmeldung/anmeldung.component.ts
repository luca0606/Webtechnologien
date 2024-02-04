import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; //Für Formulare 
import { Router } from '@angular/router'; //Router für Weiterleitung nach Submit


@Component({
  selector: 'app-anmeldung',
  templateUrl: './anmeldung.component.html',
  styleUrls: ['./anmeldung.component.scss']
})
export class AnmeldungComponent {
  isRecruiter = false;

  /*Formular*/
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  /*Router instanziieren*/
  constructor(private router: Router) {
    console.log('Router wurde instanziiert!')
  }

  onSubmit(): void {
    // Hier kommt der Service-Aufruf, um Email bzw. Benutzer und Passwort abzugleichen -> Serviceaufruf(email,pw,isRecruiter) mit Rückgabewert successLogin=true/false
    //Abhängig vom Rückgabewert des Service-Aufrufs wird weitergeroutet
    //Zugriff auf Email über: this.loginForm.value.email
    //Zugriff auf Passwort über: this.loginForm.value.password

    let successLogin = true;//ServieceAufruf

    /*Dummy-Logik: Wenn successLogin = true, dann route*/
    if (this.loginForm.value.email == 'man-to.wong@hotmail.de' && this.loginForm.value.password == 'manto' && this.isRecruiter == false) {
      this.router.navigate(['/']); //Routing zur Recruiter bzw. Bewerberplattform
    }
    else { //Login fehlgeschlaagen -> Reload, um Felder zurückzusetzen
      alert('Falsche Eingabe!')
      window.location.reload();
    }
  }

  toggleRole(): void {
    console.log(this.isRecruiter);
    this.isRecruiter = !this.isRecruiter;
  }
}
