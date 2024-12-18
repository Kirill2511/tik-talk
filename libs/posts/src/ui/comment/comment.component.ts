import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PostComment } from '../../data';
import { AvatarCircleComponent } from '@tt/common-ui';

@Component({
  selector: 'tt-comment',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  comment = input<PostComment>();
}
