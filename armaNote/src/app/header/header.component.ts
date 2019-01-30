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
export class HeaderComponent implements OnInit {

	profileImgUrl;
	isLoggedIn: boolean;
	isAdminLoggedIn: boolean;

	constructor(private authService: AuthService, private httpClient: HttpClient, private router: Router) {
		this.profileImgUrl = localStorage.getItem('imgUrl') ? localStorage.getItem('imgUrl') : '';

		this.authService.profileInfo.subscribe(
			info => {
				this.profileImgUrl = info === null ? "" : info.profileImg;
				this.isLoggedIn = info === null ? false : true ;
				this.isAdminLoggedIn = localStorage.getItem('roles') ? localStorage.getItem('roles').includes('ADMIN') : false;
			}
		);
	}

	ngOnInit() {
		this.isLoggedIn = this.authService.isLoggedIn();
		this.isAdminLoggedIn = localStorage.getItem('roles') ? localStorage.getItem('roles').includes('ADMIN') : false;
	}

	goToProfile() {
		const url = GlobalConstants.API_ENDPOINT + "user/" + localStorage.getItem('userId');
		this.httpClient.get(url).map(
			response => response
		).subscribe(
			response => {
				this.router.navigateByUrl('profile');
			}
		);
	}
}
