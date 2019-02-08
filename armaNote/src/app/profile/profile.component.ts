import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../global-constants';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../_models/loginuser';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	profileInfo: LoginUser;

	constructor(private authService: AuthService, private httpClient: HttpClient) { }

	ngOnInit() {
		const url = GlobalConstants.API_ENDPOINT + "user/" + localStorage.getItem('userId');
		this.httpClient.get(url).map(
			response => response
		).subscribe(
			(response: LoginUser) => {
				this.profileInfo = response;
			}
		);
	}

}
