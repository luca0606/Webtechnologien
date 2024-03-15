import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../shared/sharedData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BewerbenService {
  constructor(private http: HttpClient) { }

  addApplication(application: object) {
    this.http.post(`${BASE_URL}application`, application)
      .subscribe((res) => {
        console.log(res + 'hai!');
        return true;
      });
  }

  async uploadApplication(FormData: FormData): Promise<any> {

    this.http
      .post(`${BASE_URL}job/upload`, FormData)
      .subscribe((res) => {
        return true;
      });
  }

  getJobByID(id: any): Observable<any> {
    return this.http.get(`${BASE_URL}job/${id}`);
  }

}




