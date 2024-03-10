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


  // create a function to share user data with other components
  getUser() {
    return this.user.asObservable();
  }

  // create a function to update user data
  updateUser(user: any) {
    this.user.next(user);
    // this.saveUserToLocalStorage(user);
    return this.user.asObservable();
  }

  //save user to the local storage
  saveUserToLocalStorage(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  //get user from the local storage
  getUserFromLocalStorage() {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  }





}
