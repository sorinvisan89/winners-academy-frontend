import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }


  public logIn(user: User) {
  }

  logOut() {

  }
}
