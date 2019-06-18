import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../models/user';
import {catchError, map, tap} from 'rxjs/operators';
import {UserPage} from '../models/user-page';
import {Ticket} from '../shared/ticket';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlAll = 'http://localhost:5000/users';

  private urlId = 'http://localhost:5000/user/';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlAll)
      .pipe(
        catchError(this.handleError('getAllUsers', []))
      );
  }

  getPageUsers(page: number): Observable<UserPage> {
    const httpParams = new HttpParams()
      .set('page', page.toString())
      .set('size', '6');
    return this.http.get<UserPage>(this.urlAll, {
      params: httpParams,
      responseType: 'json'
    })
      .pipe(
        map(response => {
          const data = response;
          console.log(data.content);
          return data;
        }));
  }

  deleteUser(id: bigint): Observable<boolean> {
    return this.http.delete<boolean>(this.urlId + id)
      .pipe(
        catchError(this.handleError('deleteUser', false))
      );
  }

  addUser(toAdd: User): Observable<User> {
    return this.http.post<User>(this.urlId, toAdd);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
