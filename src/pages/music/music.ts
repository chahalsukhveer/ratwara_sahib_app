import { Component } from '@angular/core';
import { NavController, Platform, IonicPage } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { GoogleAnalytics } from 'ionic-native';

export class AudioKey {
  src: string;
  title: string;
  key: string;
  constructor(_src: string, _title: string, _key: string) {
     // assign local variables to class members
     this.src = _src;
     this.title = _title;
     this.key = _key;
  }
}

@IonicPage()
@Component({
  selector: 'page-music',
  templateUrl: 'music.html'
})
export class MusicPage {
  audios: any;
  awdioUrl: string = 'https://query.yahooapis.com/v1/public/yql?q=select%20title%2Cenclosure%2Citunes:keywords%20from%20rss%20where%20url%3D%22https%3A%2F%2Fwww.awdio.com%2Fapi%2Fservices%2Fv1%2Fchannel%2F101301%2Ffeed%2Frss_2.0%22&format=json';
  awdioDataList: any;
  dropBoxUrl: string;
  dropBoxDataList: any;
  audioMap: AudioKey[] = [];
  radioMap = [];
  folderList = [];

  // audioListPage = AudioListPage;

  constructor(private navCtrl: NavController,
              public http: Http,
              private storage: Storage, 
              public platform: Platform ) {

    platform.ready().then(() => {
    });

    this.storage.ready().then(() => {

      console.log('storage is ready ');
      var folderKey = this.storage.get('folderList');
      var audioKey = this.storage.get('audioList');
      var audioRefreshKey = this.storage.get('audioRefresh');

      if ( audioRefreshKey ) {
        audioRefreshKey.then((val) => {
          if ( val != null) {
            console.log('found audioRefreshKey in storage ' + val);
            var compareDate = new Date(new Date().getTime() - 14*24*60*60000).toISOString().substring(0, 10);
            console.log( val + ' > ' + compareDate);
            if ( val < compareDate || val.indexOf("\/2017,") >= 0 ) {
               console.log('cache is too old, need a refresh');
               var displayDate = new Date().toISOString().substring(0, 10);
               console.log('set new refresh time '+ displayDate);
               this.storage.set('audioRefresh', displayDate);
               this.storage.remove('audioList');
               this.storage.remove('folderList');
               this.audioMap = [];
               this.folderList = [];
               this.retrieveDropBox();
               this.retrieveAwdio();
            } else {
                if ( folderKey ) {
                  folderKey.then((val) => {
                    if ( val != null) {
                      console.log('found folderList key in storage ' + val);      
                      this.folderList = val;
                    }
                    if ( audioKey ) {
                      audioKey.then((val2) => {
                        if ( val2 != null) {
                          console.log('found audioMap key in storage');      
                          this.audioMap = val2;
                        }
                        // we checked folder and audio cache
                        this.retrieveDropBox();
                        this.retrieveAwdio();
                      })
                    } else {
                      // no audioKey found, so just refresh
                      this.retrieveDropBox();
                      this.retrieveAwdio();
                    }  
                  })
                } else {
                    // no folderKey found, so just refresh
                    this.retrieveDropBox();
                    this.retrieveAwdio();
                }
            }
          } else {
            // no refresh time found, just set new time and do refresh 
            var displayDate = new Date().toISOString().substring(0, 10);
            console.log('set refresh time '+ displayDate);
            this.storage.set('audioRefresh',displayDate);
            this.retrieveDropBox();
            this.retrieveAwdio();
          }  
        });   
      }
    });    

    this.radioMap= [{
      src: 'http://s8.myradiostream.com/15656/listen.mp3',
      title: 'Radio'
    }]
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          GoogleAnalytics.trackView("Music Page");
    });
  }

  retrieveAwdio(){
    // console.log("my awdio list new", this.awdioDataList);
    this.http.get(this.awdioUrl).map(res => res.json()).subscribe(data => {
      this.awdioDataList = data.query.results;
      for (let item2 of this.awdioDataList.item) {
        // console.log(item);
        if (item2.keywords == null) {
          var key = 'Not Categorized';
          this.storeEntry(item2.enclosure.url, item2.title, key )
          this.storeKey(key);
        }
        else {
          var fields = item2.keywords.split(',');
          for (let key of fields) {
            this.storeEntry(item2.enclosure.url, item2.title, key.trim() )
            this.storeKey(key.trim());
          }
        }
      }
    });      
  }

  retrieveDropBox() {
    this.http.get('assets/data/dropbox.json').map(res => res.json()).subscribe(data => {
      this.dropBoxDataList = data;
      // console.log("my dropBox list new", this.dropBoxDataList);
      this.dropBoxUrl = this.dropBoxDataList.main;
      for (let item of this.dropBoxDataList.subfolders) {
        // console.log(item);
        for (let entry of item.entries) {
          this.storeEntry(this.dropBoxUrl + entry.file, entry.name, item.description.trim())
          this.storeKey(item.description.trim());
        }
      }
    });
  }

  storeEntry(url, title, key ) {
      var entry = new AudioKey( url, title, key );
      var found = false;
      for (let existingEntry of this.audioMap) {
         if (( entry.key == existingEntry.key ) &&  ( entry.src == existingEntry.src ))  {
           found = true;
         }
      }  
      if (found == false) {
        // console.log('update new audioMap key ' + title)
        this.audioMap.push(entry);
        this.storage.set('audioList', this.audioMap);
      }
  }

  storeKey(key) {
    console.log('check for key ' + key + ' in folderList')
    if (this.folderList.indexOf(key) == -1) {
      console.log('update new folderList key ' + key + ' in storage')
      this.folderList.push(key);
      this.storage.set('folderList', this.folderList);
    }
  }

  showSongList(event) {
    console.log("Clicked now is " + event);
    let entries = this.audioMap.filter(
      audio => audio.key === event
    );
    this.navCtrl.push("AudioListPage", { audioList: entries, title: event });
  }

  showSongCounter(event) {
    console.log("Clicked now is " + event);
    let entries = this.audioMap.filter(
      audio => audio.key === event
    );
    return entries.length;
  }
}
