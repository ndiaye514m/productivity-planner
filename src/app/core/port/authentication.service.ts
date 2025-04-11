import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationFirebaseService } from '../adapter/authentication-firebase.service';

export type RegisterResponse = RegisterPayload | EmailAlreadyTakenError;
export type LoginResponse = LoginPayload;

interface RegisterPayload {
  jwtToken: string;
  jwtRefreshToken: string;
  expiresIn: string;
  userId: string;
}

//type Result<T,E>= {type:'ok',value: T} | {type:'error',error:E};
//export type Result<Response,Error>= {type:'ok',value: Response} | {type:'error',error:Error};
export class EmailAlreadyTakenError extends Error{
  constructor(readonly email: string) {
    super(`Email ${email} is already taken. Please try another email.`);
    this.name = 'EmailAlreadyTakenError';
  }
}

export interface LoginPayload {
  jwtToken: string;
  jwtRefreshToken: string;
  expiresIn: string;
  userId: string;
  isRegistered: boolean;
}

@Injectable({
  providedIn: 'root',
  useClass: AuthenticationFirebaseService
})

export abstract class AuthenticationService {
  abstract register(
    email: string,
    password: string,
  ): Observable<RegisterResponse|EmailAlreadyTakenError>;

  abstract login(
    email: string,
    password: string,
  ): Observable<LoginPayload>;

  /*save( email: string,userId: string,bearerToken: string): Observable<unknown> {
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
  }*/

  /* getDataForFirestore(user: User) Objet <unknown>
  {

  }*/
}
