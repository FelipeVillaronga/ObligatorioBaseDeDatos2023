import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ISchedule } from 'src/app/interfaces/schedule';
import { ScheduleService } from 'src/app/services/schedule.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  constructor(private scheduleService: ScheduleService, private router: Router) { }
  freeSchedules: ISchedule[] = [];
  model = { schedule_date: new Date, ci: 0, nro: 0};
  ngOnInit(): void {
      this.scheduleService.getFreeSchedules().subscribe(
        (response) => {
          console.log(response);
          this.freeSchedules = response;
        }
      )
  }
  scheduleSubmit() {
    this.scheduleService.sendSchedule(this.model.schedule_date, 555, this.model.nro).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          console.log("sended");
          this.router.navigate(['/schedule']);
        } else {
          alert("Credenciales incorrectas");
        }
      }
    )
  }

}
