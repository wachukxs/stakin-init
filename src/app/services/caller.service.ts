import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserSignUpDetails, UserLoginDetails } from '../models/User';
import { URLPaths } from '../utils/constants.utils';

@Injectable({
  providedIn: 'root'
})
export class CallerService {

  constructor(private http: HttpClient) { }

  private httpOptions = { // maybe add timeout later
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    }),
    observe: 'response' as const,
    responseType: 'json' as const,
  };

  private handleError(error: HttpErrorResponse) {
    console.error('got this error', error);
    
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(error);
      
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.

    return throwError(error.error?.message_details ? error.error.message_details : 'Something bad happened; please try again later.'); // 'Something bad happened; please try again later.'
  }

  signUpUser(userDetails: UserSignUpDetails) {
    console.log('signing up via', environment.baseURL + URLPaths.userSignUp);
    
    return this.http.post(environment.baseURL + URLPaths.userSignUp, userDetails, this.httpOptions)
    .pipe(
      retry(1), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  logInFarmer(userDetails: UserLoginDetails) {
    console.log('logging in up via', environment.baseURL + URLPaths.userLogIn);
    
    return this.http.post(environment.baseURL + URLPaths.userLogIn, userDetails, this.httpOptions)
    .pipe(
      retry(1), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
}
