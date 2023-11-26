import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISchedule } from 'src/app/interfaces/schedule';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
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
    private userService: UserService
  ) { }

  freeSchedules: ISchedule[] = [];
  user: IUser | undefined;

  ngOnInit(): void {

    this.userService.getMostRecentPeriod().subscribe((response) => {
      if(response == false){
        alert("PERIODO FINALIZADO")
        this.router.navigate(['/index']);
      }
    });


    this.scheduleService.getFreeSchedules().subscribe((response) => {
      this.freeSchedules = response;
      console.log(this.freeSchedules);
    });
  }

  scheduleSubmit(fch_agenda: any, ci: number, nro: number) {
    // Convertir fch_agenda a un objeto Date si no lo es
    const schedule_date = new Date(fch_agenda);

    this.userService.getUser(56223274).subscribe((response) => {
      this.user = response;
      console.log(this.user);
      if (this.user != null) {
        console.log(schedule_date);
        this.scheduleService
          .sendSchedule(
            schedule_date, // Convertir a cadena ISO para enviar al backend
            this.user,
            nro
          )
          .subscribe((response) => {
            console.log(response);
            if (response) {
              console.log('sended');
              alert('Cita agendada');
              this.router.navigate(['/index']);
            } else {
              alert('Credenciales incorrectas');
            }
          });
      }
    });
  }
}
