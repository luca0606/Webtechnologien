import { Component, OnInit } from '@angular/core';
import { TestBackendService } from 'src/app/service/test-backend.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(private testBackendService: TestBackendService) {

  }

  ngOnInit(): void {
    let users = this.testBackendService.getUsers();
    console.log("component")
    console.log(users)
  }
}
