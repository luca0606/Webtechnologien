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
    return this.http.get(`${BASE_URL}application/`);
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

  async downloadAppl(fileName:string):Promise<Blob>{
    try {
      console.log('das ist filename ' + fileName);
      const response = await firstValueFrom(
        this.http.get(`${BASE_URL}job/download/${fileName}`, { responseType: 'blob' })
      );
      console.log(response);
    
    //Download im Browser ausführen  
    const url = window.URL.createObjectURL(response);
    const a = document.createElement('a'); //HTML-Link Element
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a); // Hinzufügen des Links zum Dokument
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove(); // Entfernt den Link aus dem Dokument

    return response;
    } catch (error) {
      console.error('Error Downloading Application:', error);
      throw error;
    }

  }

}
