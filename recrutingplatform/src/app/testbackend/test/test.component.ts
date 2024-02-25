import { Component, OnInit } from '@angular/core';
import { TestBackendService } from 'src/app/service/test-backend.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(private testBackendService: TestBackendService) {
  }

  public register(userData) {
    console.log("register function")
    console.log(userData)
    this.testBackendService.addUser(userData);
  }

  yourForm = new FormGroup({
    name: new FormControl('', Validators.required), // Example form control with validation
    email: new FormControl('', [Validators.required, Validators.email])
  });

  onSubmit() {
    if (this.yourForm.valid) {
      console.log('Form Value:', this.yourForm.value);
      // Here you can send the form values to a server or process them as needed
      let userData = {
        name: this.yourForm.value.name,
        email: this.yourForm.value.email,
      }
      this.testBackendService.addUser(userData);

    }
  }



  ngOnInit(): void {
    let users = this.testBackendService.getUsers();
    console.log("component")
    console.log(users)
  }
}
