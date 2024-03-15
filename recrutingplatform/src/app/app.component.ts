import { Component, OnInit } from '@angular/core'
import { AuthService } from './service/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'recrutingplatform'
  routeName = ""
  isUserLoggedId = false

  constructor(private authService: AuthService, private router: Router) {
    this.routeName = this.router.url


  }


  abmelden() {
    this.authService.abmelden()
  }

  ngOnInit() {
    const loggedIn = localStorage.getItem("loggedIn")
  }


}
