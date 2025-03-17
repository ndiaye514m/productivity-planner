import { inject, Injectable } from '@angular/core';
import { User, Visitor } from '../entity/user.interface';
import { AuthenticationService } from '../authentication.service';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../repository/user.service';



@Injectable({
  providedIn: 'root'
})
export class RegisterUserUseCaseService {
  readonly #authenticationService= inject(AuthenticationService);
  readonly #userService=inject(UserService);
  //readonly #userStore=inject(UserStore);

  async execute(visitor:  Visitor): Promise<User>{
      //step 1 puis step 2
      //Authentication for new user:1 & 2
      const authResponse=await firstValueFrom( this.#authenticationService.register(visitor.email,visitor.password));
      
      //step 3
      //localStorage:3
      localStorage.setItem('jwtToken',authResponse.jwtToken);
      localStorage.setItem('jwtRefreshToken',authResponse.jwtRefreshToken);
      localStorage.setItem('expiresIn',authResponse.expiresIn);

      //step 4 puis 5
      const user: User = {
        id:authResponse.userId,
        name: visitor.name,
        email: visitor.email,
      }
     await this.#userService.create(user,authResponse.jwtToken);

      //step 6 se passe dans store

     return user;

  }
  
  
}
/*
 jwtToken: string;
  jwtRefreshToken: string;
  expiresIn: string;
  userId: string;
*/