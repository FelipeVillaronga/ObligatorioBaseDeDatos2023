import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      name: ['', Validators.required],
      surname: ['', Validators.required],
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
    try {
      let parsedCi: number = parseInt(this.formUpdate.value.ci, 10);
      this.userService.submitData(parsedCi, this.formUpdate.value.name, this.formUpdate.value.surname, this.formUpdate.value.expiration_date, this.formUpdate.value.fileDetails);
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
  selectedDate: string | null = null;

  handleFileUpload(event: any): void {
    const fileInput = event.target;
    const file = fileInput.files && fileInput.files.length > 0 ? fileInput.files[0] : null;

    if (file) {
      this.fileDetails = {
        name: file.name,
        type: file.type,
        size: file.size
      };

    } else {
      this.fileDetails = null;
    }
  }
}