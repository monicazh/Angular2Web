import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegPlayersComponent } from '../reg-players/reg-players.component';
import { HomeComponent } from '../home/home.component';
import {RegisterComponent} from "../register/register.component";
import {CreateprofileComponent} from "../createprofile/createprofile.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'reg-players',  component: RegPlayersComponent },
  { path: 'createprofile',  component: CreateprofileComponent },
  /* { path: 'detail/:id', component: HeroDetailComponent },
   { path: 'heroes',     component: HeroesComponent }*/
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
