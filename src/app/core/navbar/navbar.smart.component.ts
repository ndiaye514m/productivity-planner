import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarLogoSmartComponent } from "./navbar-logo/navbar-logo.smart.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar',
    imports: [NavbarLogoSmartComponent, RouterLink],
    templateUrl: './navbar.smart.component.html',
    styleUrl: './navbar.smart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarSmartComponent {

}
