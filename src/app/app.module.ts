import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { DailyComponent } from './daily/daily.component';
import {SectionsModule} from './sections/sections.module';
import { RestConsumerComponent } from './rest-consumer/rest-consumer.component';
import {HttpClientModule} from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { PaymentComponent } from './payment/payment.component';
import {NgxBraintreeModule} from 'ngx-braintree';
import {NgxStripeModule} from 'ngx-stripe';

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
    PaymentComponent
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
    ReactiveFormsModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
