import { Injectable } from '@angular/core';
import { IEmployee } from '../interfaces/employee';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private cachedEmployee: IEmployee | null = null;

  private employeesUrl = 'http://localhost:8080/api/funcionarios';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET employees from the server
   * 
   * @returns 
   */
  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.employeesUrl)
      .pipe(
        tap(_ => console.log('fetched employees')),
        catchError(this.handleError<IEmployee[]>('getEmployees', []))
      );
  }

  /** GET employee by ci. Will 404 if ci not found 
   * 
   * Checks if the ci equals to the cachedEmployee (avoiding api request).
   * 
   * @param ci
  */
  getEmployee(ci: number): Observable<IEmployee> {
    if (this.cachedEmployee && this.cachedEmployee.ci === ci) {
      return of(this.cachedEmployee);
    } else {
      const url = `${this.employeesUrl}/${ci}`;
      return this.http.get<IEmployee>(url).pipe(
        tap((employee: IEmployee) => {
          this.cachedEmployee = employee;
          console.log(`fetched employee id=${ci}`);
        }),
        catchError(this.handleError<IEmployee>(`getEmployee id=${ci}`))
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
  add(ci: number, name: string, surname: string, birth_date: Date, address: string, phone_number: string, email: string): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.employeesUrl, { ci, name, surname, birth_date, address, phone_number, email }, this.httpOptions)
    .pipe(
      tap((newEmployee: IEmployee) => console.log(`added employee w/ id=${newEmployee.ci}`)),
      catchError(this.handleError<IEmployee>('add'))
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
