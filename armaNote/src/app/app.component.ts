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

	constructor(private userService: UserService) {
		if (localStorage.getItem('current_time') === null || localStorage.getItem('current_time') === undefined ||
					parseInt(localStorage.getItem('current_time')) + 60 * 60 * 1000 < new Date().getTime()) {
			if (localStorage.getItem("imgUrl")) {
				this.userService.isLoggedIn()
				.subscribe(
					response => {
						if (!response) {
							localStorage.clear(); // not even required to subscribe or clear localstorage bcz 401 will come which is handled globally
						}
					}
				);
			}
		} else if (localStorage.getItem("imgUrl")) {
			localStorage.setItem('current_time', (new Date().getTime()).toString());
		}
	}

	ngOnInit() {
		const expiryTime = localStorage.getItem("expiry_time");
	}

}
