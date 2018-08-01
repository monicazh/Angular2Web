import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../profiles.service';
import { AlertService } from '../alert.service';
import { Router } from '@angular/router';
//import { Http, Headers } from '@angular/http';
import {AF} from "../providers/af";
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[ProfilesService]
})
export class RegisterComponent implements OnInit {
  model:any = {};
  loading = false;
  public error:any;
  //af:AngularFire;

  constructor(private profileService:ProfilesService,
              private router:Router,
              private alertService:AlertService,
              private afService:AF,
              public af:AngularFire) {
  }

  ngOnInit() {

  }

  register() {
    this.loading = true;
    // myid indicates detailed profile has not been created
    this.model.myid = 0;
    console.log("### RegisterComp: register(), model:", this.model);
    this.profileService.create(this.model)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

  /*
  createLoginProfile(name: string, email: string){
    this.model.myid = 0;
    // Only email is used
    this.model.username = email;
    this.profileService.create(this.model)
      .subscribe(
        data => {
          console.log("createLoginProfile, model=",this.model);
          //this.alertService.success('Registration successful', true);
          //this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }*/

  register2(event, name, email, password) {
    event.preventDefault();
    this.afService.registerUser(email, password).then((user) => {
      this.afService.saveUserInfoFromForm(user.uid, name, email).then(() => {
        this.router.navigate(['']);
      })
        .catch((error) => {
          this.error = error;
        });
    })
      .catch((error) => {
        this.error = error;
        console.log(this.error);
      });
  }

  register3(event, name, email, password) {
    console.log('register3()');

    this.af.auth.createUser({email, password}).then(
      authState => {
        authState.auth.sendEmailVerification();
        console.log('register3() sendEmail!!!!');
        this.router.navigate(['']);
        //this.createLoginProfile(name, email);

        //this.router.navigate(['']);
      })
        .catch((error) => {
          console.log('err!!!',error);
          this.error = error;
        });
    /*this.afService.registerUser(email, password).then(
      authState => {
        authState.auth.sendEmailVerification();
        console.log('register3() sendEmail!!!!');
        this.router.navigate(['']);
      })
      .catch((error) => {
        console.log('err!!!',error)
        this.error = error;
      })*/

  }
}
