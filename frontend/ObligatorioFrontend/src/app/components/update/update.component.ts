import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  formUpdate: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder,) {
    this.formUpdate = this.formBuilder.group({
      ci: ['', Validators.required],
      file: [null, Validators.required],
      expiration_date: [null, Validators.required],
    });
  }

  submitData(): void {
    try {
      let parsedCi: number = parseInt(this.formUpdate.value.ci);
      this.userService.submitData(parsedCi, this.formUpdate.value.expiration_date, this.formUpdate.value.file)
        .pipe(
          catchError((error) => {
            console.error(error);
            alert('Ocurrió un error al registrar el carnet de salud. Por favor, intenta nuevamente.');
            throw error;
          })
        )
        .subscribe({
          next: () => {
            alert('Carnet de salud registrado con éxito!');
          },
          error: (error) => {
            console.error(error);
            alert('Ocurrió un error al registrar el carnet de salud. Por favor, intenta nuevamente.');
          }
        });
      this.formUpdate = this.formBuilder.group({
        ci: ['', Validators.required],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        file: [null, Validators.required],
        expiration_date: [null, Validators.required],
      });
    } catch (error) {
      alert('¡Cedula invalida!');
    }
  }

  fileDetails: any;
  handleFileUpload(event: any): void {
    const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;
    if (file) {
      this.formUpdate.patchValue({ file });
      this.fileDetails = {
        name: file.name,
        type: file.type,
        size: file.size
      };
    }
  }
}