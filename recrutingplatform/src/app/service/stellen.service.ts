import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BASE_URL } from '../shared/sharedData'

@Injectable({
  providedIn: 'root'
})
export class StellenService {
  private jobData = new BehaviorSubject<any>(null); // Initialwert für den Datenstrom
  currentData = this.jobData.asObservable(); // Observable, auf das Komponenten subscriben können


  constructor(private http: HttpClient) {}

  getJobList(): Observable<any> {
    // Dies gibt ein Observable zurück, das von der aufrufenden Stelle abonniert werden kann
    return this.http.get(`${BASE_URL}job`);
  }

  sendJobData(message:any){
    this.jobData.next(message) //Datenübergabe an den nächsten Component
  }
}
