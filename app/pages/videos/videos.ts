import {Component} from '@angular/core';
import {Modal, NavController, Alert} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {YoutubeService} from '../../providers/youtube-service/youtube-service';

@Component({
  templateUrl: 'build/pages/videos/videos.html',
  providers:[YoutubeService]
})
export class VideosPage {
  channelID: string = 'UC9-Wp2ANvH0aQBSGw8Zykng';
  maxResults: string = '2';
  pageToken: string; 
  googleToken: string = 'GOOGLE_API_KEY';
  searchQuery: string = 'October';
  posts: any = [];
  onPlaying: boolean = false; 
  eventType: string ='';

  constructor(public http: Http, public nav:NavController, public ytPlayer: YoutubeService) {
    console.log("constructor for youtube videos.ts")  ;
    this.loadSettings();
  }

  launchYTPlayer(id, title): void {
    this.ytPlayer.launchPlayer(id, title);
  }

  fetchData(): void {

    let url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=' + this.channelID +'&q=' + this.searchQuery + '&type=video&order=viewCount&maxResults=' + this.maxResults + '&key=' + this.googleToken;

    if(this.pageToken) {
      url += '&pageToken=' + this.pageToken;
    }

    this.http.get(url).map(res => res.json()).subscribe(data => {
      
      console.log (data.items);
      this.posts = this.posts.concat(data.items);
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
      this.onPlaying = true;
      this.ytPlayer.launchPlayer(post.id, post.snippet.title);
  }
  loadMore(): void {
      console.log("TODO: Implement loadMore()");
  }
}
