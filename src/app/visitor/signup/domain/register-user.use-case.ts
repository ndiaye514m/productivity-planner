import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User, Visitor } from 'src/app/core/entity/user.interface';
import { AuthenticationService, EmailAlreadyTakenError } from 'src/app/core/port/authentication.service';
import { UserService } from 'src/app/core/port/user.service';
import { UserStore } from 'src/app/core/store/user.store';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserUseCase {

  readonly #authenticationService=inject(AuthenticationService);
  readonly #userService=inject(UserService);
  readonly #userStore=inject(UserStore);
  readonly #router = inject(Router);

  async execute(visitor: Visitor): Promise<void>{
    // 1. Auhthenticate new visitor
    const name = visitor.name;
    const email=visitor.email;
    const password=visitor.password;

    const registerResponse=await firstValueFrom(this.#authenticationService.register(email,password));
    console.log(registerResponse);

    if(registerResponse instanceof EmailAlreadyTakenError)
    {
      throw registerResponse;
    } 
    // 2. Add credentials information in webapp storage
    const id=registerResponse.userId;
    const jwtToken=registerResponse.jwtToken;
   

    const jwtRefreshToken=registerResponse.jwtRefreshToken;
    const expiresIn=registerResponse.expiresIn;

    // ou const { userId: id, jwtToken, jwtRefreshToken, expiresIn } = registerResponse; 

    
    localStorage.setItem('jwtToken',jwtToken);
    localStorage.setItem('email',email);

    localStorage.setItem('jwtRefreshToken', jwtRefreshToken); 
    localStorage.setItem('expiresIn', expiresIn);

    // 3. Create new user in database 
    const user:User={
      id: id,
      name:name,
      email:email
    };

    await firstValueFrom( this.#userService.create(user,jwtToken));


    // 4. Add user in app Store
    this.#userStore.load(user);

    // 5. Redirect user to dashboard
    this.#router.navigate(['/app/dashboard']);

  };
}
