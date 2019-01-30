import { Injectable } from "@angular/core";
import { User } from "../_models/user";
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { GlobalConstants } from "../global-constants";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RoleService {
	constructor(private http: HttpClient) {}

	getRoles() {
		const url = "http://localhost:6060/api/role/";
		return this.http.get(url).map( response => response);
	}
}
