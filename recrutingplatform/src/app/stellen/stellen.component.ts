import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StellenService } from '../service/stellen.service';

@Component({
  selector: 'app-stellen',
  templateUrl: './stellen.component.html',
  styleUrls: ['./stellen.component.scss']
})
export class StellenComponent {
  message: any;
  subscription: Subscription;

  constructor(private stellenService:StellenService){}

  ngOnInit() {
    this.subscription = this.stellenService.currentData.subscribe(message => {
      this.message = message;
    });
    console.log(this.message)
  }

  ngOnDestroy() {
    // Wichtig, um Memory Leaks zu vermeiden, wenn die Komponente zerstört wird
    this.subscription.unsubscribe();
  }
}



