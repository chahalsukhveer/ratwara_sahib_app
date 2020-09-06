import { Component } from '@angular/core';
import { NavController, Platform, IonicPage  } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVariable } from '../../app/globals';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';


declare var AndroidNativePdfViewer: any;

@IonicPage()
@Component({
  templateUrl: 'live.html'
})
export class LivePage {

  channelID: string = 'UC9-Wp2ANvH0aQBSGw8Zykng';
  maxResults: string = '1';
  pageToken: string;
  googleToken: string = GlobalVariable.API_KEY;
  posts: any = [];
  onPlayingLive: boolean = false;
  eventType: string = 'live';
  title: string
  issuesCloud: any;

  constructor(public http: Http, 
              public nav: NavController, 
              public ytPlayer: YoutubeVideoPlayer, 
              public platform: Platform,
              private iab: InAppBrowser,
              private ga: GoogleAnalytics ) {
    platform.ready().then(() => {
    });
  
    console.log("constructor for youtube videos.ts");
      this.loadSettings();
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          this.ga.trackView("Live Page");
          console.log("Live Page enter");
    });
  }

  launchYTPlayer(id): void {
    this.ytPlayer.openVideo(id);
  }
  fetchData(): void {
    let url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=' + this.channelID + '&type=video&order=viewCount&maxResults=' + this.maxResults + '&key=' + this.googleToken + '&eventType=' + this.eventType;

    if (this.pageToken) {
      url += '&pageToken=' + this.pageToken;
    }
    this.http.get(url).map(res => res.json()).subscribe(data => {
      console.log(data.items);
      this.posts = this.posts.concat(data.items);
      if (data.items.length > 0) {
        this.playVideo(this.posts[0]);
      }
    });
  }
  loadSettings(): void {
    this.fetchData();
  }
  openSettings(): void {
    console.log("TODO: Implement openSettings()");
  }
  playVideo(post): void {
    console.log("MY VIDEO IS ",post.id.videoId);
    this.onPlayingLive = true;
    this.title = post.snippet.title;
    this.ytPlayer.openVideo(post.id.videoId);
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.fetchData();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}