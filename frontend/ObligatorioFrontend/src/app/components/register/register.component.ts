import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { pipe, catchError } from 'rxjs';
import { IUser } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService: UserService, private router: Router) { }

  model = { ci: '', name: '', surname: '', birth_date: '', address: '', email: '', phone_number: '', username: '', password: '' };

  async registerUser(): Promise<void> {
    try {
      let parsedCi: number = parseInt(this.model.ci);
      let parsedLogId: number = parseInt(this.model.username);
      this.userService.add(parsedCi, this.model.name, this.model.surname, new Date(this.model.birth_date), this.model.address, this.model.phone_number, this.model.email, parsedLogId, this.model.password)
        .pipe(
          catchError((error) => {
            console.error(error);
            alert('Ocurrió un error al registrar el usuario. Probablemente ese ID esté en uso. Por favor, intenta nuevamente.');
            throw error;
          })
        )
        .subscribe({
          next: (res: boolean) => {
            console.log(res);
            alert('Usuario registrado con éxito!');
            this.router.navigate([`/login`]);
          },
          error: (error) => {
            console.error(error);
            alert('Ocurrió un error al registrar el usuario. Probablemente ese ID esté en uso. Por favor, intenta nuevamente.');
          }
        });
    } catch (error) {
      alert('Cedula invalida');
    }
  }
}
