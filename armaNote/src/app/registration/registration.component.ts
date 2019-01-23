import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router) { }


	registration = new FormGroup({
		firstName: new FormControl('', Validators.required),
		lastName: new FormControl('', Validators.required),
		// tslint:disable-next-line:quotemark
		email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])),
		username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
		password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)]))
	});

	get firstName() { return this.registration.get('firstName'); }
	get lastName() { return this.registration.get('lastName'); }
	get email() { return this.registration.get('email'); }
	get username() { return this.registration.get('username'); }
	get password() { return this.registration.get('password'); }

	ngOnInit() {
		if (this.authService.isLoggedIn()) {
			this.router.navigateByUrl('');
		}
	}

	registerDetails() {
		console.log(this.registration);
	}

	theChange() {
		// console.log('firstname', this.firstName.value);
		// console.log('email', this.email.errors.minlength);
		// console.log('username', this.username.errors.minlength);
		// console.log('password', this.password.errors.minlength);
	}
}
