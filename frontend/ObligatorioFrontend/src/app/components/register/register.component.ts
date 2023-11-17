import { Component} from '@angular/core';
import { IUser } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private location: Location, private userService: UserService){}

  model= {ci: '', name: '', surname: '', birth_date: '', address: '', email: '', phone_number: '' };

  registerUser(): void{
    try {
      let parsedCi: number = parseInt(this.model.ci, 10);
      this.userService.add(parsedCi, this.model.name, this.model.surname, new Date(this.model.birth_date), this.model.address, this.model.email, this.model.phone_number);
      this.model= {ci: '', name: '', surname: '', birth_date: '', address: '', email: '', phone_number: '' };
      this.goBack();
    } catch (error) {
      alert('¡Cedula invalida!');
    }
  }

  
  goBack(): void {
    this.location.back();
  }
}
