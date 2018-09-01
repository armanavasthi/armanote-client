import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../_services/user.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	providers: [UserService]
})
export class HomeComponent implements OnInit {

	constructor(private userService: UserService, public sanitizer: DomSanitizer) {}

	inputUrl = '';
	iframeUrl = '#';
	showIFrame = false;

	getAllUsers() {
		console.log(this.userService);
		this.userService.getUsers().subscribe(
			response => {
				console.log(response);
			}
		);
	}

	ngOnInit() {
		console.log(this.userService);
		this.userService.getUsers().subscribe(
			response => {
				console.log(response);
			}
		);
	}

	checkFrameUrl() {
		console.log('event  ==>  ', this.inputUrl);
		/*
		$('#input-url').keypress(function(e){
			//var urlRegex = "/^$/";
			var fedUrl = $('#input-url').val();
			if (e.which == 13) {
			$('#urlButton').attr('href', fedUrl);
			$('#urlButton')[0].click();
			// first match the url regex if failed => return
			}
		})
		*/
		this.iframeUrl = this.inputUrl;
		this.showIFrame = true;

	}

}
