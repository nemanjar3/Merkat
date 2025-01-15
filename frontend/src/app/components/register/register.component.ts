import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormField, MatLabel, MatError } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

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
  profile_image: File | null = null;
  apiUrl = environment.apiUrl;
  profileImagePreview: string = `${this.apiUrl}/media/profile_images/default_profile.jpg`;


  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService) {
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

  onImageChange(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.profile_image = file;

      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit() {
    if (this.registerForm.valid) {
      // Create a FormData object
      const formData = new FormData();

      // Append form fields to FormData
      Object.keys(this.registerForm.value).forEach(key => {
        formData.append(key, this.registerForm.value[key]);
      });

      // Append the profile image if it exists
      if (this.profile_image) {
        formData.append('profile_image', this.profile_image);
      }
      // HTTP request observer
      const observer = {
        next: (response: any) => {
          this.translateService.get('registerSuccess').subscribe(
            (translation: string) => this.toastr.success(translation)
          );
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          if (error.error && error.error.error === 'Username already exists') {
            this.registerForm.get('username')?.setErrors({ usernameExists: true });
          }
          this.toastr.error('Error creating profile');
        }
      };

      // Make the HTTP POST request
      this.http.post(`${this.apiUrl}/api/users/create/`, formData)
        .subscribe(observer);
    } else {
      this.toastr.error('Please fill in all required fields');
    }
  }

}