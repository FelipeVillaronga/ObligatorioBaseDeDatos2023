import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISchedule } from '../interfaces/schedule';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
  sendSchedule( schedule_date: Date,  ci:number, nro: number) {
    return this.http.put<ISchedule>(this.scheduleUrl, { schedule_date, ci, nro }, this.httpOptions)
    .pipe(
      tap(_ => console.log('sended')),
      catchError(this.handleError<ISchedule[]>('senSchedule', []))
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
