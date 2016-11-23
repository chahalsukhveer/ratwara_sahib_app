import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

import {YoutubeService} from '../../providers/youtube-service/youtube-service';
import { GlobalVariable } from '../../globals';


@Component({
  templateUrl: 'videos.html',
  providers:[YoutubeService]
})
export class VideosPage {
  channelID: string = 'UC9-Wp2ANvH0aQBSGw8Zykng';
  maxResults: string = '10';
  pageToken: string;
  googleToken: string = GlobalVariable.API_KEY_ANDROID;
  searchQuery: string = '';
  posts: any = [];
  onPlaying: boolean = false;
  eventType: string ='completed';
  videoSyndicated:boolean=true;

  constructor(public http: Http, public nav:NavController, public ytPlayer: YoutubeService) {
    console.log("constructor for youtube videos.ts")  ;
    //ytPlayer.setupPlayer('placeholder');
    this.loadSettings();
  }

  launchYTPlayer(id, title): void {
    this.ytPlayer.launchPlayer(id, title);
  }

  fetchData(): void {

    let url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=' + this.channelID +
     '&type=video&order=date&maxResults=' + this.maxResults + '&key=' + this.googleToken+'&eventType='+this.eventType+'&safeSearch=strict';

    if(this.pageToken) {
      url += '&pageToken=' + this.pageToken;
    }

    this.http.get(url).map(res => res.json()).subscribe(data => {

      console.log (data.items);

      this.posts = this.posts.concat(data.items);
    });
  }

  searchVideos(searchTerm): void {
    let term = searchTerm.target.value;

    if (term.trim() != '' || term.trim().length > 1) {
      let url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=' + this.channelID +'&q=' + term + '&type=video&order=viewCount&maxResults=' + this.maxResults + '&key=' + this.googleToken;

      if(this.pageToken) {
        url += '&pageToken=' + this.pageToken;
      }
      this.posts=[];
      this.http.get(url).map(res => res.json()).subscribe(data => {

        console.log (data.items);
        this.posts = this.posts.concat(data.items);
      });
    }
    else{
      this.fetchData();
    }

  }

  updateUrl(event):void{
   var image_url = event.target.src;
      console.log("Exception ",image_url);
      var index =image_url.indexOf('.jpg');
      image_url =image_url.substring(0,index)+"_live.jpg";
      console.log("image url : ",image_url)

    return image_url;
  }

  loadSettings(): void {
      this.fetchData();
  }
  openSettings(): void {
      console.log("TODO: Implement openSettings()");
  }
  playVideo(e, post): void {
      console.log(post);
      this.onPlaying = true;
      this.ytPlayer.launchPlayer(post.id, post.snippet.title);
  }
  loadMore(): void {
      console.log("TODO: Implement loadMore()");
  }
  stopVideo(): void{
    console.log("Call function to stop video");

  }
  ionViewWillLeave() {
   console.log("leaving now video");
   this.ytPlayer.pausePlayer();
 }
}
