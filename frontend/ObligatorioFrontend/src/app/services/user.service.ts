import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';

import { Observable, of, catchError, tap, throwError, map, mergeMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILogin } from '../interfaces/login';
import { LoginService } from './login.service';
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
    const log = { logId: username, password: password } as ILogin;

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

  /** PUT - changes the update periods. Only available for admin use (login verification)
   * 
   * @param year 
   * @param semester 
   * @param startDate 
   * @param endDate 
   * @param logId 
   * @param password 
   * @returns 
   */
  changeUpdatePeriods(year: string, semester: string, startDate: Date, endDate: Date, logId: string, password: string): Observable<boolean> {
    try {
      const parsedLogId: number = parseInt(logId);
      return this.validateAdmin(parsedLogId, password).pipe(
        mergeMap((isValid: boolean) => {
          if (!isValid) {
            alert('Autenticación incorrecta. Verifique la contraseña que le fue enviada por la Universidad.');
            return of(false);
          }
          let anio = parseInt(year);
          const url = 'http://localhost:8080/api/periodo_actualizacion'; 
          let sem = 1
          if(semester == "Segundo Semestre"){
            sem = 2
          }
          console.log(anio, sem, startDate, endDate);
          return this.http.post<boolean>(`${url}`, { anio: anio, semestre: sem, fch_inicio: startDate,  fch_fin: endDate }, this.httpOptions).pipe(
            catchError(this.handleError<boolean>('changeUpdatePeriods'))
          );
        })
      );
    } catch (err) {
      return throwError(err);
    }
  }
  getMostRecentPeriod(): Observable<boolean> {
    const currentDate: Date = new Date();

    const url = 'http://localhost:8080/api/periodo_actualizacion';

    return this.http.get<any[]>(url).pipe(
        tap(_ => console.log('fetched update periods')),
        map((periods: any[]) => {
          console.log(periods);
            const closestFuturePeriod = periods.find((period: any) => {
                const startDate = new Date(period.fch_inicio);
                const endDate = new Date(period.fch_fin);

               
                if (parseInt(period.anio) >= currentDate.getFullYear() &&
                    currentDate >= startDate && currentDate <= endDate) {
                    return true;
                }

                return false;
            });

          
            return !!closestFuturePeriod;
        }),
        catchError(this.handleError<boolean>('getMostRecentPeriod'))
    );
}



  private validateAdmin(logId: number, password: string): Observable<boolean> {
    return this.loginService.sendLogin(logId, password).pipe(
      map((response) => !!response),
      catchError((error) => {
        console.error(error);
        return of(false);
      })
    );
  }

  /** SOS UN CRA FELIPE
   * 
   * @param ci 
   * @param name 
   * @param surname 
   * @param birth_date 
   * @param fileDetails 
   * @returns 
   */
  submitData(ci: number, name: string, surname: string, birth_date: Date, fileDetails: any): Observable<IUser> {
    return this.http.post<IUser>('api/carnet_salud', { ci, fecha_emision: new Date(), fecha_vencimiento: birth_date ,comprobante: fileDetails }, this.httpOptions)
      .pipe(
        tap((newUser: IUser) => console.log(`added employee w/ id=${newUser.ci}`)),
        catchError(this.handleError<IUser>('add'))
      );
  }

  getUserByLogId(logId: number): Observable<IUser> {
    const url = `${this.usersUrl}/id/${logId}`;

    return this.http.get<IUser>(url, this.httpOptions).pipe(
      tap(_ => console.log(`fetched user id=${logId}`)),
      catchError(this.handleError<IUser>(`getUser id=${logId}`))
    );
    
  }

  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      let errorMessage = 'An error occurred';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else if (error.status) {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      } else {
        errorMessage = `Error: ${error.message}`;
      }
      console.log(`${operation} failed: ${errorMessage}`);
      return throwError(errorMessage) as Observable<T>;
    };
  }
}
