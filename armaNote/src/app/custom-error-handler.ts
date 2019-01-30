import { Injectable, ErrorHandler } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Subject } from "rxjs/Subject";
// import { AuthService } from "./_services/auth.service";

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

	// more about error handling on: https://medium.com/@aleixsuau/error-handling-angular-859d529fa53a

	accessDenied = new Subject<Boolean>();

	constructor(/* private authService: AuthService */) {
	}

	// handleError(error: Error | HttpErrorResponse) {
	handleError(error: any) { // when I use type as Error, it says, error doesn't have type 'status'. (It's an Compile time issue so no problem at run time)
	// the reason may be that at compile time, error is empty as it didn't get any response.
		if (error.status === 401) {
			console.error("clearing local storage in CEH");
			localStorage.clear();

			// Actually I directly wanted to emit the profile info from here but couldn't do bcz of : https://stackoverflow.com/a/35758310/7456022 (the answer is not correct:Check my comment in this answer)
			// this.authService.profileInfo.next(null);

			// So below is the workaround
			this.accessDenied.next(true);
		}
	}
}
