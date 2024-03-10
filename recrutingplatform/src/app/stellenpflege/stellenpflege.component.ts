import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stellenpflege',
  templateUrl: './stellenpflege.component.html',
  styleUrls: ['./stellenpflege.component.scss']
})
export class StellenpflegeComponent {

  job:any[];

  constructor(private r: Router) {
    const navigation = this.r.getCurrentNavigation();
    const id = navigation?.extras.state?.["id"];
    console.log(id); // Burada alınan ID'yi kullanabilirsiniz
  }

}
