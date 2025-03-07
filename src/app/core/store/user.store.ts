import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { AuthenticationService } from "../authentication.service";

export interface UserState {
    username: string;
    email: string;
  }

    
export const UserStore = signalStore(
    // 👇 Providing `BooksStore` at the root level.
  { providedIn: 'root' },
    withState<UserState>({
        username: '',
        email: '',
    }),
    withComputed((store) => {
    
        const isGoogleUser=computed(()=> store.email().endsWith('@google.com'));
        return {isGoogleUser};
    }),

    withMethods((store, authenticationService= inject(AuthenticationService)) => ({
      register(email:string,password:string): void {
        authenticationService.register(email,password).subscribe((response)=> {
          patchState(store,{email:response.userId});
        });
        
      },
    })
  )
  );

  
