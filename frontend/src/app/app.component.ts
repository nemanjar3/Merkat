import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
@Component({
  standalone: true,
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent,FormsModule, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Merkat';

}
