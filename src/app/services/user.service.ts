import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {catchError, map, tap} from 'rxjs/operators';
import {UserPage} from '../models/user-page';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:5000/users';

  private urlPage = 'http://localhost:5000/users?page=';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
      .pipe(
        catchError(this.handleError('getClient', []))
      );
  }

  getPageUsers(page: number): Observable<UserPage> {
    let url = this.urlPage;
    url = url + page + '&size=2';
    return this.http.get<UserPage>(url)
      .pipe(
        map(response => {
          const data = response;
          console.log(data.content);
          return data;
        }));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
