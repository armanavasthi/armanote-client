import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [UserService, AuthService]
})
export class AppComponent implements OnInit {
	title = 'app';

	constructor() {
		if (parseInt(localStorage.getItem('current_time')) + 60 * 60 * 1000 < new Date().getTime()) {
			// make a blank call to backend rather than clearing localstorage
			localStorage.clear();
		} else if (localStorage.getItem("imgUrl")) {
			localStorage.setItem('current_time', (new Date().getTime()).toString());
		}
	}

	ngOnInit() {
		const expiryTime = localStorage.getItem("expiry_time");
	}

}
