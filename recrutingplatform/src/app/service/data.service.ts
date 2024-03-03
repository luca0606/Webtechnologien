import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private isLoggedIn = new BehaviorSubject<boolean>(null); // Başlangıç değeri null
  currentIsLoggedIn = this.isLoggedIn.asObservable();
  constructor() {
    this.listenToLocalStorageChangesForIsLoggedIn()
  }

  getIsLoggedIn() {
    return this.isLoggedIn.asObservable()
  }

  updateIsLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }


  private listenToLocalStorageChangesForIsLoggedIn() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'isLoggedIn') {
        this.isLoggedIn.next(this.getIsLoggedIdFromLocalStorage());
      }
    });
  }

  private getIsLoggedIdFromLocalStorage() {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    return isLoggedIn === "true"
  }


}
