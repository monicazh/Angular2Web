import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfilesService } from '../profiles.service';
import { LfgRequest } from '../lfg-request';
import { LfgService } from '../lfg.service';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import * as $ from 'jquery';
import {CalendarModule} from 'primeng/primeng';
import {BrowserModule, } from '@angular/platform-browser';
//import { BrowserAnimationsModule, NoopAnimationsModule} from '@angular/animations'
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AccordionModule} from 'primeng/components/accordion/accordion';
import {MenuItem} from 'primeng/components/common/api';
import { AlertService } from '../alert.service';
//import {A2Edatetimepicker} from 'ng2-eonasdan-datetimepicker';
import { OrderByPipe } from '../order-by.pipe'
//import {DropdownModule} from "ng2-dropdown";
import {MomentModule} from 'angular2-moment';
import { LfgFilterPipe } from '../lfg-filter.pipe'

@Component({
  selector: 'app-lfg',
  templateUrl: './lfg.component.html',
  styleUrls: ['./lfg.component.css'],
})
export class LfgComponent implements OnInit {

  currentUser:Profile;
  isLogin = false;
  loading = false;
  model:any = {};
  platforms = ['XB1', 'XBox', 'PS4', 'PS3', 'PC'];
  games = ['Destiny', 'Diablo 3', 'Left 4 Dead 2', 'Call of Duty II'];
  types = ['Online', 'Meet-in-Person'];
  activities = ['Match', 'Event'];
  startTime;
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

  constructor(private profilesService:ProfilesService,
              private lfgService:LfgService,
              private alertService:AlertService,) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isUserLoggedIn();
    this.filter_platform = 0;
    this.filter_game = 0;
    this.filter_time = 0;
  }

  ngOnInit() {
    this.getValidLfgReqs();
  }

  isUserLoggedIn() {
    if (this.currentUser) {
      this.isLogin = true;
      console.log('GameDetail Comp: isLogin= ', this.isLogin, 'current user:', this.currentUser);
    }
  }

  /*
   parseDate(dateString: string): Date {
   if (dateString) {
   var new_date = new Date(dateString);
   console.log('***parseDate(), dateInput=',new_date);
   return new_date;
   //return new Date(dateString);
   } else {
   return null;
   }
   }*/

  setMoment(moment:any):any {
    this.startTime = moment;
    //console.log('***setMoment(),start time=',this.startTime);
    // Do whatever you want to the return object 'moment'
  }

  post() {
    console.log("***lfg: post(), this.model:", this.model, this.startTime);
    this.loading = true;

    this.model.start_time = this.startTime;
    this.model.myid = this.currentUser.myid;
    this.model.username = this.currentUser.username;
    this.model.creat_time = new Date();

    this.lfgService.create(this.model)
      .subscribe(lfg => {
        console.log("***lfg: post success,lfg=", lfg);
        this.alertService.success('Post LFG successfully', true);
        this.getValidLfgReqs();
        this.loading = false;
      }, error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

  getAllLfgReqs() {
    console.log("***lfg: getAllLfgReqs()");
    this.lfgService.getAllLfgs()
      .subscribe(lfgs => {
        console.log("***lfg: getAllLfgReqs()", lfgs);
        this.lfgs = lfgs;
      });
  }

  // ignore LFG requests that start time is later than current time
  getValidLfgReqs() {
    console.log("***lfg: getValidLfgReqs()");
    this.lfgService.getAllLfgs()
      .subscribe(lfgs => {
        let validLfgs = lfgs.filter(lfg => {
          let cur_time = new Date();
          console.log("***cur_time=", cur_time, ",cur.gettime=", cur_time.getTime());
          console.log("***lfg.start_time=", lfg.start_time, ",parse=", Date.parse(lfg.start_time));
          return Date.parse(lfg.start_time) > cur_time.getTime();
        });
        console.log("***lfg: getValidLfgReqs(),validLfgs=", validLfgs);
        this.lfgs = validLfgs;
      });
  }

  filterByPlatform() {
    //console.log("***lfg: filterByPlatform(),this.filter_platform=", this.filter_platform);
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
    //console.log("***lfg: filterByGame(),this.filter_game=", this.filter_game);

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
    //console.log("***lfg: filterByTime(),this.filterByTime=", this.filter_time);
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

    /*this.lfgService.getAllLfgs()
      .subscribe(lfgs => {
        let filterTimeLfgs = lfgs.filter(lfg => {
          var hours = parseInt(lfg.start_time.substr(11, 2));
          // time zone adjustment
          var hour_local = (hours - 4) > 0 ? (hours - 4) : (hours + 20);
          //let start_time_seconds = Date.parse(lfg.start_time);
          //var date = new Date(1970,0,1);
          //date.setSeconds(start_time_seconds);

          //var hours   = Math.floor(start_time_seconds / 3600) % 24;
          //var sec_num = parseInt(lfg.start_time, 10);
          //var hours   = Math.floor(sec_num / 3600) % 24;
          //console.log("***lfg: start_time hours=", hours, hour_local,",lfg.start_time=",lfg.start_time);
          //return
          //return (Date.parse(lfg.start_time) > cur_time.getTime() &&
          //lfg.game === this.filter_game);
          return hour_local < this.filter_time && hour_local >= this.filter_time - 8;
        });
        console.log("***lfg: filterByPlatform(),filterGameLfgs=", filterTimeLfgs);
        this.lfgs = filterTimeLfgs;
      });*/
  }

  resetFilter(){
    this.filter_platform = 0;
    this.filter_game = 0;
    this.filter_time = 0;
    this.getValidLfgReqs();
  }
}

