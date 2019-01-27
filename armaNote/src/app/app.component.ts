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

	ngOnInit() {
		/*
		if (localStorage.getItem("tabcount") === null) {
			localStorage.setItem("tabcount", "1");
		} else {
			const newCount = parseInt(localStorage.getItem("tabcount")) + 1;
			localStorage.setItem("tabcount", newCount.toString());
		}
		*/
		const expiryTime = localStorage.getItem("expiry_time");

		/*
			* currently expiry ime is server: 5 Hours
			* in JS: 15 Minutes, after that we refresh the token
			* by the below code, if 75 minutes of inactivity i.e. no server interaction then logout from frontend
			* so the jwt code will though be active but still we force user to log in again.
		*/
		// this feature is yet to be tested.
		if (10 * parseInt(expiryTime) <= new Date().getTime()) {
			localStorage.clear();
		}

	}

	// This is to logout the user if he closes all the tabs
	// May not be very useful though because we already handle time based jwt token expiration so if you do not want to
	// logout on tabs closing, you can remove it from here
	/*
	@HostListener("window:beforeunload", ["$event"])
	clearLocalStorage(event) {
		localStorage.setItem('unloaded at', new Date().getTime().toString());
		const newCount = parseInt(localStorage.getItem("tabcount")) - 1;
		localStorage.setItem("tabcount", newCount.toString());
		if (newCount === 0) {
			localStorage.clear(); // would be better if we also hit the logout api here.
		}
	}
	*/
}
