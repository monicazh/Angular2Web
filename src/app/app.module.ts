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
import { GamesComponent } from './games/games.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GamesService } from "./games.service";
import { CreateProfileComponent } from './create-profile/create-profile.component';

//import {ImageCropperComponent} from 'ng2-img-cropper';
//import {ImageUploadModule} from 'angular2-image-upload'

import { CustomFormsModule } from 'ng2-validation';
//import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
//import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { MultipleSelect } from "angular-2-multiple-selection/multiple-select";
import { LfgComponent } from './lfg/lfg.component';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import * as $ from 'jquery';
//import {DateTimePickerDirective} from 'ng2-eonasdan-datetimepicker';
import {CalendarModule} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DateTimePickerModule} from 'ng2-date-time-picker';
import {AccordionModule} from 'primeng/components/accordion/accordion';
import {MenuItem} from 'primeng/components/common/api';
import {LfgService} from "./lfg.service";
import { OrderByPipe } from './order-by.pipe';
import { MyLfgComponent } from './my-lfg/my-lfg.component';
//import {A2Edatetimepicker} from 'ng2-eonasdan-datetimepicker';
import {DropdownModule} from "ng2-dropdown";
import {MomentModule} from 'angular2-moment';
import { LfgFilterPipe } from './lfg-filter.pipe';
import {AF} from "./providers/af";
import { AngularFireModule } from 'angularfire2';
import * as firebase from "firebase";

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyDxiw56VWTuCeZdTKg5FVvwjmV3Lnt863M",
  authDomain: "multiplayermatchup.firebaseapp.com",
  databaseURL: "https://multiplayermatchup.firebaseio.com",
  projectId: "multiplayermatchup",
  storageBucket: "multiplayermatchup.appspot.com",
  messagingSenderId: "388072924693"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegPlayersComponent,
    HomeComponent,
    RegisterComponent,
    CreateprofileComponent,
    AlertComponent,
    GamesComponent,
    GameDetailComponent,
    CreateProfileComponent,
    MultipleSelect,
    LfgComponent,
    OrderByPipe,
    MyLfgComponent,
    LfgFilterPipe,
    //DropdownModule,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    //ImageUploadModule.forRoot(),
    CustomFormsModule,
    //RADIO_GROUP_DIRECTIVES
    //MultiselectDropdownModule
    NKDatetimeModule,
    CalendarModule,
    BrowserAnimationsModule,
    DateTimePickerModule,
    AccordionModule,
    //DropdownModule,
    //A2Edatetimepicker,
    MomentModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AlertService,
    AuthenticationService,
    ProfilesService,
    GamesService,
    LfgService,
    AF,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
