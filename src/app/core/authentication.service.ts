import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

/* Represents the payload of the response when registering a new user in firebase
*https://firebase.google.com/docs/reference/rest/auth?hl=fr#section-create-email-password
*/

interface FirebaseResponseRegister
{
  "idToken": string,
  "email": string,
  "refreshToken": string,
  "expiresIn": string,
  "localId": string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly #http=inject(HttpClient);
 
   register(email:string, password:string): Observable<FirebaseResponseRegister>{
    const url=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`;
    const body={
      email:email,
      password:password,
      returnSecureToken:true
      };
    return this.#http.post<FirebaseResponseRegister>(url,body);
   }
}
