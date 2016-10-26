import {Component} from '@angular/core';
import {YoutubeService} from '../../providers/youtube-service/youtube-service';


@Component({
  selector: 'player-page',
  templateUrl: 'build/pages/player/player.html',
  providers:[YoutubeService]
})
export class PlayerPage {

      constructor(public ytPlayer:YoutubeService) {}

}