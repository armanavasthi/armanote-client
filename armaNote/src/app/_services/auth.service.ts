import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class AuthService {

	baseUrl: 'http://localhost:6060/';

	constructor(private http: HttpClient) {
	}

	attemptAuth(username: string, password: string) {
		const credentials = {'email': username, 'password': password};
		localStorage.setItem('id_token', '');
		return this.http.post('http://localhost:6060/token/generate-token', credentials)
		.map(
			response => response
		).subscribe(
			response => {
				this.setSession(response);
			}
		);
			// .shareReplay() // share replay is an operator to prevent the receiver of this Observable from accidentally triggering multiple POST requests due to multiple subscriptions.
			// .map(
			// 	response => response.json()
			// );
	}

	private setSession(authResult) {
		console.log('in set session', authResult);
		localStorage.setItem('id_token', authResult.token);
		// localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
	}

}
