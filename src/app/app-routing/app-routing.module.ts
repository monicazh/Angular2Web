import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegPlayersComponent } from '../reg-players/reg-players.component';
import { HomeComponent } from '../home/home.component';
import {RegisterComponent} from "../register/register.component";
import {CreateprofileComponent} from "../createprofile/createprofile.component";
import {CreateProfileComponent} from "../create-profile/create-profile.component";
import {GamesComponent} from "../games/games.component";
import {GameDetailComponent} from "../game-detail/game-detail.component"
import { LfgComponent } from "../lfg/lfg.component";
import { MyLfgComponent } from "../my-lfg/my-lfg.component"

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'reg-players',  component: RegPlayersComponent },
  { path: 'createprofile',  component: CreateprofileComponent },
  { path: 'create-profile',  component: CreateProfileComponent },
  { path: 'games',  component: GamesComponent },
  { path: 'games/:id',  component: GameDetailComponent },
  { path: 'lfg',  component: LfgComponent },
  { path: 'my-lfg',  component: MyLfgComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
