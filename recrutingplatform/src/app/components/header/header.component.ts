import { Component } from '@angular/core';

import { AuthService } from 'src/app/service/auth-service';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private showHeaderAndFooter: Subscription

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {


  }

  abmelden() {
    console.log("hollolllliii")
    this.authService.abmelden()
  }

  async ngOnInit() {
    await this.dataService.currentIsLoggedIn.subscribe(value => {
      // this.showHeaderAndFooter = value
      console.log(value)
    })
    console.log(this.showHeaderAndFooter)
  }

  ngOnDestroy() {
    if (this.showHeaderAndFooter) {
      this.showHeaderAndFooter.unsubscribe();
    }
  }

}
