import { Component } from '@angular/core';
import { UserService } from './_services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [UserService]
})
export class AppComponent {
	title = 'app';
}
