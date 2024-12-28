import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormField, MatLabel} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormField,
    MatLabel,
    TranslateModule,
    RouterModule,
    MatInputModule,
    CommonModule,
    TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, 
              private http: HttpClient, 
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
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
          this.authService.saveUser(response);
          console.log('Logged in:', response);
          this.toastr.success('Logged in successfully');
          // Optionally navigate to login page:
          // this.router.navigate(['/login']);
        },
        error: (error: any) => {
          // Handle error
          console.error('Error logging in:', error);
          this.toastr.error('Error logging in');
        },
        complete: () => {
          // Optional: Handle completion (e.g., hide loading indicator)
          this.router.navigate(['/']);
          console.log('API call completed');
        }
      };

      this.http.post('http://127.0.0.1:8000/api/users/login/', this.loginForm.value)
        .subscribe(observer);
    }
  }
}
