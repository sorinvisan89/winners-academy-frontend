import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  focus: boolean;
  focus1: boolean;
  submitted: boolean;
  loginForm: FormGroup;
  loading = false;
  error = '';


  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.loading = true;
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    this.authService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/daily']);
        },
        error => {
          this.error = 'Login failed!';
          this.loading = false;
        });
  }

}
