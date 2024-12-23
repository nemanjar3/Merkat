import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormField, MatLabel,MatError } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'
import { NavbarButtonComponent } from "../navbar-button/navbar-button.component";

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

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Пошаљите податке на бекенд
      console.log(this.registerForm.value);
    }
  }
}