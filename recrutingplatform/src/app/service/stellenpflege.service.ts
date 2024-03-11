import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL } from '../shared/sharedData'
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

  async setChanges(id:any,changedJob:any):Promise<any>{
    
    try {
      const response = await firstValueFrom(this.http.patch(`${BASE_URL}job/${id}`, changedJob));
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  }

}
