import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RegPlayersComponent } from './reg-players/reg-players.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfilesService } from './profiles.service';
import { AlertService } from './alert.service';
import { AuthenticationService } from './authentication.service';
import { CreateprofileComponent } from './createprofile/createprofile.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegPlayersComponent,
    HomeComponent,
    RegisterComponent,
    CreateprofileComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AlertService,
    AuthenticationService,
    ProfilesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
