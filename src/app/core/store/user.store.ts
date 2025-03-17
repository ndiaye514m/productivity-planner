import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";

import { User, Visitor } from "../entity/user.interface";

import { RegisterUserUseCaseService } from "../use-case/register-user.use-case.service";

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


    withMethods(
      (store, registerUserUseCaseService= inject(RegisterUserUseCaseService)) => {
    
      const register=(visitor: Visitor) => {

        registerUserUseCaseService.execute(visitor).then((user) => {
        patchState(store,{user});
        //patch state c le step 6  
        });
      };
  
    return { register };
  }
  )
);

  
