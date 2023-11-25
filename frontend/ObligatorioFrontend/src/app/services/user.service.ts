import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';

import { Observable, of, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUpdatePeriods } from '../interfaces/updatePeriods';
import { ILogin } from '../interfaces/login';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private cachedUser: IUser | null = null;

  private usersUrl = 'http://localhost:8080/api/funcionarios';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, public loginService: LoginService) { }

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
  add(ci: number, name: string, surname: string, birth_date: Date, address: string, phone_number: string, email: string, username: number, password: string): Observable<boolean> {
    const log= {logId: username, password: password} as ILogin;
    
    //this.loginService.addLogin(username, password).subscribe();
    
    return this.http.post<boolean>(this.usersUrl, { ci: ci, nombre: name, apellido: surname, fchNacimiento: birth_date, direccion: address, telefono: phone_number, email: email, login: log }, this.httpOptions)
      .pipe(
        tap((response) => {
          console.log(`added user w/ id=${response}`);
          alert('Usuario registrado con exito!');
          // llevar a 'lobby'
        }),
        catchError(this.handleError<boolean>('add'))
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
    const isValid= this.validateAdminAuth(auth);
    if(!isValid){
      alert('Autenticación incorrecta. Verifique la contraseña que le fue enviada por la Universidad.');
      return of();
    }
    const url = 'http://localhost:8080/api/periodo_actualizacion';
    return this.http.put<IUpdatePeriods>(url, { anio: year, semestre: semester, startDate: startDate, endDate: endDate}, this.httpOptions)
      .pipe(
        tap(_ => console.log(`modified updatePeriods`)),
        catchError(this.handleError<IUpdatePeriods>('changeUpdatePeriods'))
      );
  }

  validateAdminAuth(password: string): boolean{

    return false;
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
      // Log the error to a remote logging infrastructure
      // Example: Send error details to a remote server for tracking
      // RemoteLoggingService.logError(error);
  
      // Log error to the console
      console.error(error);
  
      // Better error handling - transform error for user consumption
      let errorMessage = 'An error occurred';
      if (error.error instanceof ErrorEvent) {
        // Client-side network error
        errorMessage = `Error: ${error.error.message}`;
      } else if (error.status) {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      } else {
        // Other error (backend or unexpected)
        errorMessage = `Error: ${error.message}`;
      }
  
      // TODO: You can also notify users or display error messages here.
  
      console.log(`${operation} failed: ${errorMessage}`);
  
      // Rethrow the error as a user-facing error and let the app continue
      return throwError(errorMessage) as Observable<T>;
    };
  }
}
