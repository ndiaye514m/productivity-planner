import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './core/authentication.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'productivity-planner';
//test zone
readonly #authenticationService =inject(AuthenticationService); 


onLogin(){
  const email='ryan.gravenberch@gmail.com';
  const password='passeroui';
  this.#authenticationService.login(email,password).subscribe((response)=>console.log(response));
  //this.#authenticationService.login('ryan.gravenberch@gmail.com','passeroui').subscribe((response)=>console.log(response));
  //this.#authenticationService.login("demo@gmail.com","passer").subscribe((response)=>console.log(response));
}

onSave(){
//const email='ryan.gravenberch@gmail.com';
// const password='passeroui';
const email='john.dalton@gmail.com';
  const password='oepasser';
  this.#authenticationService.login(email,password).pipe(
    switchMap((response) => {
      console.log(response);
      const {email,localId, idToken}=response;
      return this.#authenticationService.save(email,localId,idToken);
    })
  ).subscribe((response)=>console.log(response));
 // this.#authenticationService.login(email,password).subscribe((response)=>console.log(response));
  //this.#authenticationService.login('ryan.gravenberch@gmail.com','passeroui').subscribe((response)=>console.log(response));
  //this.#authenticationService.login("demo@gmail.com","passer").subscribe((response)=>console.log(response));
}

}
