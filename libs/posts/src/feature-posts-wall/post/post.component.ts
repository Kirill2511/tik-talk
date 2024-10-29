import { Component, inject, input, OnInit, signal } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';

import { firstValueFrom } from 'rxjs';
import { CommentComponent, PostInputComponent } from '../../ui';
import { Post, PostComment, PostService } from '../../data';
import {
  AvatarCircleComponent,
  FormatDatePipe,
  SvgIconComponent,
} from '@tt/common-ui';

@Component({
  selector: 'tt-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    FormatDatePipe,
    AsyncPipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  post = input<Post>();

  comments = signal<PostComment[]>([]);

  postService = inject(PostService);

  protected date: Date | number = Date.now();

  ngOnInit() {
    this.comments.set(this.post()!.comments);
    this.date = this.post()!.createdAt
      ? Date.parse(this.post()!.createdAt)
      : Date.now();
  }

  async onCreated() {
    const comments = await firstValueFrom(
      this.postService.getCommentsByPostId(this.post()!.id)
    );

    this.comments.set(comments);
  }
}
