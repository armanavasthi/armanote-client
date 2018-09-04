import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const idToken = localStorage.getItem("id_token");

		if (idToken) {
			const headers = new Headers({"Authorization": "Bearer " + idToken});
			const cloned = req.clone({
				headers: req.headers.set("Authorization",
					"Bearer " + idToken),
				withCredentials: true
			});

			console.log("my request:::::: ", cloned);

			return next.handle(cloned);
		} else {
			const cloned = req.clone({
				withCredentials: true
			});
			console.log("my request1:::::: ", cloned);
			return next.handle(cloned);
		}
	}

}
