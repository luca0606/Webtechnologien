import { Component } from '@angular/core';
import { StellenService } from '../service/stellen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stellenportal',
  templateUrl: './stellenportal.component.html',
  styleUrls: ['./stellenportal.component.scss']
})
export class StellenportalComponent {
  jobList:any[];
  unfilteredjobList:any[];
  
  constructor(private stellenService:StellenService, private r:Router){}

  ngOnInit(){
  this.buildJobList();
  }

  buildJobList(){
    this.stellenService.getJobList().subscribe(
      (res) => {
        // Verarbeiten Sie das Ergebnis hier
        this.unfilteredjobList = res;
        this.jobList = this.unfilteredjobList.filter(job =>job.vacancyActive == true);
        console.log('Ergebnis der Anfrage:', this.jobList);
      },
      (err) => {
        // Fehlerbehandlung hier
        console.error('Fehler bei der Anfrage:', err);
      }
    );

  }

  createJob(){
     
    let ijob = {
      benefits: 'Teamevents',
      jobTitle: 'Ausbildung zum Fachinformatiker',
      jobDescription: '1st und 2nd Level Support',
      jobRequirements: 'Mittlere Hochschulereife',
      location: 'Berlin',
      salaryRangeMin: 20000,
      salaryRangeMax: 22000,
      vacancyActive: false
  }
  
    this.stellenService.addJob(ijob.jobTitle,ijob.jobDescription, ijob.jobRequirements, ijob.location, ijob.benefits, ijob.salaryRangeMin, ijob.salaryRangeMax, ijob.vacancyActive);
  }

  openJob(job:any){
    this.stellenService.sendJobData(job) //Alle damit Stellenliste
    this.r.navigate(['/stellenanzeige']);
  }
}
