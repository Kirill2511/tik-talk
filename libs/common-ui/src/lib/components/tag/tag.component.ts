import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tt-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
  @Input()
  public value = '';
}
