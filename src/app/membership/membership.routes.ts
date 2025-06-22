import { Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard/dashboard.page.component';
import { PlanningPageComponent } from './planning/planning.page.component';
import { ProfilePageComponent } from './profile/profile.page.component';
import { WorkdayPageComponent } from './workday/workday.page.component';
import { SettingsPageComponent } from './settings/settings.page.component';

export const membershipRoutes: Routes = [
    {
            path: 'dashboard',
           // loadComponent: () => import('./dashboard/dashboard.page.component').then(c => c.DashboardPageComponent),
            title: 'Dashboard',
            component: DashboardPageComponent
        },
        {
            path: 'planning',
            //loadComponent: () => import('./planning/planning.page.component').then(c => c.PlanningPageComponent),
            title: 'Planning',
            component: PlanningPageComponent
        },
        {
            path: 'workday',
            //loadComponent: () => import('./workday/workday.page.component').then(c => c.WorkdayPageComponent),
            title: 'Workday',
            component: WorkdayPageComponent
        },
        {
            path: 'profile',
  
  
            //loadComponent: () => import('./profile/profile.page.component').then(c => c.ProfilePageComponent),
            title: 'Profile',
            component: ProfilePageComponent
        },
        {
            path: 'settings',
      //      loadComponent: () => import('./settings/settings.page.component').then(c => c.SettingsPageComponent),
            title: 'Settings',
            component: SettingsPageComponent
        }
  
  ]