import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';
// import { Http } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GlobalConstants } from '../global-constants';
import { User } from '../_models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

	baseUrl = '';
	headers = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};
	constructor(private http: HttpClient, private platformLocation: PlatformLocation) {
		this.baseUrl = (platformLocation as any).location.origin;
	}

	getUsers() {
		return this.http.get(GlobalConstants.API_ENDPOINT + 'user/').map(
			response => response
		);
	}

	postUser(user: User) {
		const url = GlobalConstants.API_ENDPOINT + "user/registration";
		return this.http.post(url, JSON.stringify(user), this.headers)
			.map( response => response )
			.catch((error: HttpErrorResponse) => {
				console.error("Error in user service post response::" + error);
				return Observable.throw(error);
			});
	}

}
