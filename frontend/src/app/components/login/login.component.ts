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
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    TranslateModule,
    RouterModule,
    MatInputModule,
    CommonModule,
    NavbarButtonComponent,
    TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    console.log('Form submitted:', this.loginForm.value);
    if (this.loginForm.valid) {
      // Call the API using HttpClient
      const observer = {
        next: (response: any) => {
          // Handle successful response
          console.log('Logged in:', response);
          // Optionally navigate to login page:
          // this.router.navigate(['/login']);
        },
        error: (error: any) => {
          // Handle error
          console.error('Error logging in:', error);
        },
        complete: () => {
          // Optional: Handle completion (e.g., hide loading indicator)
          console.log('API call completed');
        }
      };

      this.http.post('http://127.0.0.1:8000/api/users/login/', this.loginForm.value)
        .subscribe(observer);
    }
  }
}
