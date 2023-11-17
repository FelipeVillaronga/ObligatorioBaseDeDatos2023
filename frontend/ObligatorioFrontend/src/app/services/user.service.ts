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

  /** GET employees from the server
   * 
   * @returns 
   */
  getEmployees(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl)
      .pipe(
        tap(_ => console.log('fetched employees')),
        catchError(this.handleError<IUser[]>('getEmployees', []))
      );
  }

  /** GET employee by ci. Will 404 if ci not found 
   * 
   * Checks if the ci equals to the cachedUser (avoiding api request).
   * 
   * @param ci
  */
  getEmployee(ci: number): Observable<IUser> {
    if (this.cachedUser && this.cachedUser.ci === ci) {
      return of(this.cachedUser);
    } else {
      const url = `${this.usersUrl}/${ci}`;
      return this.http.get<IUser>(url).pipe(
        tap((employee: IUser) => {
          this.cachedUser = employee;
          console.log(`fetched employee id=${ci}`);
        }),
        catchError(this.handleError<IUser>(`getEmployee id=${ci}`))
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
  add(ci: number, name: string, surname: string, birth_date: Date, address: string, phone_number: string, email: string): Observable<IUser> {
    return this.http.post<IUser>(this.usersUrl, { ci, name, surname, birth_date, address, phone_number, email }, this.httpOptions)
      .pipe(
        tap((newUser: IUser) => console.log(`added employee w/ id=${newUser.ci}`)),
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

  submitData(ci: number, name: string, surname: string, birth_date: Date): Observable<IUser>{
    return this.http.post<IUser>('api/carnet_salud', { ci, name, surname, birth_date}, this.httpOptions)
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
