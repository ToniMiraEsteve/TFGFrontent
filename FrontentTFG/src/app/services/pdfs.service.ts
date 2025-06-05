import { Injectable } from '@angular/core';
import {  HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthStorage } from '../general/localStorage/auth.stroge';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PdfsService {

  private baseUrl = environment.apiUrl;
  private url = this.baseUrl;

  constructor(private authStorage: AuthStorage,private http: HttpClient) { }

  private getHttpOptions() {
    const token = this.authStorage.getToken(); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });

    return { headers };
  }

  crearPdf(pdf: any): Observable<any> {
    return this.http.post(this.url + '/pdf', pdf, this.getHttpOptions());
  }

}
