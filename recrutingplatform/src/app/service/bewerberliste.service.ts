import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BewerberlisteService {
  private jobData = new BehaviorSubject<any>(null); // Initialwert für den Datenstrom
  currentData = this.jobData.asObservable(); // Observable, auf das Komponenten subscriben können

  constructor(private http: HttpClient) {}

  //Funktionen für Bewerbersicht

  getJobList(): Observable<any> {
    // Dies gibt ein Observable zurück, das von der aufrufenden Stelle abonniert werden kann
    return this.http.get('http://localhost:3000/application/');
  }

  // Funktionen für Recruitersicht
  addJob(
    jobTitle: String,
    jobDescription: String,
    jobRequirements: String,
    location: String,
    benefits: String,
    salaryRangeMin: Number,
    salaryRangeMax: Number,
    vacancyActive: Boolean
  ) {
    let job = {
      benefits: benefits,
      jobDescription: jobDescription,
      jobRequirements: jobRequirements,
      jobTitle: jobTitle,
      location: location,
      salaryRangeMin: salaryRangeMin,
      salaryRangeMax: salaryRangeMax,
      vacancyActive: vacancyActive,
    };

    console.log(job);
    this.http.post('http://localhost:3000/job/', job).subscribe((res) => {
      return true;
      console.log(res);
    });
  }

  deleteJob() {}

  sendJobData(message: any) {
    this.jobData.next(message); //Datenübergabe an den nächsten Component
  }
}
