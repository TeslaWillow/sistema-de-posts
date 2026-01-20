import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Comment } from '@features/comments/interfaces/comments.interface';

@Component({
  selector: 'comments-single-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent {
  public comment = input.required<Comment>();
}
