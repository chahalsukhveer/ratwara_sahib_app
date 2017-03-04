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
  audios = [];
  baseUrl: string;
  allTracks: any[];
  selectedTrack: number;
  playing: boolean = false;
  title: string;
  constructor(private navCtrl: NavController, public params: NavParams, private _audioProvider: AudioProvider) {
    let audioList = params.get("audioList");
    this.title = params.get("title");
    audioList.forEach(element => {
      this.audios.push({ src: element.src, title: element.title, preload: 'metadata' })
    });
    // console.log('we got our videos here ', this.audios)
  }

  ionViewWillLeave() {
    // console.log("leaving now");
    this.pauseSelectedTrack();
  }

  ngAfterContentInit() {
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks;
  }

  playSelectedTrack() {
    this._audioProvider.play(this.selectedTrack);
  }

  pauseSelectedTrack(): void {
    // use AudioProvider to control selected track
    this._audioProvider.pause(this.selectedTrack);
  }

  onTrackFinished(track: any) {
    // console.log('Track finished', track)
  }
}