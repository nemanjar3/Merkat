import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormField, MatLabel,MatError } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'
import { NavbarButtonComponent } from "../navbar-button/navbar-button.component";
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
    selector: 'app-register',
    imports: [ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    TranslateModule,
    RouterModule,
    MatInputModule,
    CommonModule, NavbarButtonComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient) {
    this.registerForm = this.fb.group({
      user_name: ['', Validators.required],
      user_surname: ['', Validators.required],
      username: ['', Validators.required],
      tel_num: [
        '', 
        [Validators.required, Validators.pattern('^[0-9]*$')] // Both validators should be in the same array
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
  }

  onSubmit() {
    console.log('Form submitted:', this.registerForm.value);
    if (this.registerForm.valid) {
      // Call the API using HttpClient
      const observer = {
        next: (response: any) => {
          // Handle successful response
          console.log('User created successfully:', response);
          // Optionally navigate to login page:
          // this.router.navigate(['/login']);
        },
        error: (error: any) => {
          // Handle error
          console.error('Error creating user:', error);
        },
        complete: () => {
          // Optional: Handle completion (e.g., hide loading indicator)
          console.log('API call completed');
        }
      };
  
      this.http.post('http://127.0.0.1:8000/api/users/create/', this.registerForm.value)
        .subscribe(observer);
    }
  }
}