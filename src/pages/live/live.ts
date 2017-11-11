import { Component } from '@angular/core';
import { NavController, Platform, IonicPage  } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVariable } from '../../app/globals';
import { YoutubeServiceLive } from '../../app/providers/youtube-service-live/youtube-service-live';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
              public ytPlayer: YoutubeServiceLive, 
              public platform: Platform,
              private iab: InAppBrowser,
              private ga: GoogleAnalytics ) {
    platform.ready().then(() => {
    });
  
    console.log("constructor for youtube videos.ts");

    this.http.get('assets/data/magazines.json').map(res => res.json()).subscribe(data => {
      this.issuesCloud = data.magazines;
      console.log("my list ", this.issuesCloud);
    });

    this.loadSettings();
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          this.ga.trackView("Live Page");
          console.log("Live Page enter");
    });
  }

  openPDF(url): void {
    console.log(url);
    this.platform.ready().then(() => {
      if ( this.platform.is('android') ) { 
        var options = { 
                headerColor:"#000000",
                showScroll:true, 
                swipeHorizontal:false 
              };
        AndroidNativePdfViewer.openPdfUrl(url, 'magazine', options,
                function(success){
                  console.log(url)
                }, function(error){
                  console.log("It didn't work!")
                });
      } else {
        let browser = this.iab.create(url, "_system", "location=true");
      }
    });
  }

  launchYTPlayer(id, title): void {
    this.ytPlayer.launchPlayer(id, title);
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
        this.playVideo(null, this.posts[0]);
      }
    });
  }
  loadSettings(): void {
    this.fetchData();
  }
  openSettings(): void {
    console.log("TODO: Implement openSettings()");
  }
  playVideo(e, post): void {
    console.log(post);
    this.onPlayingLive = true;
    this.title = post.snippet.title;
    this.ytPlayer.postValue(post.id, post.snippet.title);
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