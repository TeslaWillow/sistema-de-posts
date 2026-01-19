import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, delay, Observable } from 'rxjs';

import { API_ENDPOINTS } from '@core/constants/api.constants';
import { ApiResponse } from '@core/interfaces/api-responce.interface';
import { environment } from '@env/environment';

import { CreatePostDto, Post } from '../interfaces/posts.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private _http = inject(HttpClient);
  private _apiUrl = environment.apiBaseUrl + API_ENDPOINTS.POSTS;

  /**
   * Get all posts
   * @returns Observable<Post[]>
   */
  public getPosts(): Observable<Post[]> {
    return this._http.get<ApiResponse<Post[]>>(this._apiUrl).pipe(
      delay(500), // delay for demo purposes
      map(res => res.data), // extract data
      tap(posts => console.log('Posts cargados:', posts))
    );
  }

  /**
   * Get a single post by ID
   * @param id Post ID
   * @returns Observable<Post>
   */
  public getPostById(id: string): Observable<Post> {
    return this._http.get<ApiResponse<Post>>(`${this._apiUrl}/${id}`).pipe(
      map(res => res.data)
    );
  }

  /**
   * Create a new post
   * @param post CreatePostDto
   * @returns Observable<Post>
   */
  public createPost(post: CreatePostDto): Observable<Post> {
    return this._http.post<ApiResponse<Post>>(this._apiUrl, post).pipe(
      map(res => res.data)
    );
  }

  /**
   * Create many posts at once
   * @param posts Array of CreatePostDto
   * @returns Observable<Post[]>
   */
  public createManyPosts(posts: CreatePostDto[]): Observable<Post[]> {
    return this._http.post<ApiResponse<Post[]>>(`${this._apiUrl}/bulk`, { posts }).pipe(
      map(res => res.data)
    );
  }

  /**
   * Update a post by ID
   * @param id Post ID
   * @param post CreatePostDto
   * @returns Observable<Post>
   */
  public updatePost(id: string, post: CreatePostDto): Observable<Post> {
    return this._http.put<ApiResponse<Post>>(`${this._apiUrl}/${id}`, post).pipe(
      map(res => res.data)
    );
  }

  /**
   * Delete a post by ID
   * @param id Post ID
   * @returns Observable<void>
   */
  public deletePost(id: string): Observable<void> {
    return this._http.delete<ApiResponse<null>>(`${this._apiUrl}/${id}`).pipe(
      map(() => undefined)
    );
  }
}
