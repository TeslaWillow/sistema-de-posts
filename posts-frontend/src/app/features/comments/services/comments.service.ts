import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '@core/constants/api.constants';
import { ApiResponse } from '@core/interfaces/api-responce.interface';
import { environment } from '@env/environment';
import { Comment } from '../interfaces/comments.interface';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { CreateCommentDto } from '../interfaces/comments.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private _http = inject(HttpClient);
  private _apiUrl = environment.apiBaseUrl + API_ENDPOINTS.COMMENTS;

  // GET /comments?postId={id}
  public getCommentsByPost(postId: string): Observable<Comment[]> {
    return this._http.get<ApiResponse<Comment[]>>(`${this._apiUrl}?postId=${postId}`).pipe(
      map(res => res.data)
    );
  }

  public createComment(comment: CreateCommentDto): Observable<ApiResponse<Comment>> {
    return this._http.post<ApiResponse<Comment>>(this._apiUrl, comment);
  }
}
