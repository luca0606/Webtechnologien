import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // we need localstorage to store the login status of the user 
  // and we need to listen to the changes of the localstorage to update the login status of the user
  // otherwise the login info of the user will be deleted after browser refresh

  private isLoggedIn = new BehaviorSubject<boolean>(this.getIsLoggedInFromLocalStorage());
  currentIsLoggedIn = this.isLoggedIn.asObservable();
  constructor() {
    // this.listenToLocalStorageChangesForIsLoggedIn()
  }

  getIsLoggedIn() {
    return this.isLoggedIn.asObservable()
  }

  updateIsLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }

  // DEPRECATED: Just keeping it if we need it later. I am not sure about the implementation of login and logout
  // I think we will not need it. Lets see if there is a problem
  private listenToLocalStorageChangesForIsLoggedIn() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'isLoggedIn') {
        this.isLoggedIn.next(this.getIsLoggedInFromLocalStorage());
      }
    });
  }

  private getIsLoggedInFromLocalStorage() {
    const isLoggedIn = localStorage.getItem("loggedIn")
    return isLoggedIn == "true"
  }


}
