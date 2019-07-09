import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {SignupComponent} from './signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';

import {HomeModule} from './home/home.module';
import {LoginComponent} from './login/login.component';
import {DailyComponent} from './daily/daily.component';
import {SectionsModule} from './sections/sections.module';
import {RestConsumerComponent} from './rest-consumer/rest-consumer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user/user.component';
import {PaymentComponent} from './payment/payment.component';
import {NgxBraintreeModule} from 'ngx-braintree';
import {NgxStripeModule} from 'ngx-stripe';
import {SnackbarModule, SnackbarService} from 'ngx-snackbar';
import {ConfirmModalComponent, ConfirmService, ConfirmState, ConfirmTemplateDirective} from './modals/confirm.service';
import {BasicAuthInterceptor} from './services/basic-auth.interceptor';
import {ErrorInterceptor} from './services/error.interceptor';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import {DatePipe} from '@angular/common';
import {DateFormatPipe} from './services/string-to-date.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    DailyComponent,
    RestConsumerComponent,
    AdminComponent,
    UserComponent,
    PaymentComponent,
    ConfirmModalComponent,
    ConfirmTemplateDirective,
    UnauthorizedComponent,
    DateFormatPipe
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    NgxStripeModule.forRoot('pk_test_QqRFoLWOlq5infUOTAWXBjei00AjZa4fT4'),
    HomeModule,
    SectionsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SnackbarModule.forRoot()
  ],
  providers: [NgbActiveModal,
    SnackbarService,
    ConfirmService,
    ConfirmState,
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
