import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StellenpflegeService } from '../service/stellenpflege.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stellenpflege',
  templateUrl: './stellenpflege.component.html',
  styleUrls: ['./stellenpflege.component.scss']
})
export class StellenpflegeComponent {

  job:any;
  id: any;

  editForm: FormGroup;

  constructor(private r: Router, private stellenpflegeService:StellenpflegeService, private fb: FormBuilder) {
    //Objekt ID vom Ursprungs StellenComponent
    const navigation = this.r.getCurrentNavigation();
    this.id = navigation?.extras.state?.["id"];
  }

  ngOnInit() {
    //Job-Daten anhand der ObjectID laden
    this.stellenpflegeService.getJobById(this.id).subscribe(job => {
      this.job = job;
      this.initForm();
    });
  }
    
    initForm(){this.editForm = this.fb.group({
      //Formular initialisieren
      benefits: [this.job.benefits],
      jobDescription: [this.job.jobDescription],
      jobRequirements: [this.job.jobRequirements],
      jobTitle: [this.job.jobTitle],
      location: [this.job.location],
      salaryRangeMax: [this.job.salaryRangeMax],
      salaryRangeMin: [this.job.salaryRangeMin],
      vacancyActive: [this.job.vacancyActive]
    });
  }

  async saveChanges() {
    // Wenn Sie Änderungen speichern möchten, z.B. an einen Service oder an eine API senden:
    if(this.id){
      await this.stellenpflegeService.setChanges(this.id,this.editForm.value);
    }
  }
}