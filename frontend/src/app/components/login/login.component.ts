import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

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
  apiUrl = environment.apiUrl;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      // Call the API using HttpClient
      const observer = {
        next: (response: any) => {
          // Handle successful response
          this.authService.saveUser(response);
          this.translateService.get('logInSuccess').subscribe(
            (translation: string) => this.toastr.success(translation)
          );
        },
        error: (error: any) => {
          // Handle error
          if (error.error && (error.error.error === 'User not found' || error.error.error === 'Invalid password')) {
            this.translateService.get('invalidUsernameOrPassword').subscribe(
              (translation: string) => this.toastr.error(translation)
            );
            return
          }
          console.error('Error logging in:', error);
          this.toastr.error('Error logging in');
        },
        complete: () => {
          // Optional: Handle completion (e.g., hide loading indicator)
          this.router.navigate(['/']);
        }
      };
 
      this.http.post(`${this.apiUrl}/api/users/login/`, this.loginForm.value)
        .subscribe(observer);
    }
  }
}
