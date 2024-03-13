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

  constructor(private applService: BewerberlisteService, private r: Router) {}

  ngOnInit() {
    // get user from data service

    this.buildApplList();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  buildApplList() {
    //Hole nur aktive Stellenanzeigen für Bewerbersicht
    this.applService.getJobList().subscribe(
      async (res) => {
        this.applicationList = await res;
      },
      (err) => {
        console.error('Fehler bei der Anfrage:', err);
      }
    );
  }

  async statusupdate(status: string, id: string) {
    await this.applService.setChanges(status, id);
    this.buildApplList(); // Liste neu aufbauen, um die aktualisierten Daten anzuzeigen
  }

  async messageupdate(status: string, id: string) {
    await this.applService.setMessage(status, id);
    this.buildApplList(); // Liste neu aufbauen, um die aktualisierten Daten anzuzeigen
  }

  download(id: string) {
    //Hier folgt download Methode
  }
}
