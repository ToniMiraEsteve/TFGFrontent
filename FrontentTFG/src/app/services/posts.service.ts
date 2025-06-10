import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthStorage } from '../general/localStorage/auth.stroge';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {


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

  public getPosts(): Observable<any> {
    return this.http.get(this.url + '/post', this.getHttpOptions());
  }

  public getPostById(id: number): Observable<any> {
    return this.http.get(this.url + '/post/' +id, this.getHttpOptions());
  }

  public createPost(post: Partial<Post>): Observable<any> {
    return this.http.post(this.url + '/post', post, this.getHttpOptions());
  }

  public updatePost(post: Post): Observable<any> {
    return this.http.put(this.url + '/post/' + post.id, post, this.getHttpOptions());
  }

  public deletePost(id: number): Observable<any> {
    return this.http.delete(this.url + '/post/' + id, this.getHttpOptions());
  }
}
