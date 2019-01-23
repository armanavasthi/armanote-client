import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../global-constants';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
	// providers: [AuthService]
})
export class HeaderComponent {

	profileImgUrl;

	constructor(private authService: AuthService, private httpClient: HttpClient, private router: Router) {
		this.profileImgUrl = localStorage.getItem('imgUrl') ? localStorage.getItem('imgUrl') : '';
		this.authService.profileImgUrl.subscribe(
		// this.authService.profileImgUrl.subscribe( // this is also fine if profileImgUrl is not private in auth
			text => {
				this.profileImgUrl = text;
		});
	}

	// localStorage.getItem('imgUrl');

	goToProfile() {
		const url = GlobalConstants.API_ENDPOINT + "user/" + localStorage.getItem('userId');
		console.log('abcd:  ', url);
		this.httpClient.get(url).map(
			response => response
		).subscribe(
			response => {
				console.log("Profile Ressponse ", response);
				// redirect to profile component
				this.router.navigateByUrl('profile');
			}
		);
	}
}
