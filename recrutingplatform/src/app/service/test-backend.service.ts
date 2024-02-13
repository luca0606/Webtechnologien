import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestBackendService {

  constructor(private http: HttpClient) { }

  async getUsers() {

    // Achtung: http://localhost:3000/
    // Ist server lauft mit diesem url oder etwas anders?

    this.http.get("http://localhost:3000/user").subscribe((res) => {
      console.log(res)
    })
  }

  addUser() {
    let user = {
      firstname: "test",
      lastname: "I am from angular frontend",
      title: "my role is just testing.ggg..."
    }

    this.http.post("http://localhost:3000/user/", user)
      .subscribe((res) => {
        console.log(res);
      });

  }
}
