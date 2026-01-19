import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  private _route = inject(ActivatedRoute);

  public postForm!: FormGroup;
  public isLoading = signal<boolean>(false);
  // For editing
  public isEditMode = signal(false);
  public postId = signal<string | null>(null);

  ngOnInit(): void {
    this._createForm();
    this._onEdit();
  }

  private _onEdit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (!id) return;

    this.isEditMode.set(true);
      this.postId.set(id);

    // Load existing post data
    this._postService.getPostById(id).subscribe((post) => {
        this.postForm.patchValue(post); // Fill form with existing data
    });
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
    const data = this.postForm.value;
    const request = this.isEditMode()
      ? this._postService.updatePost(this.postId()!, data)
      : this._postService.createPost(data);

    request.subscribe({
      next: () => {
        this.isLoading.set(false);
        // Redirect to list of posts after successful creation or update
        this._router.navigate(['/posts'])
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

}
