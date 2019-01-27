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
	roles: {[key: number]: string} = {};

	profileInfo = new Subject<LoginUser>();
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
		//
		// 		} else {
		// 			return Observable.throw(err);
		// 		}
		// 	})
		// )
		.subscribe(
			(response: LoginUser) => {
				localStorage.setItem('fullname', response.fullName);
				// for now image is hardcoded in backend as we don't have aws s3 account working
				localStorage.setItem('imgUrl', response.profileImg);
				localStorage.setItem('email', response.email);
				localStorage.setItem('userId', response.userId.toString());
				localStorage.setItem('username', response.username);
				localStorage.setItem('expiry_time', (new Date().getTime() + 15 * 60 * 1000).toString());
				let i = 0;
				console.log("hi", response.roles);
				response.roles.forEach(role => {
					this.roles[i] = role;
					i++;
				});
				localStorage.setItem('roles', JSON.stringify(this.roles));

				// this.setSession(response);
				this.loginSuccess.next(true);
				this.profileInfo.next(response);
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
