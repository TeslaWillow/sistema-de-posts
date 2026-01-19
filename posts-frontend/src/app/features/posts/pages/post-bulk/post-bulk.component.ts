import { CommonModule } from '@angular/common';
import { Component, inject, Signal, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PostsService } from '@features/posts/services/posts.service';
import { UiSpinnerLoaderComponent } from '@shared/ui/ui-spinner-loader/ui-spinner-loader.component';

@Component({
  selector: 'post-bulk-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, UiSpinnerLoaderComponent],
  templateUrl: './post-bulk.component.html',
  styleUrl: './post-bulk.component.scss'
})
export default class PostBulkComponent {
  private _postService = inject(PostsService);
  private _router = inject(Router);

  public jsonControl = new FormControl('', [Validators.required]);
  public isLoading = signal(false);
  public errorMessage = signal<string | null>(null);


  public get isJsonControlInvalid(): Signal<boolean> {
    return signal(this.jsonControl.invalid && this.jsonControl.touched);
  }

  public processBulk(): void {
    // Prevent multiple clicks
    if(this.isLoading()) return;

    if(this.jsonControl.invalid) {
      this.jsonControl.markAsTouched();
      this.errorMessage.set('El campo es obligatorio.');
      return;
    }

    this.errorMessage.set(null);

    try {
      const posts = JSON.parse(this.jsonControl.value || '[]');

      if (!Array.isArray(posts)) {
        throw new Error('El formato debe ser un arreglo de objetos [{}, {}]');
      }

      this.isLoading.set(true);
      this._postService.createBulkPosts(posts).subscribe({
        next: () => {
          this.isLoading.set(false);
          this._router.navigate(['/posts']);
        },
        error: (err) => {
          this.isLoading.set(false);
        }
      });

    } catch (e) {
      this.errorMessage.set('JSON inválido. Verifica el formato.');
    }
  }
}
