import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'productivity-planner';
  // eeslint-disable-next-line @typescript-eslint/no-explicit-any
  //readonly isStaging=!(environment as any).production;
  //eadonly isStaging=environment.production;
 // isProductionEnvironment=environment.production;
  //firebaseProjectId=environment.firebaseConfig.projectId;

}
