import { Routes } from '@angular/router';
import { HomePageComponent } from './visitor/home/home.page.component';
import { SignupPageComponent } from './visitor/signup/signup.page.component';
import { LoginPageComponent } from './login/login.page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Productivity Planner',
  },
  {
    path: 'signin',
    component: LoginPageComponent,
    title: 'Signin',
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    title: 'Signup',
  },
];
