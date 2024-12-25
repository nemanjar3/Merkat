import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormField, MatLabel,MatError } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
    CommonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = "";

  constructor(private fb: FormBuilder,private http: HttpClient,private router: Router) {
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
          if (error.error && error.error.error === 'Username already exists') {
            this.registerForm.get('username')?.setErrors({ usernameExists: true });
          }
        },
        complete: () => {
          //go to login page
          this.router.navigate(['/login']); 
          console.log('API call completed');
        }
      };
  
      this.http.post('http://127.0.0.1:8000/api/users/create/', this.registerForm.value)
        .subscribe(observer);
    }
  }
}