import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PostsService } from '@features/posts/services/posts.service';

@Component({
  selector: 'post-create-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export default class PostCreateComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _postService = inject(PostsService);
  private _router = inject(Router);

  public postForm!: FormGroup;
  public isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this._createForm();
  }

  private _createForm(): void {
    this.postForm = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
      author: ['', [Validators.required]]
    });
  }

  public isControlInvalid(controlName: string): boolean {
    const control = this.postForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  public onSubmit(): void {
    // Prevent multiple clicks
    if (this.isLoading()) { return; }

    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this._postService.createPost(this.postForm.value).subscribe({
      next: () => {
        // Redirect to list of posts after successful creation
        this.isLoading.set(false);
        this._router.navigate(['/posts']);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

}
