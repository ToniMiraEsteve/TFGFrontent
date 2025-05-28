import { Injectable } from '@angular/core';
import {  HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthStorage } from '../general/localStorage/auth.stroge';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})

export class NinyosService {

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

  public getNinyos(): Observable<any> {
    return this.http.get(this.url + '/ninyo', this.getHttpOptions());
  }

  public getNinyoById(id: Number): Observable<any> {
    return this.http.get(this.url + '/ninyo/' + id, this.getHttpOptions());
  }

  public editNinyo(ninyo: any): Observable<any> {
    return this.http.put(this.url + '/ninyo', ninyo, this.getHttpOptions());
  }



}
