import { Pipe, PipeTransform } from '@angular/core';
import { LfgRequest } from './lfg-request';

@Pipe({
  name: 'lfgFilter'
})
export class LfgFilterPipe implements PipeTransform {

  transform(array:LfgRequest[], [platform,game,time]):any{

    //See all Threads
    if(platform == 0 && game == 0 && time == 0){
      return array
    }
    //See selected Units only
    if(platform != 0 && game == 0 && time == 0){
      return array.filter(lfg => {
        return lfg.platform === platform;
      });
    }
    //See selected Units and Tasks
    if (platform != 0 && game != 0 && time == 0){
      return array.filter(lfg => {
        return lfg.platform === platform && lfg.game === game;
      });
    }
    // See selected units, tasks, subtask
    if (platform != 0 && game != 0 && time != 0){
      return array.filter(lfg => {
        return lfg.platform === platform && lfg.game === game && lfg.start_time === time;
      });
    }
  }

}
