import { Injectable, ErrorHandler } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

	// more about error handling on: https://medium.com/@aleixsuau/error-handling-angular-859d529fa53a

	constructor() {
	}

	// handleError(error: Error | HttpErrorResponse) {
	handleError(error: any) { // when I use type as Error, it says, error doesn't have type 'status'. (It's an Compile time issue so no problem at run time)
	// the reason may be that at compile time, error is empty as it didn't get any response.
		if (error.status = 401) {
			localStorage.clear();
		}
	}
}
