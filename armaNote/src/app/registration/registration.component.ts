import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../_models/role';
import { RoleService } from '../_services/role.service';
import { UserService } from '../_services/user.service';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css'],
	providers: [UserService, RoleService]
})
export class RegistrationComponent implements OnInit {

	roles: Role[];
	selectedRoles: Role[];
	user: User;
	saveMessage: String;
	disableButton = true;

	constructor(private authService: AuthService, private router: Router,
		private http: HttpClient, private userService: UserService,
		private roleService: RoleService) {
	}

	registration = new FormGroup({
		firstName: new FormControl('', Validators.required),
		lastName: new FormControl('', Validators.required),
		// tslint:disable-next-line:quotemark
		email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])),
		username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
		password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])),
		roles: new FormGroup({ })
	});

	get firstName() { return this.registration.get('firstName'); }
	get lastName() { return this.registration.get('lastName'); }
	get email() { return this.registration.get('email'); }
	get username() { return this.registration.get('username'); }
	get password() { return this.registration.get('password'); }

	ngOnInit() {
		if (localStorage.getItem("roles") && localStorage.getItem("roles").includes("ADMIN")) {
			// this.roles = ["ADMIN", "USER", "WEBSERVICE"]; // get from backend
			this.roleService.getRoles().subscribe(response => {
				this.roles = <Role[]>response;
			});
		} else {
			if (this.authService.isLoggedIn()) {
				this.router.navigateByUrl('');
			}
			this.roles = [];
			this.selectedRoles = [new Role({"id": 2 , "role": "USER"})];
		}
		this.selectedRoles = [];
	}

	formChange() {
		if (this.registration.status === "VALID") {
			this.disableButton = false;
		}
	}

	registerDetails() {
		this.disableButton = true;
		// Current approach of adding Role is not good, bcz we are not completely making use of reactive forms.
		// May be changed in future when got better knowledge about forms.
		this.selectedRoles.forEach(role => {
			(<FormGroup>this.registration.controls['roles']).addControl(role.role, new FormControl(true));
		});
		const c = this.registration.controls;
		this.user = new User({"firstName": c.firstName.value,
							"lastName": c.lastName.value, "username": c.username.value,
							"email": c.email.value, "password": c.password.value});
		this.user.roles = this.selectedRoles;
		const url = 'http://localhost:6060/api/user/registration';

		this.userService.postUser(this.user)
			.subscribe(
				response => {
					this.saveMessage = "User is created successfully!!!";
					setTimeout(() => {
						this.disableButton = false;
						this.saveMessage = "";
						this.router.navigateByUrl("login");
					}, 2000);
				}
			);
	}

	roleChange(roleVal) {
		if (!localStorage.getItem("roles") || (localStorage.getItem("roles") && !localStorage.getItem("roles").includes("ADMIN"))) {
			return;
		}

		if (roleVal.checked && !this.selectedRoles.includes(roleVal.value)) {
			const role = new Role({"id": roleVal.dataset.id, "role": roleVal.value}); // dataset is to get data attribute, its an HTML 5 property
			this.selectedRoles.push(role);
		} else if (!roleVal.checked) {
			let index = -1;
			this.selectedRoles.forEach((role, i) => {
				if (role.role === roleVal.value) {
					index = i;
				}
			});
			if (index !== -1) {
				this.selectedRoles.splice(index, 1);
			}
		}
	}
}
