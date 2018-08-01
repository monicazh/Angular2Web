import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
//import { ProfilesService } from '../profiles.service';
import { LfgRequest } from '../lfg-request';
import { LfgService } from '../lfg.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-my-lfg',
  templateUrl: './my-lfg.component.html',
  styleUrls: ['./my-lfg.component.css']
})
export class MyLfgComponent implements OnInit {

  currentUser: Profile;
  isLogin = false;
  loading = false;
  myLfgs: LfgRequest[];
  selectedLfg: LfgRequest;
  model:any = {};
  platforms = ['XB1','XBox','PS4','PS3','PC'];
  games = ['Destiny','Diablo 3','Left 4 Dead 2','Call of Duty II'];
  types = ['Online', 'Meet-in-Person'];
  activities = ['Match','Event'];
  startTime;

  constructor(
    private lfgService: LfgService,
    private alertService: AlertService,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isUserLoggedIn();
  }

  ngOnInit() {
    this.getAllMyLfgReqs();
  }

  isUserLoggedIn(): void {
    if (this.currentUser){
      this.isLogin = true;
      console.log('GameDetail Comp: isLogin= ', this.isLogin, 'current user:', this.currentUser);
    }
  }

  getAllMyLfgReqs() {
    console.log("***lfg: getMyLfgReqs()");
    this.lfgService.getAllLfgs()
      .subscribe(lfgs => {
        let myLfgs = lfgs.filter(lfg => {
          let myId = this.currentUser.myid;
          console.log("***lfg.myId=",myId);
          return lfg.myid === this.currentUser.myid;
        });
        this.myLfgs = myLfgs;
      });
  }

  onSelect(lfg: LfgRequest): void {
    this.selectedLfg = lfg;
    this.model = this.selectedLfg;
    this.startTime = lfg.start_time;
  }

  updateLfg(){
    this.model.creat_time = new Date();
    this.model.start_time = this.startTime;
    this.lfgService.update(this.model)
      .subscribe(lfg => {
        console.log("***lfg: update success,lfg=",lfg);
        //this.alertService.success('Update my LFG successfully', true);
        this.getAllMyLfgReqs();
        this.loading = false;
        this.model = lfg;
        this.startTime = lfg.start_time;
      }, error => {
        this.alertService.error(error);
        this.loading = false;
      });

  }

  deleteLfg(){
    this.lfgService.delete(this.model)
      .subscribe(lfg => {
        console.log("***lfg: delete success,lfg=",lfg);
        //this.alertService.success('Delete my LFG successfully', true);
        this.getAllMyLfgReqs();
        this.loading = false;
        this.model = {};
        this.startTime = '';
      }, error => {
        this.alertService.error(error);
        this.loading = false;
      })
  }

  setMoment(moment: any): any {
    this.startTime = moment;
    //console.log('***setMoment(),start time=',this.startTime);
    // Do whatever you want to the return object 'moment'
  }

}
