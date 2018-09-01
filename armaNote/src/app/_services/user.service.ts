import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

	baseUrl = '';
	constructor(private http: HttpClient, private platformLocation: PlatformLocation) {
		this.baseUrl = (platformLocation as any).location.origin;
		console.log(this.baseUrl);
	}

	getUsers() {
		return this.http.get(this.baseUrl + '/webservice/user/').map(
			response => response
		);
	}



}
