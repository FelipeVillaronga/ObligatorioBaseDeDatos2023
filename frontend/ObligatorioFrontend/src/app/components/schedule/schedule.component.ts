import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISchedule } from 'src/app/interfaces/schedule';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  constructor(
    private scheduleService: ScheduleService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private location : Location
  ) { }

  freeSchedules: ISchedule[] = [];
  user: IUser | undefined;
  ci: number = 1;
  logid: number = 1;
  

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


    this.route.params.subscribe(params => {
      const logid = params['id'];
      console.log(logid);
      this.userService.getUserByLogId(logid).subscribe((response) => {
        this.ci = response.ci;
        console.log(this.user);
      });
  });
}

  scheduleSubmit(fch_agenda: any,  nro: number) {
    // Convertir fch_agenda a un objeto Date si no lo es
    const schedule_date = new Date(fch_agenda);
    
    this.userService.getUser(this.ci).subscribe((response) => {
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

  goBack(): void {
    this.location.back();
  }
}
