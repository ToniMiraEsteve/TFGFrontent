import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthStorage } from '../general/localStorage/auth.stroge';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Respuesta } from '../models/respuesta';


@Injectable({
  providedIn: 'root'
})
export class RespuestasService {
  private baseUrl = environment.apiUrl;
  private url = this.baseUrl ;

  constructor(private authStorage: AuthStorage, private http: HttpClient) {}

  private getHttpOptions() {
    const token = this.authStorage.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
    return { headers };
  }

  public createRespuesta(respuesta: Partial<Respuesta>): Observable<any> {
    return this.http.post(this.url + '/respuesta', respuesta, this.getHttpOptions());
  }

  public borrarRespuesta(id: Number): Observable<any> {  
    return this.http.delete(this.url + '/respuestas/' + id, this.getHttpOptions());
  }

  public updateRespuesta(respuesta: Respuesta): Observable<any> {
    return this.http.put(this.url + '/respuestas/'+ respuesta.id, respuesta, this.getHttpOptions());
  }
  
  public getRespuestasByPostId(postId: number): Observable<any> {
    return this.http.get(this.url + '/posts/' + postId + '/respuestas', this.getHttpOptions());
  }
  
}
