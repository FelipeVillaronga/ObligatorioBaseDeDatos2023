import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) { }
  model = { logId: 0, password: '' };

  loginSubmit() {
    this.loginService.sendLogin(this.model.logId, this.model.password).subscribe(
      (response) => {
        console.log(response);
        if (response && response.logId !== undefined) {
          const id = response.logId;
          this.router.navigate(['/menu', id]);
        } else {
          alert("Credenciales incorrectas");
        }
      }
    );
  }
  

}
