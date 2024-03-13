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

  selectedFile: File= null;

  id:any;

  constructor(
    private fb: FormBuilder,
    private rg: BewerbenService,
    private router: Router
  ) {
    //const navigation = this.router.getCurrentNavigation();
    //this.id = navigation?.extras.state['id'];
    //console.log(this.id);
  }

  ngOnInit() {
  
    this.bewerbenForm = this.fb.group({
      applicationTitle: [''],
      filePath:[''] ,
      status: ['Bewerbung eingegangen'],
    });
  }

  onFileSelected(event: any) {
    
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.bewerbenForm.get('filePath').setValue(this.selectedFile);;
    }

    this.isUploaded = true;
    const dokumentButton = document.querySelector('.dokument-button');
    if (dokumentButton) {
      dokumentButton.classList.add('uploaded');
    }
  }
  onSubmit() {
    if (this.bewerbenForm.valid) {
      //Dateinamen in filePath schreiben für QueryString
      this.bewerbenForm.value.filePath = this.selectedFile.name; 
      //Applikation in der Datenbank speichern
      this.rg.addApplication(this.bewerbenForm.value);
      //Uploaden
      this.onUpload();
      this.applicationSuccessful = true;
    } else {
      alert('Eingabedaten sind fehlerhaft.');
    }
  }

  async onUpload(){
    
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    await this.rg.uploadApplication(formData);

  }
}
