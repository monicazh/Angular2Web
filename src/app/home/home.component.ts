import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../profiles.service';

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

  constructor(private profilesService: ProfilesService) {

  }

  ngOnInit() {
    this.getPlayersCount();
  }

  getPlayersCount(){
    this.profilesService
        .getProfiles()
        .subscribe(profiles => {
          this.playersCount = profiles.length;
        });
  }

}
