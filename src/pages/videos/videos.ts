import { Component } from '@angular/core';
import { NavController, Platform, IonicPage } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVariable } from '../../app/globals';
import { Storage } from '@ionic/storage';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';


@IonicPage()
@Component({
  templateUrl: 'videos.html'
})
export class VideosPage {
  channelID: string = 'UC9-Wp2ANvH0aQBSGw8Zykng';
  maxResults: string = '10';
  pageToken: string;
  googleToken: string = GlobalVariable.API_KEY;
  searchQuery: string = '';
  posts: any = [];
  onPlaying: boolean = false;
  eventType: string = 'completed';
  videoSyndicated: boolean = true;
  loader: any;
  no_result:boolean;
  constructor(public http: Http,
              public nav: NavController,
              public ytPlayer: YoutubeVideoPlayer,
              private storage: Storage,
              public platform: Platform ,
              private ga: GoogleAnalytics ) {

    platform.ready().then(() => {
    });

    console.log("constructor for youtube videos.ts");
   // if (!platform.is("android")) {
      this.storage.ready().then(() => {
          var video_items = this.storage.get('videoList');
          if (video_items) {
              video_items.then((val) => {
                  if (val != null) {
                      console.log('retrieved from cache');
                      console.log(val);
                      this.posts = val;
                      this.loadSettings();
                  } else {
                      this.loadSettings();
                  }
              });
          } else {
              this.loadSettings();
          }
      });
   // }
  } 

  ionViewDidEnter() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          this.ga.trackView("Videos Page");
          console.log("Videos Page enter");
    });
  }

  launchYTPlayer(id): void {
    this.ytPlayer.openVideo(id);
  }

  loadSettings(): void {
    this.fetchData();
  }

  fetchData(): void {
    console.log('Fetch data');
    let url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=' + this.channelID +
      '&type=video&order=date&maxResults=' + this.maxResults + '&key=' + this.googleToken + '&safeSearch=strict';

    if (this.pageToken) {
      url += '&pageToken=' + this.pageToken;
    }

    this.http.get(url).map(res => res.json()).subscribe(data => {
      console.log(data.items);
      this.posts = data.items;
      console.log('set new cache');
      this.storage.set('videoList', this.posts);
    });
  }

  searchVideos(searchTerm): void {
    let term = searchTerm.target.value;

    if (term.trim() != '' || term.trim().length > 1) {
      let url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=' + this.channelID + '&q=' + term + '&type=video&order=viewCount&maxResults=' + this.maxResults + '&key=' + this.googleToken;

      if (this.pageToken) {
        url += '&pageToken=' + this.pageToken;
      }
      this.posts = [];
      this.http.get(url).map(res => res.json()).subscribe(data => {

        console.log(data.items);
        this.posts = this.posts.concat(data.items);
      });
    }
    else {
      this.fetchData();
    }

  }

  updateUrl(event): void {
    var image_url = event.target.src;
    console.log("Exception ", image_url);
    var index = image_url.indexOf('.jpg');
    image_url = image_url.substring(0, index) + "_live.jpg";
    console.log("image url : ", image_url)

    return image_url;
  }

  openSettings(): void {
    console.log("TODO: Implement openSettings()");
  }

  playVideo(e, post): void {
    console.log("MY VIDEO IS ",post.id.videoId);
    this.onPlaying = true;
    this.ytPlayer.openVideo(post.id.videoId);
  }

  loadMore(): void {
    console.log("TODO: Implement loadMore()");
  }

  ionViewWillLeave() {
    console.log("leaving now video");
   // this.ytPlayer.pausePlayer();
    //setTimeout(this.ytPlayer.stopVideo(), 6000);
  }
}
