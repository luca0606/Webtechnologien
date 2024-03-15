import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BASE_URL } from '../shared/sharedData'
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient, private router: Router,) { }

  /**
   * 
   * @returns Observable<any>
   * This function returns the filters from the backend
   */
  getFilters(): Observable<any> {
    return new Observable(observer => {
      this.http.get(`${BASE_URL}filter/`).subscribe(res => {
        observer.next(res);
        observer.complete();
      }, err => {
        observer.error(err);
      });
    });
  }

  /**
   * 
   * @param filter 
   * @returns 
   * This function adds a filter to the backend
   */
  async addFilter(filter: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.post(`${BASE_URL}filter/`, filter));
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 
   * @param filter 
   * @returns 
   * This function updates a filter in the backend
   */
  async updateFilter(filter: any): Promise<any> {
    try {
      console.log('Serviceaufruf Filter:');
      console.log(filter);
      const response = await firstValueFrom(this.http.patch(`${BASE_URL}filter/${filter._id}`, filter));
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error updating filter:', error);
      throw error;
    }
  }

  /**
   * 
   * @param filter
   * This function deletes a filter from the backend
   * @returns void
   *  
  */
  async deleteFilter(filter: any) {
    this.http.delete(`${BASE_URL}filter/${filter._id}`)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
