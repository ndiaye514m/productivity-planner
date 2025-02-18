import { Component, computed, signal } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.page.component.html',
  styleUrl: './signup.page.component.scss'
})
export class SignupPageComponent {
onSubmit() {
throw new Error('Method not implemented.');
}
  productFormGroup!:FormGroup;
  submitted?:boolean=false;
  readonly name = signal('');
  readonly email = signal('');
  readonly password = signal('');
  readonly confirmPassword = signal('');

  readonly isPasswordMatchValid = computed(
    () => this.password() === this.confirmPassword()
  );
  
  donnee=computed(()=> `${this.name()} ${this.email()} ${this.password()} ${this.confirmPassword()}`);
  onSaveProduct() {
    console.log("save a product..");
    this.submitted=true;
    /*if(this.productFormGroup?.invalid) return
    this.productsService.saveProduct(this.productFormGroup?.value)
    .subscribe(data=>{
      alert("Success Saving Product");
  
    });*/
    }
}
