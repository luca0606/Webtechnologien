import { Component } from '@angular/core';
import { StellenService } from '../service/stellen.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-stellen',
  templateUrl: './stellen.component.html',
  styleUrls: ['./stellen.component.scss']
})
export class StellenComponent {
  //message hält die empfangenen Daten vom Parent Component
  message: any;
  subscription: Subscription;

  //Aktiver User
  user:any;;
  userSubscription: Subscription = new Subscription();
  

  constructor(private stellenService:StellenService,
              private r:Router,
              private dataService: DataService){
  }

  ngOnInit() {
    //Prüft zunächst ob gespeicherte Daten im lokalen Speicher sind
    const savedJob = localStorage.getItem('job');

    this.userSubscription = this.dataService.user$.subscribe(user => {
      this.user = user;
    });

    if(savedJob){
      this.message = JSON.parse(savedJob);
    }
    else{
    this.subscription = this.stellenService.currentData.subscribe(message => {
      this.message = message;
    });
    this.saveJobToLocalStorage();
   }
  }

  ngOnDestroy() {
    // Wichtig, um Memory Leaks zu vermeiden, wenn die Komponente zerstört wird
    if(this.subscription){
    this.subscription.unsubscribe();
    }
    //Zwischen Daten werden gelöscht, sonst werden immer diese Anzeigedaten angezeigt
    localStorage.removeItem('job');

  }
  
  saveJobToLocalStorage() {
    //Speichert die Daten lokal, damit die beim Refresh nicht verloren gehen
    localStorage.setItem('job', JSON.stringify(this.message));
  }

  apply() {
    //Klick auf "Jetzt Bewerben" Button
    alert(this.message._id);
    this.r.navigate(['/'], { state: { id: this.message._id } }); 
  }
  editJob(){
    //Klick auf Stelle pflegen
    this.r.navigate(['/stellenpflege'], { state: { id: this.message._id } });
  }
}



