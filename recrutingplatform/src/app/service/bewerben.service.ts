import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BewerbenService {
  constructor(private http: HttpClient) {}

  addApplication(bewerbung: string, datei: File) {
    let application = {
      bewerbung: bewerbung,
      datei: datei,
    };

    this.http
      .post('http://localhost:3000/user/', application)
      .subscribe((res) => {
        return true;
        console.log(res);
      });
  }
}
