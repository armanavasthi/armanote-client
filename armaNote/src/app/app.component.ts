import { Component } from '@angular/core';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [UserService, AuthService]
})
export class AppComponent {
	title = 'app';
}
