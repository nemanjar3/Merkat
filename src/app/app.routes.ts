import { Routes } from '@angular/router';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './components/home-page/home-page.component';
import { OglasDetaljiComponent } from './components/oglas-detalji/oglas-detalji.component';
export const routes: Routes = [
    { path: 'register', component: RegistrationPageComponent },
    { path: '', component: HomepageComponent }, 
    { path: ':id', component: OglasDetaljiComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    })
    export class AppRoutingModule {}
