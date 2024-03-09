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
  bewerbenForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rg: BewerbenService,
    private r: Router
  ) {}

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
    console.log('Formular abgeschickt');
  }
}
