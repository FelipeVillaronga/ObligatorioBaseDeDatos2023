import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISchedule } from 'src/app/interfaces/schedule';
import { IEmployee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  constructor(
    private scheduleService: ScheduleService,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  freeSchedules: ISchedule[] = [];
  employee: IEmployee | undefined;

  ngOnInit(): void {
    this.scheduleService.getFreeSchedules().subscribe((response) => {
      this.freeSchedules = response;
      console.log(this.freeSchedules);
    });
  }

  scheduleSubmit(fch_agenda: any, ci: number, nro: number) {
    // Convertir fch_agenda a un objeto Date si no lo es
    const schedule_date = new Date(fch_agenda);

    this.employeeService.getEmployee(56223274).subscribe((response) => {
      this.employee = response;
      console.log(this.employee);
      if (this.employee != null) {
        console.log(schedule_date.getFullYear(), schedule_date.getMonth(), schedule_date.getDate());
        this.scheduleService
          .sendSchedule(
            schedule_date, // Convertir a cadena ISO para enviar al backend
            this.employee,
            nro
          )
          .subscribe((response) => {
            console.log(response);
            if (response) {
              console.log('sended');
              this.router.navigate(['/schedule']);
            } else {
              alert('Credenciales incorrectas');
            }
          });
      }
    });
  }
}
