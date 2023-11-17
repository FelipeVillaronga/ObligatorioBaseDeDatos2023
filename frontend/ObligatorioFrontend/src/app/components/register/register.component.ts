import { Component } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService: UserService) { }

  model = { ci: '', name: '', surname: '', birth_date: '', address: '', email: '', phone_number: '', username: '', password: '' };

  async registerUser(): Promise<void> {
    try {
      let parsedCi: number = parseInt(this.model.ci);

      await this.userService.add(parsedCi, this.model.name, this.model.surname,
        new Date(this.model.birth_date), this.model.address, this.model.email, 
        this.model.phone_number,this.model.username, this.model.password);

      this.model = { ci: '', name: '', surname: '', birth_date: '', address: '', email: '', phone_number: '', username: '', password: '' };

    } catch (error) {
      alert('¡Cedula invalida!');
    }
  }
}
