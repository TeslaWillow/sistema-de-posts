import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, delay, Observable } from 'rxjs';

import { API_ENDPOINTS } from '@core/constants/api.constants';
import { ApiResponse } from '@core/interfaces/api-responce.interface';
import { environment } from '@env/environment';

import { Post } from '../interfaces/posts.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private _http = inject(HttpClient);
  private _apiUrl = environment.apiBaseUrl + API_ENDPOINTS.POSTS;

  public getPosts(): Observable<Post[]> {
    return this._http.get<ApiResponse<Post[]>>(this._apiUrl).pipe(
      delay(500), // delay for demo purposes
      map(res => res.data), // extract data
      tap(posts => console.log('Posts cargados:', posts))
    );
  }

  public getPostById(id: string): Observable<Post> {
    return this._http.get<ApiResponse<Post>>(`${this._apiUrl}/${id}`).pipe(
      map(res => res.data)
    );
  }
}
