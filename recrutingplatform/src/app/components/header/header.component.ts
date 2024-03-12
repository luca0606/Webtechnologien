import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // private showHeaderAndFooter: Subscription
  protected showHeaderAndFooter: Subscription
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {



  }

  abmelden() {
    this.authService.abmelden()
  }

  ngOnInit() {
    this.dataService.currentIsLoggedIn.subscribe(value => {
      this.isLoggedIn = value
      // console.log("header", this.isLoggedIn)
      this.cdr.detectChanges();
    })
  }

  ngOnDestroy() {
    if (this.showHeaderAndFooter) {
      this.showHeaderAndFooter.unsubscribe();
    }
  }

}
