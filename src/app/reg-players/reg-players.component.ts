import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfilesService } from '../profiles.service';
import { Router } from '@angular/router';
import {AF} from "../providers/af";

@Component({
  selector: 'app-reg-players',
  templateUrl: './reg-players.component.html',
  styleUrls: ['./reg-players.component.css'],
  providers:[ProfilesService]
})
export class RegPlayersComponent implements OnInit {

  profiles: Profile[] = [];
  selectedProfile: Profile;
  currentUser: Profile;
  isCreated = false;
  isLogin = false;

  constructor(private profilesService: ProfilesService,
              private router: Router,
              private afService:AF) {
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isAfLoggedIn();
    this.isProfileCreated();
    console.log("reg-Players.Comp,currentUser:",this.afService.displayName, "isProfileCreated=",this.isCreated);
  }

  getProfiles(): void {
    this.profilesService
      .getProfiles()
      .subscribe(profiles => {
        console.log("reg-Players.Comp,getProfiles(), profiles=", profiles);
        this.profiles = profiles;
      });
  }

  ngOnInit() {
    this.getProfiles();
  }

  onSelect(profile: Profile): void {
    console.log("reg-Players.Comp, selectProfile =",profile);
    this.selectedProfile = profile;
  }

  isProfileCreated(): void {
    let createdProfile = this.profiles.filter(pf => {
      return pf.username === this.afService.displayName;
      });
    console.log("isProfileCreated(),createdProfile=",createdProfile);
    console.log("isProfileCreated(),displayName=",this.afService.displayName);
    console.log("isProfileCreated(),profiles=",this.profiles);
    if(createdProfile.length){
      this.isCreated = true;
    }
    /*
    if(this.currentUser) {
      if (this.currentUser.myid) {
        this.isCreated = true;
      }
      else {
        this.isCreated = false;
      }
    }*/
  }

  isAfLoggedIn(){
    console.log('isAfLoggedIn, displayName=', this.afService.displayName);
    if(this.afService.displayName){
      this.isLogin = true;
    }
  }
}
