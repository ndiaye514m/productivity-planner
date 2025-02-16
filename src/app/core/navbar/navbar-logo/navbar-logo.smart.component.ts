import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navbar-logo',
  standalone: true,
  imports: [],
  templateUrl: './navbar-logo.component.svg',
  styleUrl: './navbar-logo.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarLogoSmartComponent {

}
