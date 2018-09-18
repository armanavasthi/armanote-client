import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

	constructor(private cookieService: CookieService, private httpClient: HttpClient) { }

	ngOnInit() {
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
		// Note: an httponly cookie can't be accessed by the js code hence it cannot be removed from the client side. So we will make a call to
		// remove it with the help of backend code
		this.httpClient.post("http://localhost:6060/logmeout", "").map(
			response => response
		).subscribe(
			response => {
				console.log("Logged out   ", response);
			}
		);
	}
}
