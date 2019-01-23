import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { CustomErrorHandler } from './custom-error-handler';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		HomeComponent,
		RegistrationComponent,
		LoginComponent,
		ProfileComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		HttpClientModule,
		RouterModule.forRoot([
			{ path: '', component: HomeComponent},
			{ path: 'registration', component: RegistrationComponent},
			{ path: 'login', component: LoginComponent},
			{ path: 'profile', component: ProfileComponent}
		])
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
		{
			provide: ErrorHandler,
			useClass: CustomErrorHandler
		},
		CookieService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
