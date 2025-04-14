import { Component, computed, inject, signal } from '@angular/core';
//import { AuthenticationService } from '../core/port/authentication.service';
import { FormsModule } from '@angular/forms';
import { LoginUserUseCase } from './domain/login-user.use-case';
import { InvalidCredentialError } from './domain/invalid-credential.error';

@Component({
  imports: [FormsModule],
  templateUrl: './login.page.component.html',
  styleUrl: './login.page.component.scss'
})
export class LoginPageComponent {

  //readonly authenticationService = inject(AuthenticationService);
  readonly email = signal('');
  readonly password = signal('');
  readonly #loginUserUseCase = inject(LoginUserUseCase);
  readonly invalidCredentialError = signal<InvalidCredentialError|null>(null);



  donnee = computed(
    () =>
      `${this.email()} ${this.password()}`,
  );

  onSubmit() {
    console.log('Form submitted');
    console.log(this.email()+" "+this.password());
    this.#loginUserUseCase.execute(this.email(), this.password()).catch(error => {
      if(error instanceof InvalidCredentialError) {
        this.invalidCredentialError.set(error);
      }
    })
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
