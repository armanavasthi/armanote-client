import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/shareReplay';
import { Subject } from 'rxjs/Subject';
import { LoginUser } from '../_models/loginuser';

@Injectable()
export class AuthService {

	baseUrl: 'http://localhost:6060/';

	private profileImgUrl = new Subject<any>();
	changeEmitted$ = this.profileImgUrl.asObservable();

	constructor(private http: HttpClient) {
	}

	attemptAuth(username: string, password: string) {
		const credentials = {'email': username, 'password': password};
		localStorage.setItem('id_token', '');
		return this.http.post('http://localhost:6060/token/generate-token', credentials)
		.shareReplay() // share replay is an operator to prevent the receiver of this Observable from accidentally triggering multiple POST requests due to multiple subscriptions.
		.map(
			response => response
		).subscribe(
			(response: LoginUser) => {
				console.log("The token is:   ", response);
				localStorage.setItem('fullname', response.fullName);
				// for now image is hardcoded in backend as we don't have aws s3 account working
				localStorage.setItem('imgUrl', response.profileImg);
				localStorage.setItem('email', response.email);

				// add event emitter on login and logout to add or remove image in real time

				this.setSession(response);
				this.profileImgUrl.next(response.profileImg);
			}
		);
			// .map(
			// 	response => response.json()
			// );
	}

	private setSession(authResult) {
		localStorage.setItem('id_token', authResult.token);
		// localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
	}

}
