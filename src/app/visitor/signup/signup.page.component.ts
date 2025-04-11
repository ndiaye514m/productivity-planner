import { Component, computed, inject, signal } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AuthenticationService, EmailAlreadyTakenError } from '../../core/port/authentication.service';
import { UserStore } from '../../core/store/user.store';
import { Visitor } from '../../core/entity/user.interface';


import { RegisterUserUseCase } from './domain/register-user.use-case';

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

  readonly #registerUserUseCase = inject(RegisterUserUseCase);
  readonly isLoading = signal(false);
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
 // readonly submitbutton = document.getElementById('{submit-button-id}') as HTMLButtonElement;


  readonly emailAlreadyTakenError = signal<EmailAlreadyTakenError|null>(null);
  readonly isEmailAlreadyTaken = computed(() => this.emailAlreadyTakenError()?.email === this.email());
  onSubmit() {
    console.log('Form submitted');
    this.isLoading.set(true);
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
      .catch(error=> {
        console.log('EmailAlreadyTaken should be displayed');
        this.isLoading.set(false);
        const isEmailAlreadyTaken = error instanceof EmailAlreadyTakenError;

        if(isEmailAlreadyTaken) {
         this.emailAlreadyTakenError.set(error);
        }
      });
      console.log('End of function');
  }
}
