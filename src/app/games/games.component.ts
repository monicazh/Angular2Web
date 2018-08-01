import { Component, OnInit } from '@angular/core';
import { Game } from '../game'
import { GamesService } from '../games.service';
import { Profile } from '../profile';
import { ProfilesService } from '../profiles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  interestedPlayersCount = [0,0,0,0];

  constructor(
    private gamesService: GamesService,
    private profilesService: ProfilesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.games = this.gamesService.getAllGames();
    this.getInterestedPlayersCount(1);
    this.getInterestedPlayersCount(2);
    this.getInterestedPlayersCount(3);
    this.getInterestedPlayersCount(4);
  }

  // gameId = 1-4
  getInterestedPlayersCount(gameId:number) {
    this.profilesService
      .getProfiles()
      .subscribe(profiles => {
        let interestedPlayers = profiles.filter(profile => {
          return profile.interested_games[gameId-1] !== "None Selected";
        });
        this.interestedPlayersCount[gameId-1] = interestedPlayers.length;
        //this.interestedPlayerCount = profiles.length;
      });
  }
}
