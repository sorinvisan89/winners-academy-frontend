import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {SignupComponent} from './signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';
import {DailyComponent} from './daily/daily.component';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user/user.component';
import {PaymentComponent} from './payment/payment.component';
import {AuthGuard} from './services/auth-guard.service';
import {Role} from './models/role';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'user-profile', component: ProfileComponent},
  {path: 'register', component: SignupComponent},
  {path: 'landing', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'daily', component: DailyComponent},
  {path: 'admin', component: AdminComponent},
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.ADMIN]
    }
  },
  {path: 'payment', component: PaymentComponent},
  {path: 'unathorized', component: UnauthorizedComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [],
})
export class AppRoutingModule {
}
