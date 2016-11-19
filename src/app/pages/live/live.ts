import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
// import { window } from '@angular/platform-browser/src/facade/browser';

import {YoutubeServiceLive} from '../../providers/youtube-service-live/youtube-service-live';


@Component({
  templateUrl: 'live.html',
  providers:[YoutubeServiceLive]
})
export class LivePage {

  channelID: string = 'UC9-Wp2ANvH0aQBSGw8Zykng';
  maxResults: string = '1';
  pageToken: string;
  googleToken: string = '';
  posts: any = [];
  onPlayingLive: boolean = false;
  eventType: string ='live';
  title:string


  constructor(public http: Http, public nav:NavController,public ytPlayer:YoutubeServiceLive) {
    console.log("constructor for youtube videos.ts")  ;
    //ytPlayer.setupPlayer('placeholderlive');

    this.loadSettings();

  }


  launchYTPlayer(id, title): void {
    this.ytPlayer.launchPlayer(id, title);
  }
  fetchData(): void {

    let url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=' + this.channelID + '&type=video&order=viewCount&maxResults=' + this.maxResults + '&key=' + this.googleToken+'&eventType='+this.eventType;

    if(this.pageToken) {
      url += '&pageToken=' + this.pageToken;
    }

    this.http.get(url).map(res => res.json()).subscribe(data => {

      console.log (data.items);
      this.posts = this.posts.concat(data.items);
      if(data.items.length>0){
          this.playVideo(null,this.posts[0]);
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
      this.title=post.snippet.title;
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
