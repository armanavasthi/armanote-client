import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../global-constants';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {

	profileImgUrl;

	constructor(private authService: AuthService, private httpClient: HttpClient, private router: Router) {
		this.profileImgUrl = localStorage.getItem('imgUrl') ? localStorage.getItem('imgUrl') : '';

		this.authService.profileInfo.subscribe(
			info => {
				this.profileImgUrl = info === null ? "" : info.profileImg;
			}
		);
	}

	goToProfile() {
		const url = GlobalConstants.API_ENDPOINT + "user/" + localStorage.getItem('userId');
		this.httpClient.get(url).map(
			response => response
		).subscribe(
			response => {
				// redirect to profile component
				this.router.navigateByUrl('profile');
			}
		);
	}
}
