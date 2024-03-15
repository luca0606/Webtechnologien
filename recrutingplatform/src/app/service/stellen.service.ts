import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BASE_URL } from '../shared/sharedData'

@Injectable({
  providedIn: 'root'
})
export class StellenService {
  private jobData = new BehaviorSubject<any>(null);
  currentData = this.jobData.asObservable();


  constructor(private http: HttpClient) { }

  getJobList(): Observable<any> {
    return this.http.get(`${BASE_URL}job`);
  }

  sendJobData(message: any) {
    this.jobData.next(message)
  }
}
