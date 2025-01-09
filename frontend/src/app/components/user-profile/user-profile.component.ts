import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarButtonComponent } from '../navbar-button/navbar-button.component';
import { MatFormField, MatLabel, MatError } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    RouterModule,
    NavbarButtonComponent,
    MatFormField,
    MatLabel,
    MatError,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  user: any;
  activeTab: 'ads' | 'profile' = 'profile';
  userForm!: FormGroup;
  userId!: string;

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private router: Router) { }

  ngOnInit(): void {
    // Initialize the form with default values
    this.userForm = this.fb.group({
      ime: [{ value: '', disabled: false }, [Validators.required]],
      prezime: [{ value: '', disabled: false }, [Validators.required]],
      username: [{ value: '', disabled: false }, [Validators.required]],
      email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
      telefon: [{ value: '', disabled: false }, [Validators.required]],
    });

    // Fetch user data from your service or local storage
    this.route.paramMap.subscribe({
      next: (params) => {
        this.userId = params.get('id') || '';
        if (this.userId) {
          this.userService.getUserByID(this.userId).subscribe({
            next: (user) => {
              this.user = user;

              // Update the form values with the fetched user data
              this.userForm.patchValue({
                ime: this.user.user_name,
                prezime: this.user.user_surname,
                username: this.user.username,
                email: this.user.email,
                telefon: this.user.tel_num,
              });
            },
            error: (error) => {
              console.error('Error fetching user details:', error);
              // Handle the error in the component (e.g., display an error message)
            },
            complete: () => {
              console.log('User fetch API call completed');
            },
          });
        }
      },
      error: (error) => {
        console.error('Error retrieving route parameters:', error);
        // Handle errors in accessing route parameters
      },
      complete: () => {
        console.log('Route parameter subscription completed');
      },
    });
  }

  onProfilePictureChange(event: Event): void {
    // const input = event.target as HTMLInputElement;
    // if (input?.files?.length) {
    //   const file = input.files[0];

    //   // Convert file to a preview URL or upload it to the server
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.user.slika = reader.result as string; // Update user profile picture
    //   };
    //   reader.readAsDataURL(file);
    // }
  }
  onSubmit(): void {
    if (this.userForm.valid) {
      // const updateUrl = `http:/127.0.0.1:8000/api/users/profile/update/${userId}/`;
      const payload = {
        username: this.userForm.value.username,
        email: this.user.email,
        user_name: this.userForm.value.ime,
        user_surname: this.userForm.value.prezime,
        tel_num: this.userForm.value.telefon,
      };

      this.http.put(`http://127.0.0.1:8000/api/users/profile/update/${this.userId}/`, payload).subscribe({
        next: (response) => {
          this.translateService.get('updateSuccess').subscribe(
            (translation: string) => this.toastr.success(translation)
          );
          console.log('Profile updated successfully:', response);
          window.scrollTo(0, 0);
        },
        error: (error) => {
          if (error.error && error.error.username[0] === 'This username is already taken.') {
            this.userForm.get('username')?.setErrors({ usernameExists: true });
          }
          console.log("Payload: ", payload);
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
