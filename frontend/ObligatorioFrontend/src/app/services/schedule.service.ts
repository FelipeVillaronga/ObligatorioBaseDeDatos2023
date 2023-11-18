import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISchedule } from '../interfaces/schedule';
import { IUser } from '../interfaces/user';

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

  sendSchedule(schedule_date: Date, employee: IUser, nro: number) {
    
    //const formattedDate = formatDate(schedule_date, 'yyyy-MM-ddTHH:mm:ss.SSSZ', 'en-US');
      //console.log(formattedDate);
    return this.http.put(
      `${this.scheduleUrl}/${schedule_date.toISOString()}/${employee.ci}/${nro}`,
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
