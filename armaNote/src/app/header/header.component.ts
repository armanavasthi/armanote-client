import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
	// providers: [AuthService]
})
export class HeaderComponent {

	profileImgUrl;

	constructor(private authService: AuthService) {
		this.profileImgUrl = localStorage.getItem('imgUrl') ? localStorage.getItem('imgUrl') : '';
		this.authService.changeEmitted$.subscribe(
			text => {
				console.log('hhhhhhh:  	', text);
				this.profileImgUrl = text;
		});
	}

	// localStorage.getItem('imgUrl');
}
