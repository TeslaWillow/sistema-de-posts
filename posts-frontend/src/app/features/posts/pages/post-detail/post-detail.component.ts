import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CreateCommentDto, Comment } from '@features/comments/interfaces/comments.interface';
import { CommentsService } from '@features/comments/services/comments.service';
import { Post } from '@features/posts/interfaces/posts.interface';
import { PostsService } from '@features/posts/services/posts.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'post-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export default class PostDetailComponent {
  private _route = inject(ActivatedRoute);
  private _postService = inject(PostsService);
  private _commentService = inject(CommentsService);
  private _fb = inject(FormBuilder);

  public post = signal<Post | null>(null);
  public comments = signal<Comment[]>([]);
  public isLoading = signal(true);

  public commentForm !: FormGroup;

  ngOnInit(): void {
    this._createForm();
    this._loadPost();
  }

  private _createForm(): void {
    this.commentForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      body: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  private _loadPost(): void { // TODO: Handle if ID not found
    this._route.paramMap.pipe(
      tap(() => this.isLoading.set(true)),
      // switchMap to get ID from route and fetch post details
      switchMap((params) => {
        const id = params.get('id')!;
        return this._postService.getPostById(id);
      })
    ).subscribe({
      next: (post) => {
        this.post.set(post);
        this._loadComments(post._id);
      }
    });
  }

  private _loadComments(postId: string) {
    this._commentService.getCommentsByPost(postId).subscribe({
      next: (comments) => {
        this.comments.set(comments);
        this.isLoading.set(false);
      },
    });
  }

  public onCommentSubmit(): void {
    // Prevent multiple clicks
    if(this.isLoading()) return;

    if (this.commentForm.invalid || !this.post()) return;

    const newComment: CreateCommentDto = {
      ...this.commentForm.value,
      postId: this.post()?._id
    };

    this._commentService.createComment(newComment).subscribe({
      next: () => {
        this._loadComments(this.post()?._id!);
        this.commentForm.reset();
      }
    });
  }

}
