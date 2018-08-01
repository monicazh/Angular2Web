import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../profiles.service';
import { GamesService } from '../games.service';
import { AlertService } from '../alert.service';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
//import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ItemsSelect } from "angular-2-multiple-selection/sources/models/items-select";
import { MultipleSelect } from "angular-2-multiple-selection/sources/models/multiple-select";
import {AF} from "../providers/af";

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  model:any = {};
  loading = false;
  image = "uploads/profile_default_img.jpg";
  interested_games_pf: string[] = [];
  playstyles: string[] = [];
  characters: string[] = [];
  //selecting games from a list of supported games for each platform
  multipleSelect_Destiny_Pf: MultipleSelect = new MultipleSelect();
  multipleSelect_Diablo_Pf: MultipleSelect = new MultipleSelect();
  multipleSelect_Left_Pf: MultipleSelect = new MultipleSelect();
  multipleSelect_CoD_Pf: MultipleSelect = new MultipleSelect();

  //indicating the ability to use a voice channel for each supported platform
  multipleSelect_Mic: MultipleSelect = new MultipleSelect();

  //selecting a play style from a list of play styles for each game
  multipleSelect_Destiny: MultipleSelect = new MultipleSelect();
  multipleSelect_Diablo: MultipleSelect = new MultipleSelect();
  multipleSelect_Left: MultipleSelect = new MultipleSelect();
  multipleSelect_CoD: MultipleSelect = new MultipleSelect();

  // Game Characters for each game
  multipleSelect_Destiny_Ch: MultipleSelect = new MultipleSelect();
  multipleSelect_Diablo_Ch: MultipleSelect = new MultipleSelect();
  multipleSelect_Left_Ch: MultipleSelect = new MultipleSelect();
  multipleSelect_CoD_Ch: MultipleSelect = new MultipleSelect();


  constructor(private profilesService: ProfilesService,
              private gamesService: GamesService,
              private router:Router,
              private alertService: AlertService,
              private afService:AF) {
    this.insertData();
  }

  ngOnInit() {

  }

  insertData() {
    // id, value, text, checked, expanded, enable
    // Select interested game for each platform
    let pf1_1 = new ItemsSelect(1, 1, 'XB1', false, true, true, []);
    let pf1_2 = new ItemsSelect(2, 2, 'XBox', false, true, true, []);
    let pf1_3 = new ItemsSelect(3, 3, 'PS4', false, true, true, []);
    let pf1_4 = new ItemsSelect(4, 4, 'PS3', false, true, true, []);
    let pf1_5 = new ItemsSelect(4, 4, 'PC', false, true, true, []);
    let pf2_1 = new ItemsSelect(1, 1, 'XB1', false, true, true, []);
    let pf2_2 = new ItemsSelect(2, 2, 'XBox', false, true, true, []);
    let pf2_3 = new ItemsSelect(3, 3, 'PS4', false, true, true, []);
    let pf2_4 = new ItemsSelect(4, 4, 'PS3', false, true, true, []);
    let pf2_5 = new ItemsSelect(4, 4, 'PC', false, true, true, []);
    let pf3_1 = new ItemsSelect(1, 1, 'XB1', false, true, true, []);
    let pf3_2 = new ItemsSelect(2, 2, 'XBox', false, true, true, []);
    let pf3_3 = new ItemsSelect(3, 3, 'PS4', false, true, true, []);
    let pf3_4 = new ItemsSelect(4, 4, 'PS3', false, true, true, []);
    let pf3_5 = new ItemsSelect(4, 4, 'PC', false, true, true, []);
    let pf4_1 = new ItemsSelect(1, 1, 'XB1', false, true, true, []);
    let pf4_2 = new ItemsSelect(2, 2, 'XBox', false, true, true, []);
    let pf4_3 = new ItemsSelect(3, 3, 'PS4', false, true, true, []);
    let pf4_4 = new ItemsSelect(4, 4, 'PS3', false, true, true, []);
    let pf4_5 = new ItemsSelect(4, 4, 'PC', false, true, true, []);
    // Select game style for each game
    let style1_1 = new ItemsSelect(1, 1, 'Casual', false, true, true, []);
    let style1_2 = new ItemsSelect(2, 2, 'Serious', false, true, true, []);
    let style1_3 = new ItemsSelect(3, 3, 'Zealous', false, true, true, []);
    let style1_4 = new ItemsSelect(4, 4, 'Any', true, true, true, []);
    let style2_1 = new ItemsSelect(1, 1, 'Casual', false, true, true, []);
    let style2_2 = new ItemsSelect(2, 2, 'Serious', false, true, true, []);
    let style2_3 = new ItemsSelect(3, 3, 'Zealous', false, true, true, []);
    let style2_4 = new ItemsSelect(4, 4, 'Any', true, true, true, []);
    let style3_1 = new ItemsSelect(1, 1, 'Casual', false, true, true, []);
    let style3_2 = new ItemsSelect(2, 2, 'Serious', false, true, true, []);
    let style3_3 = new ItemsSelect(3, 3, 'Zealous', false, true, true, []);
    let style3_4 = new ItemsSelect(4, 4, 'Any', true, true, true, []);
    let style4_1 = new ItemsSelect(1, 1, 'Casual', false, true, true, []);
    let style4_2 = new ItemsSelect(2, 2, 'Serious', false, true, true, []);
    let style4_3 = new ItemsSelect(3, 3, 'Zealous', false, true, true, []);
    let style4_4 = new ItemsSelect(4, 4, 'Any', true, true, true, []);

    let mic1 = new ItemsSelect(1, 1, 'XB1', false, true, true, []);
    let mic2 = new ItemsSelect(2, 2, 'XBox', false, true, true, []);
    let mic3 = new ItemsSelect(3, 3, 'PS4', false, true, true, []);
    let mic4 = new ItemsSelect(4, 4, 'PS3', false, true, true, []);
    let mic5 = new ItemsSelect(5, 5, 'PC', false, true, true, []);

    let ch1_1 = new ItemsSelect(1, 1, 'Hunter', false, true, true, []);
    let ch1_2 = new ItemsSelect(2, 2, 'Warlock', false, true, true, []);
    let ch1_3 = new ItemsSelect(3, 3, 'Titan', false, true, true, []);

    let ch2_1 = new ItemsSelect(4, 4, 'Barbarian', false, true, true, []);
    let ch2_2 = new ItemsSelect(5, 5, 'Crusader', false, true, true, []);
    let ch2_3 = new ItemsSelect(6, 6, 'Demon Hunter', false, true, true, []);
    let ch2_4 = new ItemsSelect(7, 7, 'Monk', false, true, true, []);
    let ch2_5 = new ItemsSelect(8, 8, 'Witch Doctor', false, true, true, []);
    let ch2_6 = new ItemsSelect(9, 9, 'Wizard', false, true, true, []);

    let ch3_1 = new ItemsSelect(10, 10, 'Coach', false, true, true, []);
    let ch3_2 = new ItemsSelect(11, 11, 'Rochelle', false, true, true, []);
    let ch3_3 = new ItemsSelect(12, 12, 'Nick', false, true, true, []);
    let ch3_4 = new ItemsSelect(13, 13, 'Ellis', false, true, true, []);

    let ch4_1 = new ItemsSelect(14, 14, 'Alex Mason', false, true, true, []);
    let ch4_2 = new ItemsSelect(15, 15, 'Frank Woods', false, true, true, []);

    //var pf_Destiny = 'XB1, XBox, PS4, PS3';
    this.multipleSelect_Destiny_Pf.items = [pf1_1,pf1_2,pf1_3,pf1_4];
    this.multipleSelect_Destiny_Pf.numberItemsDisplay = 3;
    this.multipleSelect_Destiny_Pf.checkAllCheckBoxText = 'Check All';
    this.multipleSelect_Destiny_Pf.maxWidth = '500px';
    this.multipleSelect_Destiny_Pf.allItemsCheckedText = this.gamesService.getGameById(1).platform;

    this.multipleSelect_Diablo_Pf.items = [pf2_1,pf2_2,pf2_3,pf2_4];
    this.multipleSelect_Diablo_Pf.numberItemsDisplay = 4;
    this.multipleSelect_Diablo_Pf.checkAllCheckBoxText = 'Check All';
    this.multipleSelect_Diablo_Pf.maxWidth = '500px';
    this.multipleSelect_Diablo_Pf.allItemsCheckedText = this.gamesService.getGameById(2).platform;
    //var pf_Left = 'XBox, PC';
    this.multipleSelect_Left_Pf.items = [pf3_2,pf3_5];
    this.multipleSelect_Left_Pf.numberItemsDisplay = 3;
    this.multipleSelect_Left_Pf.checkAllCheckBoxText = 'Check All';
    this.multipleSelect_Left_Pf.maxWidth = '500px';
    this.multipleSelect_Left_Pf.allItemsCheckedText = this.gamesService.getGameById(3).platform;
    //var pf_all = 'XB1, XBox, PS4, PS3, PC';
    this.multipleSelect_CoD_Pf.items = [pf4_1,pf4_2,pf4_3,pf4_4,pf4_5];
    this.multipleSelect_CoD_Pf.numberItemsDisplay = 2;
    this.multipleSelect_CoD_Pf.checkAllCheckBoxText = 'Check All';
    this.multipleSelect_CoD_Pf.maxWidth = '500px';
    this.multipleSelect_CoD_Pf.allItemsCheckedText = this.gamesService.getGameById(4).platform;

    this.multipleSelect_Mic.items = [mic1,mic2,mic3,mic4,mic5];
    this.multipleSelect_Mic.numberItemsDisplay = 5;
    this.multipleSelect_Mic.checkAllCheckBoxText = 'Check All';
    this.multipleSelect_Mic.maxWidth = '500px';
    this.multipleSelect_Mic.showHeader = false;
    this.multipleSelect_Mic.allItemsCheckedText = this.gamesService.getGameById(4).platform;
    var style_all = 'Casual, Serious, Zealous, Any';
    this.multipleSelect_Destiny.items = [style1_1,style1_2,style1_3, style1_4];
    this.multipleSelect_Destiny.numberItemsDisplay = 3;
    this.multipleSelect_Destiny.checkAllCheckBoxText = 'Check All';
    this.multipleSelect_Destiny.maxWidth = '500px';
    this.multipleSelect_Destiny.showHeader = false;// Default: true
    this.multipleSelect_Destiny.allItemsCheckedText = style_all;

    this.multipleSelect_Diablo.items = [style2_1,style2_2,style2_3, style2_4];
    this.multipleSelect_Diablo.numberItemsDisplay = 3;
    this.multipleSelect_Diablo.checkAllCheckBoxText = 'Check All';
    this.multipleSelect_Diablo.maxWidth = '500px';
    this.multipleSelect_Diablo.showHeader = false;// Default: true
    this.multipleSelect_Diablo.allItemsCheckedText = style_all;

    this.multipleSelect_Left.items = [style3_1,style3_2,style3_3, style3_4];
    this.multipleSelect_Left.numberItemsDisplay = 3;
    this.multipleSelect_Left.checkAllCheckBoxText = 'Check All';
    this.multipleSelect_Left.maxWidth = '500px';
    this.multipleSelect_Left.showHeader = false;// Default: true
    this.multipleSelect_Left.allItemsCheckedText = style_all;

    this.multipleSelect_CoD.items = [style4_1,style4_2,style4_3, style4_4];
    this.multipleSelect_CoD.numberItemsDisplay = 3;
    this.multipleSelect_CoD.checkAllCheckBoxText = 'Check All';
    this.multipleSelect_CoD.maxWidth = '500px';
    this.multipleSelect_CoD.showHeader = false;// Default: true
    this.multipleSelect_CoD.allItemsCheckedText = style_all;

    this.multipleSelect_Destiny_Ch.items = [ch1_1,ch1_2,ch1_3];
    this.multipleSelect_Destiny_Ch.numberItemsDisplay = 3;
    this.multipleSelect_Destiny_Ch.checkAllCheckBoxText = 'Check All';
    this.multipleSelect_Destiny_Ch.maxWidth = '500px';
    this.multipleSelect_Destiny_Ch.showHeader = false;// Default: true
    this.multipleSelect_Destiny_Ch.allItemsCheckedText = this.gamesService.getGameById(1).character;

    this.multipleSelect_Diablo_Ch.items = [ch2_1,ch2_2,ch2_3,ch2_4,ch2_5,ch2_6];
    this.multipleSelect_Diablo_Ch.numberItemsDisplay = 6;
    this.multipleSelect_Diablo_Ch.checkAllCheckBoxText = 'Check All';
    this.multipleSelect_Diablo_Ch.maxWidth = '500px';
    this.multipleSelect_Diablo_Ch.showHeader = false;// Default: true
    this.multipleSelect_Diablo_Ch.allItemsCheckedText = this.gamesService.getGameById(2).character;

    this.multipleSelect_Left_Ch.items = [ch3_1,ch3_2,ch3_3, ch3_4];
    this.multipleSelect_Left_Ch.numberItemsDisplay = 3;
    this.multipleSelect_Left_Ch.checkAllCheckBoxText = 'Check All';
    this.multipleSelect_Left_Ch.maxWidth = '500px';
    this.multipleSelect_Left_Ch.showHeader = false;// Default: true
    this.multipleSelect_Left_Ch.allItemsCheckedText = this.gamesService.getGameById(3).character;

    this.multipleSelect_CoD_Ch.items = [ch4_1,ch4_2 ];
    this.multipleSelect_CoD_Ch.numberItemsDisplay = 2;
    this.multipleSelect_CoD_Ch.checkAllCheckBoxText = 'Check All';
    this.multipleSelect_CoD_Ch.maxWidth = '500px';
    this.multipleSelect_CoD_Ch.showHeader = false;// Default: true
    this.multipleSelect_CoD_Ch.allItemsCheckedText = this.gamesService.getGameById(4).character;

  }

  upload(event){
    var file = event.srcElement.files;
    var image = file[0];


    if(image.size/1024 > 500 )
    {
      alert('Please upload image less than 500KB. This file is: ' + image.size/1024 + "KB");
      this.alertService.error('Image too large. Please upload less than 500KB.');
      this.model.fileInput = '';
      return
    }
    // get image width and height
    /*var img = new Image();
    img.addEventListener('load', (e) => this.handleImageLoad(e));*/

    //console.log("###@@@@ CreateProfile: UPLOAD(), image=",image);
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
    //console.log("### createProfile: create(), multipleSelect_Mic:", this.multipleSelect_Mic.getValueItems());
    //console.log("### createProfile: create(), multipleSelect_Destiny_Pf:", this.multipleSelect_Destiny_Pf.getItemsDisplay());
    this.loading = true;

    this.model.voice = this.multipleSelect_Mic.getItemsDisplay();

    var dest_pf = this.multipleSelect_Destiny_Pf.getItemsDisplay();
    var diab_pf = this.multipleSelect_Diablo_Pf.getItemsDisplay();
    var left_pf = this.multipleSelect_Left_Pf.getItemsDisplay();
    var cod_pf = this.multipleSelect_CoD_Pf.getItemsDisplay();
    this.interested_games_pf.push(dest_pf,diab_pf,left_pf,cod_pf);
    this.model.interested_games = this.interested_games_pf;

    var style_dest = this.multipleSelect_Destiny.getItemsDisplay();
    var style_diab = this.multipleSelect_Diablo.getItemsDisplay();
    var style_left = this.multipleSelect_Left.getItemsDisplay();
    var style_cod = this.multipleSelect_CoD.getItemsDisplay();
    this.playstyles.push(style_dest, style_diab, style_left, style_cod);
    this.model.playstyles = this.playstyles;

    var charac_dest = this.multipleSelect_Destiny_Ch.getItemsDisplay();
    var charac_diab = this.multipleSelect_Diablo_Ch.getItemsDisplay();
    var charac_left = this.multipleSelect_Left_Ch.getItemsDisplay();
    var charac_cod = this.multipleSelect_CoD_Ch.getItemsDisplay();
    this.characters.push(charac_dest,charac_diab,charac_left,charac_cod);
    this.model.characters = this.characters;

    //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //this.model.myid = currentUser._id;
    //this.model.email = currentUser.email;
    //this.model.password = currentUser.password;
    this.model.username = this.afService.displayName;
    this.model.image = this.image;
    //this.model.image = this.data.image;

    console.log("### createProfile: create(), this.model:", this.model);
    console.log("### createProfile: create(), image:", this.model.image);

    //localStorage.setItem('currentUser', JSON.stringify(this.model));

    // call service.update() to update the existing profile
    //this.profilesService.update(this.model)
    this.profilesService.create(this.model)
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
