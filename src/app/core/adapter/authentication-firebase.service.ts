import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import {
  AuthenticationService,
  LoginResponseSignin,
  RegisterResponse,
} from '../port/authentication.service';

/* Represents the payload of the response when registering a new user in firebase
 *https://firebase.google.com/docs/reference/rest/auth?hl=fr#section-create-email-password
 */

interface FirebaseResponseSignup {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

interface FirebaseResponseSignin {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}

@Injectable()
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
    return this.#http.post<FirebaseResponseSignup>(url, body).pipe(
      map((response) => ({
        jwtToken: response.idToken,
        jwtRefreshToken: response.refreshToken,
        expiresIn: response.expiresIn,
        userId: response.localId,
      })),
    );
  }

  login(email: string, password: string): Observable<LoginResponseSignin> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`;
    // const url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfX4A4wx1HUFwJ87VfTbTpM0CtPx9-cnA`;

    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.#http.post<FirebaseResponseSignin>(url, body).pipe(
      map((response) => ({
        jwtToken: response.idToken,
        jwtRefreshToken: response.refreshToken,
        expiresIn: response.expiresIn,
        userId: response.localId,
        isRegistered: response.registered,
      })),
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

  /* getDataForFirestore(user: User) Objet <unknown>
  {

  }*/
}
