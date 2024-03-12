import { Component } from '@angular/core';
import { StellenService } from '../service/stellen.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stellenportal',
  templateUrl: './stellenportal.component.html',
  styleUrls: ['./stellenportal.component.scss'],
})
export class StellenportalComponent {
  jobList: any[];
  unfilteredjobList: any[];
  isJobListLoaded: boolean = false;
  user: any = undefined;

  subscription: Subscription = new Subscription();

  constructor(
    private stellenService: StellenService,
    private r: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    // get user from data service
    this.subscription = this.dataService.user$.subscribe((user) => {
      this.user = user;
    });
    this.buildJobList();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

  buildJobList() {
    //Hole nur aktive Stellenanzeigen für Bewerbersicht
    if (!this.user.recruiterRole) {
      this.stellenService.getJobList().subscribe(
        async (res) => {
          this.unfilteredjobList = await res;
          this.jobList = this.unfilteredjobList.filter(
            (job) => job.vacancyActive == true
          );
          this.isJobListLoaded = true;
        },
        (err) => {
          console.error('Fehler bei der Anfrage:', err);
        }
      );
    }
    //Hole alle Anzeigen für Recruitersicht
    else {
      this.stellenService.getJobList().subscribe(
        async (res) => {
          this.jobList = await res;
          this.isJobListLoaded = true;
        },
        (err) => {
          console.error('Fehler bei der Anfrage:', err);
        }
      );
    }
  }

  onJobListFiltered(filteredJobList: any[]) {
    this.jobList = filteredJobList;
  }

  openJob(job: any) {
    this.stellenService.sendJobData(job); //Alle damit Stellenliste
    this.r.navigate(['/stellenanzeige']);
  }

  apply(job: any) {
    //alert(job._id);
    this.r.navigate(['/bewerben'], { state: { id: job._id } });
  }
  editJob(job:any){
    this.r.navigate(['/stellenpflege'], { state: { id: job._id,
                                                  mode: 'edit' } });
  }

  onPressAdd(){
    this.r.navigate(['/stellenpflege'], { state: { mode: 'add' } });
  }
}
