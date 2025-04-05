import { inject, Injectable } from "@angular/core";
import { UserService} from "../port/user.service";
import { ignoreElements, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
//import { environment } from "@env/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../entity/user.interface';

@Injectable({providedIn: 'root'})
export class UserFirebaseService implements UserService {
    readonly #http = inject(HttpClient);
    readonly #FIRESTORE_API_URL=`https://firestore.googleapis.com/v1/projects/${environment.firebaseConfig.projectId}/databases/(default)/documents`; 

    readonly #USER_COLLECTION_ID = 'users';
    readonly #FIREBASE_API_KEY = environment.firebaseConfig.apiKey;
    readonly #USER_COLLECTION_URL = `${this.#FIRESTORE_API_URL}/${this.#USER_COLLECTION_ID}?key=${this.#FIREBASE_API_KEY}&documentId=`;


    create(user: User,bearerToken: string): Observable<void> {
    const url = `${this.#USER_COLLECTION_URL}${user.id}`;
    const body = {
      fields: {
        name: { stringValue: user.name },
        email: { stringValue: user.email },
      },
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${bearerToken}`,
    });
    const options = { headers: headers };
    // const options = { headers };

    return this.#http.post(url, body, options).pipe(ignoreElements());
    // ou return this.#http.post(url, body, options).pipe(map(()=> undefined));
    }
}