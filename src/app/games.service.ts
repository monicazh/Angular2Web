import { Injectable } from '@angular/core';
import { Game } from './game';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

const GAMES: Game[] = [
  {id:1, name: 'Destiny', platform:'XB1 | XBox | PS4 | PS3', character:'Hunter | Warlock | Titan', intro:'Destiny is an online-only multiplayer first-person shooter video game developed by Bungie and published by Activision. Destiny marked Bungie first new console franchise since the Halo series, and it is the first game in a ten-year agreement between Bungie and Activision. Set in a "mythic science fiction" world, the game features a multiplayer "shared-world" environment with elements of role-playing games.'},
  {id:2, name: 'Diablo 3', platform:'XB1 | XBox | PS4 | PS3', character:'Barbarian | Crusader | Demon Hunter | Monk | Witch Doctor | Wizard', intro:'Diablo III is the third installment in the Diablo franchise for Microsoft Windows and macOS. In the game, players choose one of six character classes – Barbarian, Crusader, Demon Hunter, Monk, Witch Doctor or Wizard (with the Crusader being unavailable unless the player has purchased the expansion pack, Diablo III: Reaper of Souls) – and are tasked with defeating the Lord of Terror, Diablo.'},
  {id:3, name: 'Left 4 Dead 2', platform:'XBox | PC', character:'Coach | Rochelle | Nick | Ellis', intro:'Set in the zombie apocalypse, Left 4 Dead2 is the highly anticipated sequel to the award-winning Left 4 Dead, the #1 co-op game of 2008.This co-operative action horror FPS takes you and your friends through the cities, swamps and cemeteries of the Deep South, from Savannah to New Orleans across five expansive campaigns.'},
  {id:4, name: 'CoD - Black Ops II', platform:'XB1 | XBox | PS4 | PS3 | PC', character:'Alex Mason | Frank Woods', intro:'Call of Duty: Black Ops II is a first-person shooter video game, developed by Treyarch and published by Activision. Black Ops II is the ninth game in the Call of Duty franchise of video games, a sequel to the 2010 game Call of Duty: Black Ops and the first Call of Duty game for the Wii U. The game was launched at 16,000 stores worldwide at midnight on November 13, 2012.'}
];

@Injectable()
export class GamesService {

  constructor(private http: Http) { }

  getAllGames(): Game[] {
    //return GAMES.map(g => this.clone(g))
    return GAMES;
  }

  getGameByName(name: string) : Game {
    return this.clone(GAMES.find(game => game.name === name));
  }

  getGameById(id: number) : Game {
    return this.clone(GAMES.find(game => game.id === id));
  }

  private clone(object: any){
    // hack
    return JSON.parse(JSON.stringify(object));
  }

}
