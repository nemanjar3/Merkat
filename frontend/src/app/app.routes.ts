import { Routes } from '@angular/router';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './components/home-page/home-page.component';
import { OglasDetaljiComponent } from './components/oglas-detalji/oglas-detalji.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './components/login-page/login-page.component';


export const routes: Routes = [
    { path: 'register', component: RegistrationPageComponent },
    { path: '', component: HomepageComponent }, 
    {path: 'user/:id', component: UserProfileComponent},
    { path: 'login', component: LoginPageComponent },
    { path: ':id', component: OglasDetaljiComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    })
    export class AppRoutingModule {}
