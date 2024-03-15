import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private isLoggedIn = new BehaviorSubject<boolean>(this.getIsLoggedInFromLocalStorage());
  currentIsLoggedIn = this.isLoggedIn.asObservable();
  private user = new BehaviorSubject<any>(this.getUserFromLocalStorage());
  user$ = this.user.asObservable();
  constructor() {

  }

  getIsLoggedIn() {
    return this.isLoggedIn.asObservable()
  }

  updateIsLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }

  private getIsLoggedInFromLocalStorage() {
    const isLoggedIn = localStorage.getItem("loggedIn")
    return isLoggedIn == "true"
  }

  getUser() {
    return this.user.asObservable();
  }

  updateUser(user: any) {
    this.user.next(user);
    return this.user.asObservable();
  }

  saveUserToLocalStorage(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUserFromLocalStorage() {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  }
}
