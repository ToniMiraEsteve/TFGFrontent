import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthStorage } from '../general/localStorage/auth.stroge';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

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

    public getEventos(): Observable<any> {
        return this.http.get(this.url + '/eventos', this.getHttpOptions());
    }

    public editEvento(evento: any ): Observable<any> {
      return this.http.put(this.url + '/eventos/' + evento.id, evento, this.getHttpOptions());
    }
  
    public deleteEvento(id: Number): Observable<any> {  
      return this.http.delete(this.url + '/eventos/' + id, this.getHttpOptions());
    }
  
    public createEvento(evento: any): Observable<any> {
      return this.http.post(this.url + '/eventos', evento, this.getHttpOptions());
    }
  
}
