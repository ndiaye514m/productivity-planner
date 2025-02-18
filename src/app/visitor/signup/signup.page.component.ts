import { Component, computed, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './signup.page.component.html',
  styleUrl: './signup.page.component.scss'
})
export class SignupPageComponent {
  productFormGroup!:FormGroup;
  submitted?:boolean=false;
  name=signal('');
  email=signal('');
  password=signal('');
  confirmedPassword=signal('');
  
  donnee=computed(()=> `${this.name()} ${this.email()} ${this.password()} ${this.confirmedPassword()}`);
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
