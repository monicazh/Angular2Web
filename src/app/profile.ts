export class Profile {
  constructor(
  public username: string,
  public email: string,
  public password: string,
  public playerid1:string,
  public playerid2:string,
  public playerid3:string,
  public playerid4:string,
  public playerid5:string,
  public age:  number,
  public playtime: string,
  public voice: string,
  public interested_games:string[],
  //public interested_diab_pf:string,
  //public interested_left_pf:string,
  //public interested_cod_pf:string,
  public playstyles:string[],
  //public style_dest:string,
  //public style_diab:string,
  //public style_left:string,
  //public style_cod:string,
  public characters:string[],
  //public charac_dest:string,
  //public charac_diab:string,
  //public charac_left:string,
  //public charac_cod:string,
  //public image: string,
  public myid: number,
  ){ }
}
