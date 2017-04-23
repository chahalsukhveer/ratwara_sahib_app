import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NewsPage } from '../news/news';
import { VideosPage } from '../videos/videos';
import { LivePage } from '../live/live';
import { ContactPage } from '../contact/contact';
import { MusicPage } from '../music/music';
// import { TranslateService } from '@ngx-translate/core';
// import { defaultLanguage } from '../../app/i18n.constants';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  home: any = HomePage;
  news: any = NewsPage;
  videos: any = VideosPage;
  live: any = LivePage;
  contact: any = ContactPage;
  music: any = MusicPage;

  constructor( platform: Platform,
              //  translate: TranslateService,
               private nav: NavController ){
    platform.ready().then(() => {
      // translate.setDefaultLang(defaultLanguage);
    });
  }
}
