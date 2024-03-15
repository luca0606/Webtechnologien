import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; //Für das Registrierungsformulare 
import { Router } from '@angular/router'; //Router für Weiterleitung nach Submit
import { RegistrierungService } from '../service/registrierung.service';



@Component({
  selector: 'app-registrierung',
  templateUrl: './registrierung.component.html',
  styleUrls: ['./registrierung.component.scss']
})
export class RegistrierungComponent implements OnInit {
  isRecruiter: boolean = false;
  registrationSuccessful: boolean = false;

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private rg: RegistrierungService, private r: Router) { };

  ngOnInit() {
    this.registerForm = this.fb.group({
      vorname: ['', Validators.required],
      nachname: ['', Validators.required],
      geburtsdatum: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefonnummer: ['', [Validators.required, Validators.pattern('^[0-9]{1,15}$')]],  // Als Beispiel: ein 10-stelliger numerischer Wert.
      strasse: ['', Validators.required],
      hausnummer: ['', Validators.required],
      ort: ['', Validators.required],
      postleitzahl: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],  // Deutsche PLZ: 5-stelliger numerischer Wert.
      passwort: ['', [Validators.required, Validators.minLength(6)]]  // Mindestlänge für Passwörter: 8 Zeichen + Großbuchstabe + Ziffer
    });
  }

  onSubmit() {
    console.log(this.registerForm.valid)
    if (this.registerForm.valid) {
      try {
        this.rg.addUser(
          this.registerForm.value.vorname,
          this.registerForm.value.nachname,
          this.registerForm.value.email,
          this.isRecruiter
        );

        this.rg.addUserAuthData(
          this.registerForm.value.email,
          this.registerForm.value.passwort
        );

        this.registrationSuccessful = true;
        this.registerForm.reset();
      } catch (error) {
        console.error('Registration failed:', error);
        alert('Registrierung fehlgeschlagen. Bitte versuchen Sie es später erneut.');
      }
    } else {
      alert('Eingabedaten sind fehlerhaft.');
    }
  }

  toggleRole(): void {
    console.log(this.isRecruiter);
    this.isRecruiter = !this.isRecruiter;
  }

  routeAnmeldung(){
    this.r.navigate(['/anmeldung']);
  }

}
