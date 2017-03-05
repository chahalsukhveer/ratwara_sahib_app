import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AudioListPage } from '../audio-list/audio-list';
import { Http } from '@angular/http';
import { AudioProvider } from '../../ionic-audio/ionic-audio.module';


@Component({
  selector: 'page-music',
  templateUrl: 'music.html'
})
export class MusicPage {
  audios: any;
  folderList = [];
  awdioUrl: string = 'https://query.yahooapis.com/v1/public/yql?q=select%20title%2Cenclosure%2Citunes:keywords%20from%20rss%20where%20url%3D%22https%3A%2F%2Fwww.awdio.com%2Fapi%2Fservices%2Fv1%2Fchannel%2F101301%2Ffeed%2Frss_2.0%22&format=json';
  awdioDataList: any;
  audioMap = [];
  radioMap =[];

  audioListPage = AudioListPage;
  constructor(private navCtrl: NavController, public http: Http) {
    this.http.get(this.awdioUrl).map(res => res.json()).subscribe(data => {
      this.awdioDataList = data.query.results;
      console.log("my awdio list new", this.awdioDataList);
      for (let item of this.awdioDataList.item) {
        // console.log(item);
        if (item.keywords == null) {
          this.audioMap.push({ src: item.enclosure.url, title: item.title, key: 'Others' });
          if (this.folderList.indexOf('Others') == -1) {
            this.folderList.push('Others');
          }
        }
        else {
          var fields = item.keywords.split(',');
          for (let key of fields) {
            this.audioMap.push({ src: item.enclosure.url, title: item.title, key: key.trim() });
            if (this.folderList.indexOf(key.trim()) == -1) {
              this.folderList.push(key.trim());
            }
          }
        }
      }
    });

    this.radioMap= [{
      src: 'http://s8.myradiostream.com/15656/listen.mp3',
      title: 'Radio'
    }]
  }
  showSongList(event) {
    // console.log('showSongList');
    // console.log("Clicked now is " + event.target.innerText);
    let entries = this.audioMap.filter(
      audio => audio.key === event.target.innerText
    );
    this.navCtrl.push(this.audioListPage, { audioList: entries, title: event.target.innerText });
  }
}
