import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfilesService } from '../profiles.service';
import { LfgRequest } from '../lfg-request';
import { LfgService } from '../lfg.service';
import {AF} from "../providers/af";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ProfilesService]
})
export class HomeComponent implements OnInit {

  title = 'Multiplayer Matchups';
  purpose = 'Search to find the perfect player for your team or post a request and be found.'
  playersCount;

  currentUser: Profile;
  isLogin = false;
  platforms = ['XB1', 'XBox', 'PS4', 'PS3', 'PC'];
  games = ['Destiny', 'Diablo 3', 'Left 4 Dead 2', 'Call of Duty II'];
  lfgs:LfgRequest[];
  filter_platform;
  filter_game;
  filter_time;
  filter_times = [
    {id: '8', duration: '0:00AM - 7:59AM'},
    {id: '16', duration: '8:00AM - 15:59AM'},
    {id: '24', duration: '16:00PM - 23:59PM'}];
  lfgs_last:LfgRequest[];
  filter_last;

  constructor(private profilesService: ProfilesService,
              private lfgService:LfgService,
              private afService:AF) {
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //this.isUserLoggedIn();
    this.filter_platform = 0;
    this.filter_game = 0;
    this.filter_time = 0;
    this.isAfLoggedIn();

  }

  ngOnInit() {
    this.getPlayersCount();
    this.getValidLfgReqs();
  }

  getPlayersCount(){
    this.profilesService
        .getProfiles()
        .subscribe(profiles => {
          this.playersCount = profiles.length;
        });
  }

  isAfLoggedIn(){
    console.log('isAfLoggedIn, displayName=', this.afService.displayName);
    if(this.afService.displayName){
        //this.currentUser.username = this.afService.displayName;
        this.isLogin = true;
    }
  }

  isUserLoggedIn() {
    if (this.currentUser) {
      this.isLogin = true;
      console.log('GameDetail Comp: isLogin= ', this.isLogin, 'current user:', this.currentUser);
    }
  }

  // ignore LFG requests that start time is later than current time
  getValidLfgReqs() {
    this.lfgService.getAllLfgs()
      .subscribe(lfgs => {
        let validLfgs = lfgs.filter(lfg => {
          let cur_time = new Date();
          return Date.parse(lfg.start_time) > cur_time.getTime();
        });
        this.lfgs = validLfgs;
      });
  }

  filterByPlatform() {
    if (this.filter_last === 'Platform'){
      this.lfgs = this.lfgs_last;
    }
    let filterPlatformLfgs = this.lfgs.filter(lfg => {
      let cur_time = new Date();
      return (Date.parse(lfg.start_time) > cur_time.getTime() &&
      lfg.platform === this.filter_platform);
    });

    this.lfgs_last = this.lfgs;
    this.filter_last = 'Platform';
    this.lfgs = filterPlatformLfgs;
  }

  filterByGame() {
    if (this.filter_last === 'Game'){
      this.lfgs = this.lfgs_last;
    }
    let filterGameLfgs = this.lfgs.filter(lfg => {
      let cur_time = new Date();
      return (Date.parse(lfg.start_time) > cur_time.getTime() &&
      lfg.game === this.filter_game);
    });

    this.lfgs_last = this.lfgs;
    this.filter_last = 'Game';
    this.lfgs = filterGameLfgs;
  }

  filterByTime() {
    if (this.filter_last === 'Time'){
      this.lfgs = this.lfgs_last;
    }
    let filterTimeLfgs = this.lfgs.filter(lfg => {
      let cur_time = new Date();
      var hours = parseInt(lfg.start_time.substr(11, 2));
      // time zone adjustment
      var hour_local = (hours - 4) > 0 ? (hours - 4) : (hours + 20);
      return hour_local < this.filter_time && hour_local >= this.filter_time - 8;
    });
    this.lfgs_last = this.lfgs;
    this.filter_last = 'Time';
    this.lfgs = filterTimeLfgs;
  }

  resetFilter(){
    this.filter_platform = 0;
    this.filter_game = 0;
    this.filter_time = 0;
    this.getValidLfgReqs();
  }

}
