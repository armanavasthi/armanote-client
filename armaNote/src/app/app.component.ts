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
		if (localStorage.getItem("tabcount") === null) {
			localStorage.setItem("tabcount", "1");
		} else {
			const newCount = parseInt(localStorage.getItem("tabcount")) + 1;
			localStorage.setItem("tabcount", newCount.toString());
		}
	}

	// This is to logout the user if he closes all the tabs
	// May not be very useful though because we already handle time based jwt token expiration so if you do not want to logout on tabs closing, you can remove it from here
	@HostListener("window:beforeunload", ["$event"])
	clearLocalStorage(event) {
		localStorage.setItem('unloaded at', new Date().getTime().toString());
		const newCount = parseInt(localStorage.getItem("tabcount")) - 1;
		localStorage.setItem("tabcount", newCount.toString());
		if (newCount === 0) {
			localStorage.clear(); // would be better if we also hit the logout api here.
		}
	}
}
