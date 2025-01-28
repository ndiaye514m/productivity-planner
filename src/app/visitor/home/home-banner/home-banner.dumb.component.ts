import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-home-banner',
  standalone: true,
  imports: [],
  templateUrl: './home-banner.dumb.component.html',
  styleUrl: './home-banner.dumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeBannerDumbComponent {
  title=input.required<string>();
  description=input.required<string>();
  buttonLabel=input.required<string>();
}
