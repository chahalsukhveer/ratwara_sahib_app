import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { defaultLanguage } from '../../app/i18n.constants';
import { Storage } from '@ionic/storage';

@IonicPage( { priority: 'high'} )
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  home: any = "HomePage";
  news: any = "NewsPage";
  videos: any = "VideosPage";
  live: any = "LivePage";
  contact: any = "ContactPage";
  music: any = "MusicPage";
  instagram: any = "InstagramPage";
  showVideos: boolean = true;

  constructor( public platform: Platform,
               private nav: NavController,
               private translate: TranslateService,
               private storage: Storage ){
    platform.ready().then(() => {
        translate.setDefaultLang(defaultLanguage);
        if (platform.is("android")) {
           this.showVideos = false;
        } else {
           this.showVideos = true;
        }
    });
    storage.ready().then(() => {
        var locale_item = storage.get('locale');
        if (locale_item) {
            locale_item.then((val) => {
                if (val != null) {
                    console.log('retrieved from cache');
                    console.log(val);
                    this.translate.use(val);
                } 
            });
        } 
    });
  }
}
