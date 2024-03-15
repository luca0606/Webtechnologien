import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, firstValueFrom } from 'rxjs';
import { BASE_URL } from '../shared/sharedData';

@Injectable({
  providedIn: 'root',
})
export class BewerberlisteService {
  private applData = new BehaviorSubject<any>(null);
  currentData = this.applData.asObservable();

  constructor(private http: HttpClient) { }

  getApplList(): Observable<any> {
    return this.http.get(`${BASE_URL}application/`);
  }

  async setChanges(status: any, id: any): Promise<any> {
    try {
      const updateData = { status: status };
      const response = await firstValueFrom(
        this.http.patch(`${BASE_URL}application/${id}`, updateData)
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  }

  async setMessage(message: any, id: any): Promise<any> {
    try {
      const updateData = { message: message };
      const response = await firstValueFrom(
        this.http.patch(`${BASE_URL}application/${id}`, updateData)
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  }

  async deleteAppl(id: any): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.delete(`${BASE_URL}application/${id}`)
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  }

  async downloadAppl(fileName: string): Promise<Blob> {
    try {
      console.log('das ist filename ' + fileName);
      const response = await firstValueFrom(
        this.http.get(`${BASE_URL}job/download/${fileName}`, { responseType: 'blob' })
      );

      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

      return response;
    } catch (error) {
      console.error('Error Downloading Application:', error);
      throw error;
    }
  }
}
