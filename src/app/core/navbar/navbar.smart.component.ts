import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarLogoSmartComponent } from "./navbar-logo/navbar-logo.smart.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NavbarLogoSmartComponent],
  templateUrl: './navbar.smart.component.html',
  styleUrl: './navbar.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarSmartComponent {

}
