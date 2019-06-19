import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../models/user';
import {catchError, map} from 'rxjs/operators';
import {UserPage} from '../models/user-page';


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
          return response;
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

  editUser(toEdit: User): Observable<User> {
    return this.http.put<User>(this.urlId + toEdit.userId, toEdit);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
