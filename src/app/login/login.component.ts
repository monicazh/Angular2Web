import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../profiles.service';
import { AlertService } from '../alert.service';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private profilesService: ProfilesService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.logout();
    console.log("loginCOMP ### logout()");

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
/*
  login(){
    console.log("@@@ login Comp: login(), model=", this.model);
    this.loading = true;
    this.profilesService.login(this.model.username, this.model.password)
      .subscribe(profile => {
        console.log("@@@222 login Comp: login(), profile=",profile);
      })
  }*/

  login() {

    //console.log("@@@ login Comp: login(), model=", this.model);
    this.loading = true;
    this.profilesService.getProfiles()
        .subscribe(profiles => {
            console.log("@@@ login Comp: login(), profiles=",profiles);
            let filteredUsers = profiles.filter(profile => {
              return profile.username === this.model.username && profile.password === this.model.password;
            });
            console.log("@@@@@@ login(), filteredUser=",filteredUsers);
            if (filteredUsers.length){
              let user = filteredUsers[0];
              console.log("filterUser FOUND", user);
              localStorage.setItem('currentUser', JSON.stringify(user));

              console.log("returnURL=", this.returnUrl);
              this.router.navigate(['/reg-players']);
            } else {
              console.log("filterUser NOT FOUND");
              //var errmsg = new Error("Username or password is incorrect");
              this.alertService.error('Username or password is incorrect');
              this.loading = false;
              this.router.navigate(['/login']);
            }
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
  /*
  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }*/

