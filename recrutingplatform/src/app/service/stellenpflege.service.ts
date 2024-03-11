import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StellenService } from './stellen.service';

@Injectable({
  providedIn: 'root'
})
export class StellenpflegeService {

  jobList: any[];
  job:object;

  constructor(private http:HttpClient, private stellenService:StellenService) { }

  getJobById(id:any):Observable<any>{
    //Gibt Observable mit dem gefundenen Job wieder
    return this.stellenService.getJobList().pipe(
      map(jobs => jobs.find(job => job._id === id))
    );
  }

  setChanges(id:any,changedJob:object):Observable<any>{

    return this.http.patch(`http://localhost:3000/job/${id}`, changedJob);

  }

}
