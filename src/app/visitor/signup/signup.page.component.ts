import { Component, computed, inject, signal } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AuthenticationService, EmailAlreadyTakenError } from '../../core/port/authentication.service';
import { UserStore } from '../../core/store/user.store';
import { Visitor } from '../../core/entity/user.interface';

import { Router } from '@angular/router';
import { RegisterUserUseCaseService } from './register-user.use-case.service';

@Component({
  imports: [FormsModule],
  templateUrl: './signup.page.component.html',
  styleUrl: './signup.page.component.scss',
  //si on voulait provide le au niveau component on aurait fait
  //providersUser:[UserStore]
})
export class SignupPageComponent {
  
  submitted?: boolean = false;
  readonly store=inject(UserStore);
  readonly authenticationService = inject(AuthenticationService);

  readonly #registerUserUseCase = inject(RegisterUserUseCaseService);
  readonly #router=inject(Router);
  /*this.store.email()
  this.store.username()
  this.store.register(email,password)*/

  /*readonly email = signal('');
  readonly password = signal('');*/


 


  readonly name = signal('');
  readonly email = signal('');
  readonly password = signal('');
  readonly confirmPassword = signal('');

  readonly isPasswordMatchValid = computed(
    () => this.password() === this.confirmPassword(),
  );

  donnee = computed(
    () =>
      `${this.name()} ${this.email()} ${this.password()} ${this.confirmPassword()}`,
  );
  readonly submitbutton = document.getElementById('{submit-button-id}') as HTMLButtonElement;

  readonly emailAlreadyTakenErrorMessage=signal('');

  onSubmit() {
    console.log('Form submitted');
   /* this.authenticationService
      .register(this.email(), this.password())
      .subscribe((response) => {
        console.log('User registered with id: ', response.userId);
      });*/
      const visitor: Visitor={
        name: this.name(),
        email: this.email(),
        password:this.password(),
      }
      //this.store.register(visitor);

      this.#registerUserUseCase.execute(visitor)
      .then(() => this.#router.navigate(['/app/dashboard']))
      .catch(error=> {
        if(error instanceof EmailAlreadyTakenError)
        {
          console.log('EmailAlreadyTaken should be displayed');
          this.emailAlreadyTakenErrorMessage.set(error.message+' is already taken, please try another email.');
          this.submitbutton.disabled = true;
        }
      } );
      console.log('End of function');
  }
}
