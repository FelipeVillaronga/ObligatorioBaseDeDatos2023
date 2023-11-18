import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  constructor(private userService: UserService) {
  }

  model = { ci: '', name: '', surname: '', birth_date: '' };

  submitData(): void {
    try {
      let parsedCi: number = parseInt(this.model.ci, 10);
      this.userService.submitData(parsedCi, this.model.name, this.model.surname, new Date(this.model.birth_date));
      this.model = { ci: '', name: '', surname: '', birth_date: '' };
      /*this.goBack();*/
    } catch (error) {
      alert('¡Cedula invalida!');
    }
  }
}
