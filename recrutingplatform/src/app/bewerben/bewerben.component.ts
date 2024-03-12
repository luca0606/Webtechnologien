import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BewerbenService } from '../service/bewerben.service';

@Component({
  selector: 'app-bewerben',
  templateUrl: './bewerben.component.html',
  styleUrls: ['./bewerben.component.scss'],
})
export class BewerbenComponent {
  isUploaded: boolean = false;
  applicationSuccessful: boolean = false;
  bewerbenForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rg: BewerbenService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const id = navigation?.extras.state['id'];
    console.log(id);
  }

  ngOnInit() {
    this.bewerbenForm = this.fb.group({
      bewerbung: ['', Validators.required],
      datei: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.isUploaded = true;
    const dokumentButton = document.querySelector('.dokument-button');
    if (dokumentButton) {
      dokumentButton.classList.add('uploaded');
    }
  }
  onSubmit() {
    if (this.bewerbenForm.valid) {
      this.rg.addApplication(
        this.bewerbenForm.value.bewerbung,
        this.bewerbenForm.value.datei
      );
      console.log('Formular abgeschickt');
      this.applicationSuccessful = true;
    } else {
      alert('Eingabedaten sind fehlerhaft.');
    }
  }
}
