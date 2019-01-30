import { Component, OnInit, ErrorHandler } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { CustomErrorHandler } from '../custom-error-handler';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

	loggedUser: String;
	userRoles: String[];

	constructor( /*private cookieService: CookieService, */
				private httpClient: HttpClient,
				private authService: AuthService,
				private errorHandler: ErrorHandler) {
		this.authService.profileInfo.subscribe(
			info => {
				if (info === null) {
					this.loggedUser = "";
					this.userRoles = [""];
				} else {
					this.loggedUser = info.fullName;
					this.userRoles = info.roles;
				}
			}
		);

		// very important: below if I use this.errorHandler.accessDenied then works fine on browser but typescript gives error.
		// As it doesn't understand the useClass behaviour and says that ErrorHandler class doesn't have this property.
		// So i used as brackets as ts doesn't bother about it.
		this.errorHandler['accessDenied'].subscribe(
			value => {
				if (value === true) {
					this.authService.profileInfo.next(null);
					this.loggedUser = "";
					this.userRoles = null;
				}
			}
		);
	}

	ngOnInit() {
		this.loggedUser = localStorage.getItem('fullname');
		this.userRoles = Object.values(JSON.parse(localStorage.getItem('roles')));
	}

	logMeOut() {
		// hit the server first to add jwt in black list
		// then :
		localStorage.setItem('id_token', '');
		localStorage.setItem('fullname', '');
		localStorage.setItem('imgUrl', '');
		localStorage.setItem('email', '');
		// redirect to home page if not there.

		// For Cookie based authentication:
		// this.cookieService.delete('Authorization')
		// Note: an httponly cookie can't be accessed by the js code hence it cannot be removed from the client side.
		// So we will make a call to remove it with the help of backend code
		this.httpClient.post("http://localhost:6060/logmeout", "").map(
			response => response
		).subscribe(
			response => {
				this.authService.profileInfo.next(null);
				this.loggedUser = "";
				this.userRoles = null;
				localStorage.clear();
			}
		);
	}
}
