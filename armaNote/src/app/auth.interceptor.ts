import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const idToken = localStorage.getItem("id_token");

		// check: we can also add expiry time in localstorage. That time if its passed, we can make another request here for authentication first
		// and then if authenticated, we can send the current request
		const expiryTime = localStorage.getItem("expiry_time");
		console.log("came in intercepter with currenttime:  " + new Date().getTime() + " and expiry time as " + expiryTime + " so current - expiry is: " + (new Date().getTime() - parseInt(expiryTime)));

		let cloned: HttpRequest<any>;
		if (parseInt(expiryTime) <= new Date().getTime()
				&& req.url !== "http://localhost:6060/token/generate-token"
				&& req.url !== "http://localhost:6060/logmeout") {
			console.log("about to refresh token");
			cloned = req.clone({
				headers: req.headers.set("refresh_token", "true"),
				withCredentials: true,
			});
			// 15 minute is not jwt expiry time, we are just doing it to get the latest one. From server side, jwt is expired after 5 hours
			// localStorage.setItem("expiry_time", (parseInt(expiryTime) + 15 * 60 * 1000).toString()); // not correct way: just temporary bcz actually after response coming from server if token is refreshed, we should do this.
			// But we don't right now, how to handle all the response coming from server at one place to do so. (may be that can also be done with some intercepter kind of stuff)
			// Another way can be that server sets expiration directly in cookie at we get from there but since cookies here are not accesible by js code, we are unable to do that.

		} else {
			cloned = req.clone({
				withCredentials: true, // it means we are requesting data with credentials from server (will add "set-credentials=true" in the request)
			});
		}

		console.log("Request after cloning: ", cloned);

		return next.handle(cloned);
	}

}
