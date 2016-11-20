import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AudioListPage} from '../audio-list/audio-list';


@Component({
  selector: 'page-music',
  templateUrl: 'music.html'
})
export class MusicPage {
   audios: any;
   audioListPage=AudioListPage;
  constructor(private navCtrl: NavController) {
    this.audios=[{
      santWaryamSinghJi : [{
      src: 'http://www.ratwarasahib.in/Audios/BabaWaryamSinghJi/0357-Sangrad%20Katak.mp3',
      artist: 'Sant Waryam Singh Ji',
      title: 'Sangrad Katak',
      preload: 'metadata' ,
      id:1,
      isPlaying:false
    },
    {
      src: 'http://www.ratwarasahib.in/Audios/BabaWaryamSinghJi/0361-Payee%20Prapat%20Manukh.mp3',
      artist: 'Sant Waryam Singh Ji',
      title: 'Payee Prapat Manukh',
      preload: 'metadata' ,
      id:2,
      isPlaying:false
    },
    {
      src: 'http://www.ratwarasahib.in/Audios/BabaWaryamSinghJi/0371-Bhoomia%20Nu%20Updesh.mp3',
      artist: 'Sant Waryam Singh Ji',
      title: 'Bhoomia Nu Updesh',
      preload: 'metadata' ,
      id:3,
      isPlaying:false
    },
    {
      src: 'http://www.ratwarasahib.in/Audios/BabaWaryamSinghJi/F0319%20Bhagat%20Droo%20Ji.mp3',
      artist: 'Sant Waryam Singh Ji',
      title: 'Bhagat Droo Ji',
      preload: 'metadata' ,
      id:4,
      isPlaying:false
    },
    {
      src: 'http://www.ratwarasahib.in/Audios/BabaWaryamSinghJi/F0384%20Naam%20Kee%20Hai.mp3',
      artist: 'Sant Waryam Singh Ji',
      title: 'Naam Kee Hai',
      preload: 'metadata' ,
      id:5,
      isPlaying:false
    }],
     babaji: [{
      src: 'http://www.ratwarasahib.in/Audios/BabaJi/Aap%20Narayan%20KalaDhaar1.mp3',
      artist: 'Babaji',
      title: 'Aap Narayan Kala Dhaar part 1',
      preload: 'metadata',
      id:1
    },
    {
      src: 'http://www.ratwarasahib.in/Audios/BabaJi/Aap%20Narayan%20Kaladhar%202.mp3',
      artist: 'Babaji',
      title: 'Aap Narayan Kala Dhaar part 2',
      preload: 'metadata',
      id:2
    },
     {
      src: 'http://www.ratwarasahib.in/Audios/BabaJi/Bhagat%20Ravidas%20Ji.mp3',
      artist: 'Babaji',
      title: 'Bhagat Ravidas Ji',
      preload: 'metadata',
      id:3
    },
     {
      src: 'http://www.ratwarasahib.in/Audios/BabaJi/Ram%20Japo%20Ji%20-%20I.mp3',
      artist: 'Babaji',
      title: 'Ram Japo Ji part 1',
      preload: 'metadata',
      id:4
    },
     {
      src: 'http://www.ratwarasahib.in/Audios/BabaJi/Ram%20Japo%20Ji%20-%20II.mp3',
      artist: 'Babaji',
      title: 'Ram Japo Ji part 2',
      preload: 'metadata',
      id:5
    }]
    }];
  }
showSongList(event){
    console.log('showSongList');
    var target = event.target.id;
    console.log("Clicked now is "+target) ;
    this.navCtrl.push(this.audioListPage,{audioList:this.audios,listId:target});
 }
}
