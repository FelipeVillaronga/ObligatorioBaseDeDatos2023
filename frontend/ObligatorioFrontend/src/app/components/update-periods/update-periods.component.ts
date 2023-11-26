import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { catchError } from 'rxjs/operators'; // Import 'catchError' from 'rxjs/operators'

@Component({
  selector: 'app-update-periods',
  templateUrl: './update-periods.component.html',
  styleUrls: ['./update-periods.component.css']
})
export class UpdatePeriodsComponent {

  constructor(private location: Location, private userService: UserService) { }

  model = { year: '', semester: '', startDate: '', endDate: '', logId: '', password: '' };

  changeUpdatePeriods(): void {
    try {
      this.userService.changeUpdatePeriods(this.model.year, this.model.semester, new Date(this.model.startDate), new Date(this.model.endDate), this.model.logId, this.model.password)
        .pipe(
          catchError((error) => {
            console.error(error);
            alert('Ocurrió un error al modificar el período de actualización. Por favor, intenta nuevamente.');
            throw error;
          })
        )
        .subscribe({
          next: (res: boolean) => {
            console.log(res);
            if (res) { alert('¡Período de actualización modificado!'); }
            this.model = { year: '', semester: '', startDate: '', endDate: '', logId: '', password: '' };
            this.goBack();
          },
          error: (error) => {
            console.error(error);
            alert('Ocurrió un error al modificar el período de actualización. Por favor, intente nuevamente.');
          }
        });
    } catch (error) {
      alert('¡Autenticación inválida! Debe ser administrador para realizar esta acción.');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
