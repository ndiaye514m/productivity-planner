import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthenticationService } from 'src/app/core/port/authentication.service';
import { UserService } from 'src/app/core/port/user.service';
import { UserStore } from 'src/app/core/store/user.store';
import { InvalidCredentialError } from './invalid-credential.error';

@Injectable({
  providedIn: 'root'
})
export class LoginUserUseCase {

  readonly #authenticationService=inject(AuthenticationService);
  readonly #userService=inject(UserService);
  readonly #userStore=inject(UserStore);
  readonly #router = inject(Router);

  async execute(email: string, password: string): Promise<void>{
    // 1. Auhthenticate existing user
    const loginResponse=await firstValueFrom(this.#authenticationService.login(email,password));

    //2. Throw error if credentials are invalid
    if(loginResponse instanceof InvalidCredentialError)
      {
        throw loginResponse;
      } 
 

   
   // console.log(loginResponse);

    // 3. Add credentials information in webapp storage
    const userId=loginResponse.userId;
    const jwtToken=loginResponse.jwtToken;
    const jwtRefreshToken=loginResponse.jwtRefreshToken;
    const expiresIn=loginResponse.expiresIn;

    // ou const { userId: id, jwtToken, jwtRefreshToken, expiresIn } = registerResponse; 

    
    localStorage.setItem('jwtToken',jwtToken);
    localStorage.setItem('jwtRefreshToken', jwtRefreshToken); 
    localStorage.setItem('expiresIn', expiresIn);

    // 4. Create new user in app store 
    const user=await firstValueFrom( this.#userService.fetch(userId,jwtToken));
    this.#userStore.load(user);


    // 5. Redirect user to dashboard
    this.#router.navigate(['/app/dashboard']);

  };
 
}






  

