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

  async saveChanges(id:any, changedJob:object):Promise<any>{
    ;
    try {
      console.log('Serviceaufruf Stelle ändern:');
      console.log(changedJob);
      const response = await firstValueFrom(this.http.patch(`${BASE_URL}job/${id}`, changedJob));
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  }

  
  async deleteJob(id:any):Promise<any>{
    
    try {
      const response = await firstValueFrom(this.http.delete(`${BASE_URL}job/${id}`));
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }

  async addJob(job:object):Promise<any>{
    
    try {
      const response = await firstValueFrom(this.http.post(`${BASE_URL}job`, job));
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error adding job:', error);
      throw error;
    }
  }
  
}
