import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { PlatformLocation } from '@angular/common';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
	// providers: [AuthService]
})
export class LoginComponent implements OnInit {

	popMessage: String;
	loginError: boolean = false;

	constructor(/* location: Location, platformLocation: PlatformLocation, */
				private authService: AuthService, private router: Router,
				private errorHandler: ErrorHandler) {
		// console.log((platformLocation as any).location);
		// console.log((platformLocation as any).location.href);
		// console.log((platformLocation as any).location.origin);
		this.errorHandler['accessDenied'].subscribe(
			value => {
				this.popMessage = "Username or Password is not correct";
				this.loginError = true;
			}
		);
	}
	login = new FormGroup({
		// tslint:disable-next-line:quotemark
		email: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
		password: new FormControl('', [Validators.required, Validators.maxLength(8)])
	});

	get email() { return this.login.get('email'); }
	get password() { return this.login.get('password'); }

	ngOnInit() {
		if (this.authService.isLoggedIn()) {
			this.router.navigateByUrl('');
		}
	}

	loginSubmit() {
		this.authService.attemptAuth(this.email.value, this.password.value);
		this.authService.loginSuccess.subscribe(
			value => {
				if (value) {
					// this.router.navigate(['<aliasInRouteConfig>']); // commented bcz we haven't given any alias to our routes as of now
					this.router.navigateByUrl('');
					// also show the error message in the template
				}
			}
		);
	}

	inputFocus() {
		this.popMessage = "";
		this.loginError = false;
	}

}
