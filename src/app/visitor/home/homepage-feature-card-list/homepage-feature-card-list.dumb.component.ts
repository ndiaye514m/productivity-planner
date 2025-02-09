import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FeatureCardList } from './homepage-feature-card-list.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage-feature-card-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage-feature-card-list.dumb.component.html',
  styleUrl: './homepage-feature-card-list.dumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageFeatureCardListDumbComponent {

  readonly featureCardList=input.required<FeatureCardList>();
}
