import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SnackbarService} from 'ngx-snackbar';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {UserType} from '../models/user-type';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  focus: boolean;
  focus1: boolean;
  focus2: boolean;
  submitted: boolean;

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private snackbarService: SnackbarService,
              private userService: UserService,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      privacyPolicy: new FormControl(false, [Validators.pattern('true')])
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  registerUser() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    const newUser: User = this.signupForm.value;
    newUser.type = UserType.NORMAL;
    this.userService.addUser(newUser).subscribe(
      user => {

      },
      error => {
        // this.modalService.open();
        this.snackbarService.add({
          msg: 'Unable to register user: ' + newUser.name,
          action: {
            text: 'Dismiss!'
          }
        });
      },
      () => {
        this.snackbarService.add({
          msg: 'Registered user: ' + newUser.name,
          timeout: 5000,
          action: {
            text: 'Dismiss!'
          }
        });
        this.router.navigate(['/user-profile']);
      });
  }
}
