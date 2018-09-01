import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const idToken = localStorage.getItem("id_token");
		console.log('id_token in interceptor', idToken);
		// console.log('id_token in interceptor1', localStorage.idToken);

		if (idToken) {
			const cloned = req.clone({
				headers: req.headers.set("Authorization",
					"Bearer " + idToken)
			});

			return next.handle(cloned);
		} else {
			return next.handle(req);
		}
	}

}
