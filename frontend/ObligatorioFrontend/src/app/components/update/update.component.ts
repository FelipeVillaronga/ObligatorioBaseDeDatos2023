import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  

  formUpdate: FormGroup;
  

  

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.formUpdate = this.formBuilder.group({
      ci: ['', Validators.required],
      file: [null, Validators.required],
      expiration_date: [null, Validators.required],
    });
  }


  ngOnInit(): void {
    this.userService.getMostRecentPeriod().subscribe((response) => {
      if(response == false){
        alert("PERIODO FINALIZADO")
        this.router.navigate(['/index']);
      }
    });

  }

  submitData(): void {
    const parsedCi: number = parseInt(this.formUpdate.value.ci);
    if (isNaN(parsedCi)) {
      alert('¡Cédula inválida!');
      return;
    }

    this.userService.submitData(parsedCi, this.formUpdate.value.expiration_date, this.file)
      .subscribe({
        next: () => {
          this.formUpdate.reset();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  fileDetails: any;
  file: any;
  handleFileUpload(event: any): void {
    const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;
    if (file) {
      this.fileDetails = {
        file: file,
        name: file.name,
        type: file.type,
        size: file.size
      };
    }
    const file2 = event.target.files[0];
    if (file2) {
      console.log(file2);
      this.file= file2;
    }}
  

}