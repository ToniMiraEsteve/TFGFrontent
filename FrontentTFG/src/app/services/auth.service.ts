import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public HTTP_HEADER_EMAIL = 'email';
  public HTTP_HEADER_PASSWORD = 'password';

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  attempAuth(email: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + '/login',{email: email,password: password},{observe: 'response'});
  }
}
