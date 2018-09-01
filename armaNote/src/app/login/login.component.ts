import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { PlatformLocation } from '@angular/common';
import { AuthService } from '../_services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [AuthService]
})
export class LoginComponent implements OnInit {

	constructor(location: Location, platformLocation: PlatformLocation, private authService: AuthService) {
		// console.log((platformLocation as any).location);
		// console.log((platformLocation as any).location.href);
		// console.log((platformLocation as any).location.origin);
	}
	login = new FormGroup({
		// tslint:disable-next-line:quotemark
		email: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
		password: new FormControl('', [Validators.required, Validators.maxLength(8)])
	});

	get email() { return this.login.get('email'); }
	get password() { return this.login.get('password'); }

	ngOnInit() {
	}

	loginSubmit() {
		this.authService.attemptAuth(this.email.value, this.password.value);
	}

}
