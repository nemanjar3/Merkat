import { Component } from '@angular/core';
import { RegisterComponent } from "../register/register.component";

@Component({
    standalone: true,
    selector: 'app-registration-page',
    imports: [RegisterComponent],
    templateUrl: './registration-page.component.html',
    styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {

}
