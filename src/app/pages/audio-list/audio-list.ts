import { AudioTrackComponent, AudioTrackPlayComponent, AudioTrackProgressComponent, AudioTrackProgressBarComponent, AudioTimePipe, AudioProvider } from 'ionic-audio/dist/ionic-audio';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';
var media: any;
var player = {
  key: '' // Holds a last active track,
}

/*
  Generated class for the AudioListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'audio-list.html'

})
export class AudioListPage {
  santWaryamSinghJi: any[];
  babaji: any[];
  audios: any[];
  listId: string;
  allTracks: any[];
  selectedTrack: number;
  playing: boolean = false;
  constructor(private navCtrl: NavController, public params: NavParams) {
    this.audios = params.get("audioList");
    this.listId = params.get("listId");
  }
  play(src, id): void {
    console.log("play called");
    if (media != undefined) {
      console.log("stop me");
      media.stop();
    }
    media = new MediaPlugin(src);
    player.key = id;
    media.play();
  }

  stop(src, id): void {
    media.stop();
  }
  ionViewWillLeave() {
    console.log("leaving now");
    if (media != undefined) {
      console.log("stop me");
      media.stop();
    }
  }
  toggle(audio) {
    if (audio.isPlaying) {
      media.stop();
    } else {
      this.play(audio.src, audio.id);
      audio.isPlaying = true;
    }
  }

  //   ngAfterContentInit() {
  //     // get all tracks managed by AudioProvider so we can control playback via the API
  //     this.allTracks = this._audioProvider.tracks;
  //   }

  //   playSelectedTrack() {
  //     this._audioProvider.play(this.selectedTrack);
  //   }

  //  pauseSelectedTrack():void {
  //      // use AudioProvider to control selected track
  //      this._audioProvider.pause(this.selectedTrack);
  //   }

  onTrackFinished(track: any) {
    console.log('Track finished', track)

  }




}
