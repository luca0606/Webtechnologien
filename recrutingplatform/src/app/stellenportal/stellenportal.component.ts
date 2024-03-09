import { Component } from '@angular/core';
import { StellenService } from '../service/stellen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stellenportal',
  templateUrl: './stellenportal.component.html',
  styleUrls: ['./stellenportal.component.scss']
})
export class StellenportalComponent {
  jobList: any[];
  unfilteredjobList: any[];
  isJobListLoaded: boolean = false;
  user = null;
  constructor(private stellenService: StellenService, private r: Router) {
    const navigation = this.r.getCurrentNavigation();
    this.user = navigation?.extras.state["user"]
    // You have here user data from the login
    // You can use user.recruiterRole to check if the user is a recruiter
  }


  ngOnInit() {
    this.buildJobList();
    // todo: Build filter here and give it to filter component

  }

  ngOnChanges() {
  }

  buildJobList() {
    this.stellenService.getJobList().subscribe(
      async (res) => {
        this.unfilteredjobList = await res;
        this.jobList = this.unfilteredjobList.filter(job => job.vacancyActive == true);
        this.isJobListLoaded = true;
      },
      (err) => {
        console.error('Fehler bei der Anfrage:', err);
      }
    );

  }

  createJob() {

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

    this.stellenService.addJob(ijob.jobTitle, ijob.jobDescription, ijob.jobRequirements, ijob.location, ijob.benefits, ijob.salaryRangeMin, ijob.salaryRangeMax, ijob.vacancyActive);
  }

  onJobListFiltered(filteredJobList: any[]) {
    this.jobList = filteredJobList;
  }


  openJob(job: any) {
    this.stellenService.sendJobData(job) //Alle damit Stellenliste
    this.r.navigate(['/stellenanzeige']);
  }

  apply() {
    //this.r.navigate(['/bewerben']);
    console.log('Hallo');
  }
}
