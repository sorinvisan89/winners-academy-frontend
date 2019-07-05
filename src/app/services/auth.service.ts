import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }


  login(email: string, password: string) {

    const headers = new HttpHeaders(true ? {
      authorization: 'Basic ' + btoa(email + ':' + password)
    } : {});


    return this.http.get<any>(`http://localhost:5000/login/account`, {headers: headers})
      .pipe(map(user => {
        if (user) {
          user.authdata = window.btoa(email + ':' + password);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {

  }
}
