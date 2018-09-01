import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	logMeOut() {
		// hit the server first to add jwt in black list
		// then :
		localStorage.setItem('id_token', '');
		// redirect to home page if not there.
	}



}
