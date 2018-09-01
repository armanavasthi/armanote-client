import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

	constructor() { }


	registration = new FormGroup({
		firstName: new FormControl('', Validators.required),
		lastName: new FormControl('', Validators.required),
		// tslint:disable-next-line:quotemark
		email: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
		username: new FormControl('', Validators.minLength(4)),
		password: new FormControl('', [Validators.required, Validators.maxLength(8)])
	});

	get firstName() { return this.registration.get('firstName'); }
	get lastName() { return this.registration.get('lastName'); }
	get email() { return this.registration.get('email'); }
	get username() { return this.registration.get('username'); }
	get password() { return this.registration.get('password'); }

	ngOnInit() {
	}

	registerDetails() {
		console.log(this.registration);
	}
}
