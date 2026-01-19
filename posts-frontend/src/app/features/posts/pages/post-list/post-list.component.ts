import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Post } from '@features/posts/interfaces/posts.interface';
import { PostsService } from '@features/posts/services/posts.service';
import { RouterLink } from "@angular/router";
import { UiSpinnerLoaderComponent } from '@shared/ui/ui-spinner-loader/ui-spinner-loader.component';

@Component({
  selector: 'post-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, UiSpinnerLoaderComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export default class PostListComponent {
  private _postsService = inject(PostsService);

  // required signals
  public posts = signal<Post[]>([]);
  public search = signal<string>('');
  public isLoading = signal<boolean>(false);

  // reactive computed signal for filtered posts
  public filteredPosts: Signal<Post[]> = computed(() => {
    const term = this.search().toLowerCase();
    return this.posts().filter((p) =>
      p.title.toLowerCase().includes(term) ||
      p.author.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this._loadPosts();
  }

  private _loadPosts(): void {
    this.isLoading.set(true);
    this._postsService.getPosts().subscribe({
      next: (data) => {
        this.posts.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  public onDelete(id: string): void {
    if (!confirm('¿Estás seguro de que deseas eliminar esta publicación?')) return;

    this._postsService.deletePost(id).subscribe({
      next: () => {
        // Reactively update the local state to remove the deleted post
        // Filter out the deleted post from the posts signal
        this.posts.update((currentPosts) =>
          currentPosts.filter(post => post._id !== id)
        );
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
      }
    });
  }

}
