import { Routes } from '@angular/router';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './components/home-page/home-page.component';
import { OglasDetaljiComponent } from './components/oglas-detalji/oglas-detalji.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MarketingComponent } from './components/marketing/marketing.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { OglasUpdateComponent } from './components/oglas-update/oglas-update.component';
import { AboutComponent } from './components/about/about.component';
import { HelpComponent } from './components/help/help.component';

export const routes: Routes = [
    { path: 'register', component: RegistrationPageComponent },
    { path: '', component: HomepageComponent },
    { path: 'user/:id', component: UserProfileComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'marketing', component: MarketingComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'add-listing', component: AddListingComponent },
    { path: 'about', component: AboutComponent },
    { path: 'help', component: HelpComponent },


    { path: 'listing/:id', component: OglasUpdateComponent },
    { path: ':id', component: OglasDetaljiComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
