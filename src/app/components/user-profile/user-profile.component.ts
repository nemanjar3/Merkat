import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../shared/models/User';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  user!: User;
  activeTab: 'ads' | 'profile' = 'profile';
  userForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // Fetch user data from your service or local storage
    this.user = this.userService.getLoggedUser();
    this.userForm = this.fb.group({
      id: [{ value: this.user.id, disabled: true }],
      ime: [{value: this.user.ime, disabled: false},[Validators.required]],
      prezime: [{value: this.user.prezime, disabled: false},[Validators.required]],
      username: [{value: this.user.username, disabled: false},[Validators.required]],
      email: [{value: this.user.email, disabled: false}, [Validators.required, Validators.email]],
      datumRegistracije: [{ value: '2024-12-23', disabled: true }],
      telefon: [{value: this.user.telefon, disabled: false},[Validators.required]]
    });
  }
  onProfilePictureChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
  
      // Convert file to a preview URL or upload it to the server
      const reader = new FileReader();
      reader.onload = () => {
        this.user.slika = reader.result as string; // Update user profile picture
      };
      reader.readAsDataURL(file);
    }
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
