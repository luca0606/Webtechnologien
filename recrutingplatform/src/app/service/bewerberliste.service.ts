import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, firstValueFrom } from 'rxjs';
import { BASE_URL } from '../shared/sharedData';

@Injectable({
  providedIn: 'root',
})
export class BewerberlisteService {
  private applData = new BehaviorSubject<any>(null); // Initialwert für den Datenstrom
  currentData = this.applData.asObservable(); // Observable, auf das Komponenten subscriben können

  constructor(private http: HttpClient) {}

  //Funktionen für Bewerbersicht

  getApplList(): Observable<any> {
    // Dies gibt ein Observable zurück, das von der aufrufenden Stelle abonniert werden kann
    return this.http.get('http://localhost:3000/application/');
  }

  //Status change
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

  //Send Message
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

  //Delete Application
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
}
