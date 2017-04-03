import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfilesService } from '../profiles.service';
import { AlertService } from '../alert.service';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.css']
})
export class CreateprofileComponent implements OnInit {

  model:any = {};
  loading = false;
  image = "uploads/profile_default_img.jpg";
  //currentUser: Profile;

  constructor(private profilesService: ProfilesService,
              private router:Router,
              private alertService: AlertService) {
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  upload(event){
    var file = event.srcElement.files;
    var image = file[0];
    console.log("###@@@@ CreateProfile: UPLOAD(), image=",image);
    var formData = new FormData();
    formData.append('image',image);
    this.profilesService.uploadImage(formData)
        .subscribe(
          profile => {
            //console.log("###@@@@ CreateProfile: UPLOAD(), profile=",profile);
            this.image = profile.image;
            console.log("###@@@@ CreateProfile: UPLOAD(), this.image=",this.image);
          });
  }

  // create user profile: user profile exists when login.
  // Use _id to find this profile and update
  create() {
    console.log("### createProfile: create(), this.model:", this.model, "this.image=", this.image);
    this.loading = true;

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.model.myid = currentUser._id;
    this.model.email = currentUser.email;
    this.model.password = currentUser.password;
    this.model.username = currentUser.username;
    this.model.image = this.image;

    console.log("### createProfile: create(), this.model:", this.model);
    console.log("### createProfile: create(), image:", this.model.image);

    localStorage.setItem('currentUser', JSON.stringify(this.model));

    // call service.update() to update the existing profile
    this.profilesService.update(this.model)
      .subscribe(
        data => {
          this.alertService.success('Create profile successfully', true);
          this.router.navigate(['/reg-players']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
