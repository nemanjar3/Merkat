import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../shared/models/User';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarButtonComponent } from '../navbar-button/navbar-button.component';
import { MatFormField, MatLabel,MatError } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'
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
            ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  user: any;
  activeTab: 'ads' | 'profile' = 'profile';
  userForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Initialize the form with default values
    this.userForm = this.fb.group({
      ime: [{ value: '', disabled: false }, [Validators.required]],
      prezime: [{ value: '', disabled: false }, [Validators.required]],
      username: [{ value: '', disabled: false }, [Validators.required]],
      email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
      datumRegistracije: [{ value: '', disabled: true }],
      telefon: [{ value: '', disabled: false }, [Validators.required]],
    });
  
    // Fetch user data from your service or local storage
    this.route.paramMap.subscribe({
      next: (params) => {
        const userId = params.get('id');
        if (userId) {
          this.userService.getUserByID(userId).subscribe({
            next: (user) => {
              this.user = user;
  
              // Update the form values with the fetched user data
              this.userForm.patchValue({
                ime: this.user.user_name,
                prezime: this.user.user_surname,
                username: this.user.username,
                email: this.user.email,
                datumRegistracije: '2024-12-23',
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
      console.log(this.userForm.value);
      // Handle form submission logic here
    }
  }
  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  // Method to save user changes
  // saveChanges() {
  //   // Send updated user data to your backend
  // }
}
