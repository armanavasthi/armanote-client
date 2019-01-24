import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/shareReplay';
import { Subject } from 'rxjs/Subject';
import { LoginUser } from '../_models/loginuser';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

	baseUrl: 'http://localhost:6060/';

	// private profileImgUrl = new Subject<any>();
	// changeEmitted$ = this.profileImgUrl.asObservable();

	profileImgUrl = new Subject<any>();

	loginSuccess = new Subject<any>();

	constructor(private http: HttpClient, private router: Router) {
	}

	attemptAuth(username: string, password: string) {
		const credentials = {'email': username, 'password': password};
		localStorage.setItem('id_token', '');
		return this.http.post('http://localhost:6060/token/generate-token', credentials)
		.shareReplay() // share replay is an operator to prevent the receiver of this Observable from accidentally triggering multiple POST requests due to multiple subscriptions.
		.map(
			response => response
		)
		.catch(
			(error: HttpErrorResponse) => {
				console.log("The error is: " , error);
				this.loginSuccess.next(false);
				return Observable.throw(error);
			}
		)
		// newer approach to catch the error https://stackoverflow.com/a/50969201/7456022
		// .pipe(
		// 	catchError(err => {
		// 		if (err.status === 401) {
		// 			console.log("The acc den error came::  ", err);
		// 		} else {
		// 			console.log("Some Error came::  ", err);
		// 			return Observable.throw(err);
		// 		}
		// 	})
		// )
		.subscribe(
			(response: LoginUser) => {
				console.log("The token is:   ", response);
				localStorage.setItem('fullname', response.fullName);
				// for now image is hardcoded in backend as we don't have aws s3 account working
				localStorage.setItem('imgUrl', response.profileImg);
				localStorage.setItem('email', response.email);
				localStorage.setItem('userId', response.userId.toString());
				localStorage.setItem('username', response.username);
				localStorage.setItem('expiry_time', (new Date().getTime() + 15 * 60 * 1000).toString());

				// add event emitter on login and logout to add or remove image in real time

				this.setSession(response);
				this.profileImgUrl.next(response.profileImg);
				this.loginSuccess.next(true);
			}
		);
			// .map(
			// 	response => response.json()
			// );
	}

	private setSession(authResult) {
		// localStorage.setItem('id_token', authResult.token); // do not do it now bcz we are using cookie based authentication
	}

	public isLoggedIn() {
		return localStorage.getItem('imgUrl') ? true : false;
	}

}
