import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatFormField, MatLabel, MatError } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NavbarButtonComponent } from '../navbar-button/navbar-button.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    NavbarButtonComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  user: any;
  activeTab: 'ads' | 'profile' = 'profile';
  userForm!: FormGroup;
  userId!: string;
  profile_image: File | null = null;
  profileImagePreview: string = '';
  apiUrl = environment.apiUrl;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      ime: [{ value: '', disabled: false }, [Validators.required]],
      prezime: [{ value: '', disabled: false }, [Validators.required]],
      username: [{ value: '', disabled: false }, [Validators.required]],
      email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
      telefon: [{ value: '', disabled: false }, [Validators.required]],
      slika: [{ value: '', disabled: false }, [Validators.required]],
    });

    this.route.paramMap.subscribe({
      next: (params) => {
        this.userId = params.get('id') || '';
        if (this.userId) {
          this.userService.getUserByID(this.userId).subscribe({
            next: (user) => {
              this.user = user;
              this.profileImagePreview = `${this.apiUrl}${user.profile_image}`;
 
              this.userForm.patchValue({
                ime: this.user.user_name,
                prezime: this.user.user_surname,
                username: this.user.username,
                email: this.user.email,
                telefon: this.user.tel_num,
                slika: this.user.profile_image,
              });
            },
            error: (error) => {
              console.error('Error fetching user details:', error);
            },
          });
        }
      },
    });
  }

  onProfilePictureChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.profile_image = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.profileImagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = new FormData();
      formData.append('username', this.userForm.value.username);
      formData.append('email', this.userForm.value.email);
      formData.append('user_name', this.userForm.value.ime);
      formData.append('user_surname', this.userForm.value.prezime);
      formData.append('tel_num', this.userForm.value.telefon);

      if (this.profile_image) {
        formData.append('profile_image', this.profile_image);
      }

      this.http.put(`${this.apiUrl}/api/users/profile/update/${this.userId}/`, formData).subscribe({
        next: (response) => {
          this.translateService.get('updateSuccess').subscribe((translation: string) => this.toastr.success(translation));
          console.log('Profile updated successfully:', response);
        },
        error: (error) => {
          if (error.error && error.error.username[0] === 'This username is already taken.') {
            this.userForm.get('username')?.setErrors({ usernameExists: true });
          }
          console.error('Error updating profile:', error);
          this.toastr.error('Error updating profile');
        },
      });
    } else {
      this.toastr.error('Please fill out all required fields');
    }
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  updateListing(oglas: any): void {
    this.router.navigate(['/listing', oglas.listing_id]);
  }
}
