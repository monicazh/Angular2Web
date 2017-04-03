import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfilesService } from '../profiles.service';
import { Router } from '@angular/router';

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

  constructor(private profilesService: ProfilesService,
              private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isProfileCreated();
    console.log("reg-Players.Comp,currentUser:",this.currentUser, "isProfileCreated=",this.isCreated);
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
    if(this.currentUser) {
      if (this.currentUser.myid) {
        this.isCreated = true;
      }
      else {
        this.isCreated = false;
      }
    }
  }
}
