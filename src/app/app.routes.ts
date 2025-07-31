import { Routes } from '@angular/router';
import { ShellLayoutComponent } from './membership/core/shell/shell.layout.component';



export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./visitor/home/home.page.component').then(component => component.HomePageComponent),
    title: 'Productivity Planner',
  },
  {
    path: 'signin',
    loadComponent: () => import('./visitor/login/login.page.component').then(component => component.LoginPageComponent),
    title: 'Signin',
  },
  {
    path: 'signup',
    loadComponent: () => import('./visitor/signup/signup.page.component').then(component => component.SignupPageComponent),
    title: 'Signup',
  },
  
  {
    path: 'app',
    component: ShellLayoutComponent,
    //loadComponent: () => import('./membership/core/shell/shell.layout.component').then(component => component.ShellLayoutComponent),
    loadChildren: () => import('./membership/membership.routes').then(routes => routes.membershipRoutes),
    title: 'Productivity Planner -',
   
  }


];
