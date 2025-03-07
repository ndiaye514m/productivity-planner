import { Component, computed, inject, signal } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../core/authentication.service';
import { UserStore } from '../../core/store/user.store';

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
  /*this.store.email()
  this.store.username()
  this.store.register(email,password)*/



  readonly authenticationService = inject(AuthenticationService);
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
  onSaveProduct() {
    console.log('save a product..');
    this.submitted = true;
    /*if(this.productFormGroup?.invalid) return
    this.productsService.saveProduct(this.productFormGroup?.value)
    .subscribe(data=>{
      alert("Success Saving Product");
  
    });*/
  }

  onSubmit() {
    console.log('Form submitted');
    this.authenticationService
      .register(this.email(), this.password())
      .subscribe((response) => {
        console.log('User registered with id: ', response.userId);
      });
  }
}
