import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISchedule } from '../interfaces/schedule';
import { IEmployee } from '../interfaces/employee';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private scheduleUrl = 'http://localhost:8080/api/agenda';  // URL to web api
  private freeScheduleUrl = 'http://localhost:8080/api/agenda/libres';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  sendSchedule(schedule_date: Date, employee: IEmployee, nro: number) {
    // Formatea la fecha como una cadena en el formato esperado por el backend
    const formattedDate = formatDate(schedule_date, 'yyyy-MM-ddTHH:mm:ss.SSSXXX', 'en-US');
    console.log(formattedDate);
    return this.http.put(
      `${this.scheduleUrl}/${formattedDate}/${employee.ci}/${nro}`,
      {},  // Puedes enviar un cuerpo vacío o ajustarlo según sea necesario
      this.httpOptions
    ).pipe(
      tap(_ => console.log('fetched schedules')),
      catchError(this.handleError<ISchedule[]>('sendSchedule', []))
    );
  }

  getFreeSchedules(): Observable<ISchedule[]> {
    return this.http.get<ISchedule[]>(this.freeScheduleUrl)
      .pipe(
        tap(_ => console.log('fetched schedules')),
        catchError(this.handleError<ISchedule[]>('getSchedules', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
