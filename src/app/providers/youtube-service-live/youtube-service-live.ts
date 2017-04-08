import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { WindowRef } from '../../providers/window-ref';

/*
  Generated class for the YoutubeServiceLive provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class YoutubeServiceLive {
  youtubelive: any = {
    ready: false,
    player: null,
    playerId: null,
    videoId: null,
    videoTitle: null,
    playerHeight: '100%',
    playerWidth: '100%',
    playerReady: false
  }

  window: any;

  constructor( private http: Http, private winRef: WindowRef) {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    this.window = winRef.nativeWindow;
    this.window.YT = undefined;
    this.setupPlayer();
  }

  bindPlayer(elementIdLive): void {
    this.youtubelive.playerId = elementIdLive;
  };

  createPlayer(): void {
    console.log("create player now")

    if (this.youtubelive.ready && this.youtubelive.playerId) {
      if (this.youtubelive.player) {
        this.youtubelive.player.destroy();
      }
      this.youtubelive.player = new this.window.YT.Player(this.youtubelive.playerId, {
        height: this.youtubelive.playerHeight,
        width: this.youtubelive.playerWidth,
        playerVars: {
          rel: 0,
          showinfo: 0
        },
        events: {
          'onReady': () => this.onPlayerReady(this)
        }
      });
    }
  }

  onPlayerReady(obj: YoutubeServiceLive): void {
    console.log("player ready evt");
    this.youtubelive.playerReady = true;
    if (obj.youtubelive.videoId) {
      obj.launchPlayer(obj.youtubelive.videoId, obj.youtubelive.videoTitle);

    }
  }

  setupPlayer() {
    // in production mode, the youtube iframe api script tag is loaded
    // before the bundle.js, so the 'onYouTubeIfarmeAPIReady' has
    // already been triggered
    // TODO: handle this in build or in nicer in code
    console.log("Running Setup Player");
    window['onYouTubeIframeAPIReady'] = () => {
      if (window['YT']) {
        console.log('Youtube API is ready 123');
        this.youtubelive.ready = true;
        this.bindPlayer('placeholderlive');
        this.createPlayer();
      }
    };
    if (this.window.YT && this.window.YT.Player) {
      console.log('Youtube API is ready 456');
      this.youtubelive.ready = true;
      this.bindPlayer('placeholderlive');
      this.createPlayer();
    }
  }

  postValue(id, title): void {
    this.youtubelive.videoId = id;
    this.youtubelive.videoTitle = title;
    if (this.youtubelive.playerReady) {
      this.launchPlayer(id, title);
    }
  }

  public launchPlayer = (id, title) => {
    this.youtubelive.player.loadVideoById(id);
    return this.youtubelive;
  }
}

