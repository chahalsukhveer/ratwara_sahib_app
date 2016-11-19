import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AudioProvider } from '../../ionic-audio/ionic-audio.module';

/*
  Generated class for the AudioListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-audio-list',
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
  constructor(private navCtrl: NavController, public params: NavParams, private _audioProvider: AudioProvider) {
    this.audios = params.get("audioList");
    this.listId = params.get("listId");
  }

  ionViewWillLeave() {
    console.log("leaving now");
   this.pauseSelectedTrack();
  }


    ngAfterContentInit() {
      // get all tracks managed by AudioProvider so we can control playback via the API
      this.allTracks = this._audioProvider.tracks;
    }

    playSelectedTrack() {
      this._audioProvider.play(this.selectedTrack);
    }

   pauseSelectedTrack():void {
       // use AudioProvider to control selected track
       this._audioProvider.pause(this.selectedTrack);
    }

  onTrackFinished(track: any) {
    console.log('Track finished', track)

  }

}