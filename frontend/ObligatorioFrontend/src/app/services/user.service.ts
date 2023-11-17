import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { IUpdatePeriods } from '../interfaces/updatePeriods';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private cachedUser: IUser | null = null;

  private usersUrl = 'http://localhost:8080/api/funcionarios';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET users from the server
   * 
   * @returns 
   */
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<IUser[]>('getUsers', []))
      );
  }

  /** GET user by ci. Will 404 if ci not found 
   * 
   * Checks if the ci equals to the cachedUser (avoiding api request).
   * 
   * @param ci
  */
  getUser(ci: number): Observable<IUser> {
    if (this.cachedUser && this.cachedUser.ci === ci) {
      return of(this.cachedUser);
    } else {
      const url = `${this.usersUrl}/${ci}`;
      return this.http.get<IUser>(url).pipe(
        tap((user: IUser) => {
          this.cachedUser = user;
          console.log(`fetched user id=${ci}`);
        }),
        catchError(this.handleError<IUser>(`getUser id=${ci}`))
      );
    }
  }

  /** POST - add new employee to the server
   * 
   * @param ci 
   * @param name 
   * @param surname 
   * @param birth_date 
   * @param address 
   * @param phone_number 
   * @param email 
   * @param log_id 
   * @returns 
   */
  add(ci: number, name: string, surname: string, birth_date: Date, address: string, phone_number: string, email: string, username: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(this.usersUrl, { ci, name, surname, birth_date, address, phone_number, email, username, password }, this.httpOptions)
      .pipe(
        tap((newUser: IUser) => {
          console.log(`added user w/ id=${newUser.ci}`);
          alert('Usuario registrado con exito!');
          // llevar a 'lobby'
        }),
        catchError(this.handleError<IUser>('add'))
      );
  }

  /** PUT - changes the update periods. Only available for admin use (auth).
   * 
   * @param year 
   * @param semester 
   * @param startDate 
   * @param endDate 
   * @param auth - admin validation
   * @returns 
   */
  changeUpdatePeriods(year: string, semester: string, startDate: Date, endDate: Date, auth: string): Observable<IUpdatePeriods> {
    const url = 'http://localhost:8080/api/periodo_actualizacion';
    return this.http.put<IUpdatePeriods>(url, { year: year, semester: semester, startDate: startDate, endDate: endDate, auth: auth }, this.httpOptions)
      .pipe(
        tap(_ => console.log(`modified updatePeriods`)),
        catchError(this.handleError<IUpdatePeriods>('changeUpdatePeriods'))
      );
  }

  submitData(ci: number, name: string, surname: string, birth_date: Date): Observable<IUser> {
    return this.http.post<IUser>('api/carnet_salud', { ci, name, surname, birth_date }, this.httpOptions)
      .pipe(
        tap((newUser: IUser) => console.log(`added employee w/ id=${newUser.ci}`)),
        catchError(this.handleError<IUser>('add'))
      );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * 
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
