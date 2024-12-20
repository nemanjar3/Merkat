import { Routes } from '@angular/router';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
    { path: 'register', component: RegistrationPageComponent },
    { path: '', component: HomepageComponent }, // Add more routes as needed
     // Add more routes as needed

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    })
    export class AppRoutingModule {}
