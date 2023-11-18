import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-periods',
  templateUrl: './update-periods.component.html',
  styleUrls: ['./update-periods.component.css']
})
export class UpdatePeriodsComponent {

  constructor(private location: Location, private userService: UserService) { }

  model = { year: '', semester: '', startDate: '', endDate: '', auth: '' };

  changeUpdatePeriods(): void {
    try {
      this.userService.changeUpdatePeriods(this.model.year, this.model.semester, new Date(this.model.startDate), new Date(this.model.endDate), this.model.auth);
      this.model = { year: '', semester: '', startDate: '', endDate: '', auth: '' };
      this.goBack();
    } catch (error) {
      alert('¡Autenticacion invalida! Debe ser administrador para realizar esta acción.');
    }
  }
  goBack(): void {
    this.location.back();
  }
}
