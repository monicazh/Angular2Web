import { Component, OnInit } from '@angular/core';
import { Game } from '../game'
import { Profile } from '../profile';
import { ProfilesService } from '../profiles.service';
import { GamesService } from '../games.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ItemsSelect } from "angular-2-multiple-selection/sources/models/items-select";
import { MultipleSelect } from "angular-2-multiple-selection/sources/models/multiple-select";
import {AF} from "../providers/af";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  selectedGame: Game;
  sub: any;
  currentUser: Profile;
  isLogin = false;
  gameId: number;
  interestedPlayers: Profile[];
  isPlatformSupported = [false,false,false,false,false];
  multipleSelect_Pf: MultipleSelect = new MultipleSelect();
  isAdded2MyList = false;

  constructor(
    private gamesService: GamesService,
    private profilesService: ProfilesService,
    private route: ActivatedRoute,
    private router: Router,
    private afService:AF
  ) {
    this.isAfLoggedIn();
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //this.isUserLoggedIn();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      console.log('getting game with id: ', id);
      this.gameId = id;
      this.selectedGame=this.gamesService.getGameById(id);
      this.getInterestedPlayers();
      this.checkPlatform();
      this.insertData();
      if(this.isLogin) {
        this.isAddedGame();
      }

    });
  }

  isAfLoggedIn(){
    console.log('isAfLoggedIn, displayName=', this.afService.displayName);
    if(this.afService.displayName){
      //this.currentUser.username = this.afService.displayName;
      this.isLogin = true;
    }
  }
  /*
  isUserLoggedIn() {
    if (this.currentUser){
      this.isLogin = true;
      console.log('GameDetail Comp: isLogin= ', this.isLogin, 'current user:', this.currentUser);
    }
  }*/

  getInterestedPlayers(){
    this.profilesService
      .getProfiles()
      .subscribe(profiles => {
        let interestedPlayers = profiles.filter(profile => {
          return profile.interested_games[this.gameId-1] !== "None Selected";
        });
        console.log('GameDetail getInterestedPlayers, interestedPlayer=',interestedPlayers);

        this.interestedPlayers = interestedPlayers;

        //this.interestedPlayerCount = profiles.length;
      });
  }

  isSupportedPlatform(pf:string):boolean {
    var platforms = this.selectedGame.platform;
    //var found = platforms.find(platform => pf === platform);
    //var found = platforms.search(pf);
    return platforms.indexOf(pf) != -1;
  }

  checkPlatform(){
    var pf_list = ['XB1','XBox','PS4','PS3','PC'];
    for(var count = 0; count < 5; count++){
      this.isPlatformSupported[count] = this.isSupportedPlatform(pf_list[count]);
    }
    /*
    this.isPlatformSupported[0] = this.isSupportedPlatform('XB1');
    this.isPlatformSupported[1] = this.isSupportedPlatform('XBox');
    this.isPlatformSupported[2] = this.isSupportedPlatform('PS4');
    this.isPlatformSupported[3] = this.isSupportedPlatform('PS3');
    this.isPlatformSupported[4] = this.isSupportedPlatform('PC');*/
    console.log("game-detail, isPlatformSupport=", this.isPlatformSupported);
  }

  insertData() {
    // id, value, text, checked, expanded, enable
    // Select interested game for each platform
    var pf_list = ['XB1','XBox','PS4','PS3','PC'];
    var select_item = [];
    var index = 1;
    for(var count = 0; count < 5; count++){
      if(this.isSupportedPlatform(pf_list[count])){
        select_item.push(new ItemsSelect(index, index, pf_list[count], false, true, true, []));
        index ++;
      }
    }
    console.log('select_item=',select_item);

    this.multipleSelect_Pf.items = select_item;
    this.multipleSelect_Pf.numberItemsDisplay = 3;
    this.multipleSelect_Pf.checkAllCheckBoxText = 'Check All';
    this.multipleSelect_Pf.maxWidth = '500px';
    this.multipleSelect_Pf.showHeader = false;
    this.multipleSelect_Pf.allItemsCheckedText = this.selectedGame.platform;
  }

  addToMyList(){
    var selected_pfs = this.multipleSelect_Pf.getItemsDisplay();
    console.log('addToMyList(), selected=',selected_pfs);
    // add to DB
    //var my_profile = this.currentUser;

    this.profilesService.getProfiles()
      .subscribe(profiles => {
        let filteredUsers = profiles.filter(profile => {
          return profile.username === this.afService.displayName
        });
        console.log("@@@@@@ login(), filteredUser=",filteredUsers);
        let my_profile = filteredUsers;
        my_profile.interested_games[this.gameId-1] = selected_pfs;
        this.profilesService.update(my_profile)
          .subscribe(profile => {
            console.log('addToMyList callback(),profile=',profile);
            //this.currentUser = profile;
            localStorage.setItem('currentUser', JSON.stringify(profile));
            this.getInterestedPlayers();
            this.isAddedGame();
      });
    /*
    my_profile.interested_games[this.gameId-1] = selected_pfs;
    this.profilesService.update(my_profile)
        .subscribe(profile => {
          console.log('addToMyList callback(),profile=',profile);
          this.currentUser = profile;
          localStorage.setItem('currentUser', JSON.stringify(profile));
          this.getInterestedPlayers();
          this.isAddedGame();
        });*/
  })
  }

  isAddedGame():void{
    var my_profile = this.currentUser;
    console.log('###isAddedGame(),my_profile=',my_profile);
    this.profilesService.getProfileById(this.currentUser.myid)
        .subscribe(profile => {
          this.isAdded2MyList=(profile.interested_games[this.gameId-1] !== "None Selected");
        });
    /*
    if(my_profile.interested_games[this.gameId-1] != "None Selected"){
      this.isAdded2MyList = true;
    }else{
      this.isAdded2MyList = false;
    }*/
    console.log('### isAddedGame(),this.isAdded2MyList=',this.isAdded2MyList);
  }
}
