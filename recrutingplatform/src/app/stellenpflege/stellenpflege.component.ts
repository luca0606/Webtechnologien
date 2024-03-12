import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StellenpflegeService } from '../service/stellenpflege.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-stellenpflege',
  templateUrl: './stellenpflege.component.html',
  styleUrls: ['./stellenpflege.component.scss']
})
export class StellenpflegeComponent {

  mode:any
  job:any;
  id: any;
  navigation:any;
  changedValues:any;

  //Statusmeldungen
  successfulAdd:boolean = false;
  successfulEdit:boolean = false;
  successfulDeletion:boolean = false;

  jobForm: FormGroup;

   constructor(private r: Router, private stellenpflegeService:StellenpflegeService, private fb: FormBuilder,private location: Location) {
    //Objekt ID vom Ursprungs StellenComponent
      this.navigation = this.r.getCurrentNavigation();
      this.mode = this.navigation?.extras.state?.["mode"];
  }

  ngOnInit() {

    if(this.mode === 'edit' ){
       this.getJob();
       if(this.job){
        this.initForm();
      }
    }
    else{
        //Für Mode = add werden keine Jobdaten benötigt
        this.initForm();
    }
  }
    getJob(){
      //Job-Objekt ermittelt, den man bearbeiten möchte
        this.id = this.navigation?.extras.state?.["id"];
        //Job-Daten anhand der ObjectID laden
        this.stellenpflegeService.getJobById(this.id).subscribe( job => {
        this.job = job;
        console.log('dieser job: ' + this.job.jobTitle);
        this.initForm();
        
    });
    }
    initForm(){
      
      if(this.mode == 'edit'){
      this.jobForm = this.fb.group({
      //Formular initialisieren
      //_id: [this.job._id],
      benefits: [this.job.benefits],
      jobDescription: [this.job.jobDescription],
      jobRequirements: [this.job.jobRequirements],
      jobTitle: [this.job.jobTitle],
      location: [this.job.location],
      salaryRangeMax: [this.job.salaryRangeMax],
      salaryRangeMin: [this.job.salaryRangeMin],
      vacancyActive: [this.job.vacancyActive],
      //__v: [this.job.__v]
    });
    console.log(this.jobForm.value);
    }
    else{
      //Wenn mode = 'add' nicht vorausfüllen
      this.jobForm = this.fb.group({
        //Formular initialisieren
        benefits: [''],
        jobDescription: [''],
        jobRequirements: [''],
        jobTitle: [''],
        location: [''],
        salaryRangeMax: [''],
        salaryRangeMin: [''],
        vacancyActive: ['']
      });
    }

  }

  async onPressSave(){
    // Wenn Sie Änderungen speichern möchten, z.B. an einen Service oder an eine API senden:
    const updateValue = {...this.jobForm.value};
    if(this.job._id){
      await this.stellenpflegeService.saveChanges(this.id,updateValue);
      this.successfulEdit = true;
    }
  }

  async onPressDelete(){
    if(this.id){
      await this.stellenpflegeService.deleteJob(this.id);
      this.r.navigate(['/stellenportal']);
      this.successfulDeletion = true;
    }
  }

  async onPressAdd(){
    if(this.jobForm.value){
      await this.stellenpflegeService.addJob(this.jobForm.value);
      this.successfulAdd = true;
    }
  }

}
