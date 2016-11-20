import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AudioListPage} from '../audio-list/audio-list';
import { Http } from '@angular/http';

@Component({
  selector: 'page-music',
  templateUrl: 'music.html'
})
export class MusicPage {
   audios: any;
   folderList:any;
   url:string='https://dl.dropboxusercontent.com/sh/c2t05crfvuyuevw/';
  
   audioListPage=AudioListPage;
  constructor(private navCtrl: NavController,public http: Http) {
  this.http.get(this.url+'AABTp_VdE0rmee6k6pCbAEuMa/folder.json').map(res => res.json()).subscribe(data => {
        this.folderList = data.subfolders;
        console.log("my list new",this.folderList);
    });
  }
showSongList(event){
    console.log('showSongList');
    var target = event.target.id;
    console.log("Clicked now is "+event.target.innerText) ;
    let entries:any;
    let baseUrl:string=this.url+target;

    this.http.get(baseUrl).map(res => res.json()).subscribe(data => {
        entries = data.entries;
        console.log("audioList ",entries);
        this.navCtrl.push(this.audioListPage,{audioList:entries,baseUrl:this.url,title:event.target.innerText});
    });
 }
}
