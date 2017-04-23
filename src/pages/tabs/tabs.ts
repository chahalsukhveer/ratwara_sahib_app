import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NewsPage } from '../news/news';
import { VideosPage } from '../videos/videos';
import { LivePage } from '../live/live';
import { ContactPage } from '../contact/contact';
import { MusicPage } from '../music/music';
import { TranslateService } from '@ngx-translate/core';
import { defaultLanguage } from '../../app/i18n.constants';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = NewsPage;
  tab3Root: any = VideosPage;
  tab4Root: any = LivePage;
  tab5Root: any = ContactPage;
  tab6Root: any = MusicPage;

  constructor( platform: Platform,
               translate: TranslateService,
               private nav: NavController ){
    platform.ready().then(() => {
      translate.setDefaultLang(defaultLanguage);
    });
  }
}
