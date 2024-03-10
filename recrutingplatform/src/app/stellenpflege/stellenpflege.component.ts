import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StellenpflegeService } from '../service/stellenpflege.service';

@Component({
  selector: 'app-stellenpflege',
  templateUrl: './stellenpflege.component.html',
  styleUrls: ['./stellenpflege.component.scss']
})
export class StellenpflegeComponent {

  job:any[];

  constructor(private r: Router, private stellenpflegeService:StellenpflegeService) {
    const navigation = this.r.getCurrentNavigation();
    const id = navigation?.extras.state?.["id"];
    console.log(id); // Burada alınan ID'yi kullanabilirsiniz
  }

}
