import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Post } from '@features/posts/interfaces/posts.interface';
import { ButtonComponent } from '@shared/components/atoms/button/button.component';
import { RelativeDatePipe } from '@shared/pipes/relative-date.pipe';
import { TruncatePipe } from '@shared/pipes/truncate.pipe';

@Component({
  selector: 'posts-post-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TruncatePipe, RelativeDatePipe, RouterModule],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {

  // Inputs (signals)
  public post = input.required<Post>();

  // Outputs (signals)
  public edit = output<string>();
  public delete = output<string>();

  public onEdit(): void { this.edit.emit(this.post()._id); }

  public onDelete(): void { this.delete.emit(this.post()._id); }
}
