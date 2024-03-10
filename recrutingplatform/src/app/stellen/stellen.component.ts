import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StellenService } from '../service/stellen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stellen',
  templateUrl: './stellen.component.html',
  styleUrls: ['./stellen.component.scss']
})
export class StellenComponent {
  //message hält die empfangenen Daten vom Parent Component
  message: any;
  subscription: Subscription;
  user = undefined;

  constructor(private stellenService:StellenService,private r:Router){
    const navigation = this.r.getCurrentNavigation();
    this.user = navigation?.extras.state["user"]
    // You have here user data from the login
    // You can use user.recruiterRole to check if the u
  }

  ngOnInit() {
    //Prüft zunächst ob gespeicherte Daten im lokalen Speicher sind
    const savedJob = localStorage.getItem('job');
    if(savedJob){
      this.message = JSON.parse(savedJob);
    }
    else{
    this.subscription = this.stellenService.currentData.subscribe(message => {
      this.message = message;
    });
    console.log(this.message)
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
    //Click auf "Jetzt Bewerben" Button
    alert(this.message._id);
    //this.r.navigate(['/bewerben'], { state: { id: this.message._id } }); 
  }
  editJob(){
    alert(this.message._id);
    this.r.navigate(['/'], { state: { id: this.message._id } }); 
  }
}



