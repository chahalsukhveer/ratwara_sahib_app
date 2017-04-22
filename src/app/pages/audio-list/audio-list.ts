import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AudioProvider } from '../../ionic-audio';

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

  constructor(private navCtrl: NavController, 
              public params: NavParams,
              private _audioProvider: AudioProvider,
              public platform: Platform ) {
    platform.ready().then(() => {
    });

    let audioList = params.get("audioList");
    this.title = params.get("title");
    audioList.forEach(element => {
      this.audios.push({ src: element.src, title: element.title, preload: 'metadata' })
    });
  }

  ionViewWillLeave() {
    this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        if ( this.platform.is('android') ) {
          this.pauseSelectedTrack();
        }
    });
    console.log("leaving now");
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