import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { AuthenticationService } from "../authentication.service";
import { User, Visitor } from "../entity/user.interface";
import { UserService } from "../repository/user.service";

export interface UserState {
    user: User | undefined;
  }

    
export const UserStore = signalStore(
    // 👇 Providing `BooksStore` at the root level.
  { providedIn: 'root' },
    withState<UserState>({
      user: undefined,
       
    }),
    withComputed((store) => {
    
        const isGoogleUser=computed(()=> !!store.user()?.email.endsWith('@google.com'));
        return {isGoogleUser};
    }),


    withMethods((store, authenticationService= inject(AuthenticationService),
    userService=inject(UserService)) => ({
      register(visitor: Visitor): void {
        authenticationService.register(visitor.email,visitor.password).subscribe((response)=> {
          const user: User={
            id: response.userId,
            name: visitor.name,
            email: visitor.email,
           
          }
          userService.create(user,response.jwtToken).subscribe(()=>{

            patchState(store,{user});
          });
        /*  this.store.register(visitor);
          
          patchState(store,{email:response.userId});*/
        });
        
      },
    })
  )
  );

  
