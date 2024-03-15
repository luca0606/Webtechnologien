import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // private showHeaderAndFooter: Subscription
  protected showHeaderAndFooter: Subscription;
  isLoggedIn: boolean = false;
  user: any;
  userSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  abmelden() {
    this.authService.abmelden();
  }

  ngOnInit() {
    this.dataService.currentIsLoggedIn.subscribe((value) => {
      this.isLoggedIn = value;
      // this.cdr.detectChanges(); // removed this line for now maybe it will be needed later...
    });
    this.userSubscription = this.dataService.user$.subscribe((user) => {
      this.user = user;
    });

  }

  ngOnDestroy() {
    if (this.showHeaderAndFooter) {
      this.showHeaderAndFooter.unsubscribe();
    }
  }
}
