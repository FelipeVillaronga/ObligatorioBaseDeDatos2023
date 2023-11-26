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

  model = { ci: '', name: '', surname: '', birth_date: '', address: '', email: '', phone_number: '', password: '' };

  async registerUser(): Promise<void> {
    try {
      let parsedCi: number = parseInt(this.model.ci);
      this.userService.add(parsedCi, this.model.name, this.model.surname, new Date(this.model.birth_date), this.model.address, this.model.phone_number, this.model.email, this.model.password)
        .pipe(
          catchError((error) => {
            console.error(error);
            throw error;
          })
        )
        .subscribe({
          next: (res: IUser) => {
            console.log(res);
            this.router.navigate([`/login`]);
          },
          error: (error) => {
            console.error(error);
          }
        });
    } catch (error) {
      alert('Cedula invalida');
    }
  }
}
