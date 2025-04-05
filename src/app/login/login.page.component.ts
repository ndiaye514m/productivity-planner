import { Component, computed, signal } from '@angular/core';
//import { AuthenticationService } from '../core/port/authentication.service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  templateUrl: './login.page.component.html',
  styleUrl: './login.page.component.scss'
})
export class LoginPageComponent {

  //readonly authenticationService = inject(AuthenticationService);
  readonly email = signal('');
  readonly password = signal('');
  


  donnee = computed(
    () =>
      `${this.email()} ${this.password()}`,
  );

  onSubmit() {
    console.log('Form submitted');
    console.log(this.email()+" "+this.password());
   /* this.authenticationService
      .register(this.email(), this.password())
      .subscribe((response) => {
        console.log('User registered with id: ', response.userId);
      });*/
   /*   const visitor: Visitor={
        name: this.name(),
        email: this.email(),
        password:this.password(),
      }
      this.store.register(visitor);*/
  }

}
