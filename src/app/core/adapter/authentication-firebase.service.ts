import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
//import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import {
  AuthenticationService,
  LoginResponse,
  RegisterResponse,
} from '@app/core/port/authentication.service';
import { EmailAlreadyTakenError } from '@app/visitor/signup/domain/email-already-taken.error';
import { InvalidCredentialError } from '@app/visitor/login/domain/invalid-credential.error';

//import { environment } from '../../../environments/environment';

/* Represents the payload of the response when registering a new user in firebase
 *https://firebase.google.com/docs/reference/rest/auth?hl=fr#section-create-email-password
 */
//export const environment = {};
interface FirebaseResponseSignupPayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

interface FirebaseResponseSigninPayload {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}

export interface FirebaseRefreshTokenPayload {
  expires_in: string;
  token_type: string; // always "Bearer"
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationFirebaseService implements AuthenticationService {
  readonly #http = inject(HttpClient);

  register(email: string, password: string): Observable<RegisterResponse> {
    console.log('Firebase register method called');
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`;

    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.#http.post<FirebaseResponseSignupPayload>(url, body).pipe(
      map((response) => ({
               jwtToken: response.idToken,
          jwtRefreshToken: response.refreshToken,
          expiresIn: response.expiresIn,
          userId: response.localId,
        
       
      })),
      catchError(error => {
        if(error.error.error.message === 'EMAIL_EXISTS')
         {
          return of( new EmailAlreadyTakenError(email));
        
          }
          return throwError(() => error);
        })
    );
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`;
    // const url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfX4A4wx1HUFwJ87VfTbTpM0CtPx9-cnA`;

    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.#http.post<FirebaseResponseSigninPayload>(url, body).pipe(
      map((response) => ({
        jwtToken: response.idToken,
        jwtRefreshToken: response.refreshToken,
        expiresIn: response.expiresIn,
        userId: response.localId,
        isRegistered: response.registered,
      })),
      catchError(error => {

          if(error.error.error.message === 'INVALID_LOGIN_CREDENTIALS') {
            return of(new InvalidCredentialError());
          }

        return throwError(() => error);
      })
    );
  }

  save(
    email: string,
    userId: string,
    bearerToken: string,
  ): Observable<unknown> {
    const baseUrl = `https://firestore.googleapis.com/v1/projects/${environment.firebaseConfig.projectId}/databases/(default)/documents`;
    const userFirestoreCollectionId = 'users';
    const url = `${baseUrl}/${userFirestoreCollectionId}?key=${environment.firebaseConfig.apiKey}&documentId=${userId}`;
    const body = {
      fields: {
        email: { stringValue: email },
      },
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${bearerToken}`,
    });
    const options = { headers: headers };
    // const options = { headers };

    return this.#http.post(url, body, options);
  }


  refreshToken(refreshToken: string): Observable<{ jwtToken: string, userId: string }> {
    const url = `https://securetoken.googleapis.com/v1/token?key=${environment.firebaseConfig.apiKey}`;
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken)
      .toString();

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.#http.post<FirebaseRefreshTokenPayload>(url, body, { headers }).pipe(
      map(response => ({ jwtToken: response.id_token, userId: response.user_id })),
    );
  }

  /* getDataForFirestore(user: User) Objet <unknown>
  {

  }*/
}
