import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { PostInputComponent } from '../../ui';
import { PostComponent } from '../post/post.component';
import { firstValueFrom, fromEvent } from 'rxjs';
import { PostService } from '../../data';

@Component({
  selector: 'tt-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent implements AfterViewInit {
  postService = inject(PostService);
  feed = this.postService.posts;
  r2 = inject(Renderer2);

  hostElement = inject(ElementRef);

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  ngAfterViewInit() {
    this.resizeFeed();

    fromEvent(window, 'resize').subscribe(() => {
      console.log(12313);
    });
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;

    this.r2.setStyle(
      this.hostElement.nativeElement,
      'max-height',
      `${height}px`
    );
  }
}
