import { Component } from '@angular/core';
import { BewerberlisteService } from '../service/bewerberliste.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bewerberliste',
  templateUrl: './bewerberliste.component.html',
  styleUrls: ['./bewerberliste.component.scss'],
})
export class BewerberlisteComponent {
  applicationList: any[];

  subscription: Subscription = new Subscription();

  constructor(
    private stellenService: BewerberlisteService,
    private r: Router
  ) {}

  ngOnInit() {
    // get user from data service

    this.buildJobList();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  buildJobList() {
    //Hole nur aktive Stellenanzeigen für Bewerbersicht
    this.stellenService.getJobList().subscribe(
      async (res) => {
        this.applicationList = await res;
      },
      (err) => {
        console.error('Fehler bei der Anfrage:', err);
      }
    );
  }

  openJob(job: any) {
    this.stellenService.sendJobData(job); //Alle damit Stellenliste
    this.r.navigate(['/stellenanzeige']);
  }

  apply(job: any) {
    alert(job._id);
    //this.r.navigate(['/'], { state: { id: job._id } });
  }
  editJob(job: any) {
    this.r.navigate(['/stellenpflege'], { state: { id: job._id } });
  }
}
