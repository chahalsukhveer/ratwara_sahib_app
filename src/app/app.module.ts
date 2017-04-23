import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { VideosPage } from '../pages/videos/videos';
import { LivePage } from '../pages/live/live';
import { ContactPage } from '../pages/contact/contact';
import { MusicPage } from '../pages/music/music';
import { AudioListPage } from '../pages/audio-list/audio-list';
import { AboutPage } from '../pages/about/about';
import { AdminPage } from '../pages/admin/admin';
import { NewsPage } from '../pages/news/news';
import { NewsItemPage } from '../pages/news-item/news-item';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { AuthService } from './providers/auth/auth.service';
import { Http, HttpModule } from '@angular/http';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { OrderBy } from "./orderby";
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { WindowRef } from './providers/window-ref';
import { YoutubeService } from './providers/youtube-service/youtube-service';
import { YoutubeServiceLive } from './providers/youtube-service-live/youtube-service-live';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'ad8d2b4e',
  },
  'push': {
    'sender_id': '169616509593',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

import { IonicAudioModule, AudioProvider, audioProviderFactory } from './ionic-audio';

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig(), http);
}

export function customTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    VideosPage,
    ContactPage,
    HomePage,
    LivePage,
    MusicPage,
    AudioListPage,
    AdminPage,
    AboutPage,
    NewsPage,
    NewsItemPage,
    TabsPage,
    OrderBy
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicAudioModule.forRoot({ provide: AudioProvider, useFactory: audioProviderFactory }), 
    CloudModule.forRoot(cloudSettings),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBzH2CivhtNDuhHBQfQCNihnQVqlfaeW9o' }),
    NgxPaginationModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: customTranslateLoader,
          deps: [Http]
        }
      }
    ),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VideosPage,
    ContactPage,
    HomePage,
    LivePage,
    MusicPage,
    AudioListPage,
    AdminPage,
    AboutPage,
    NewsPage,
    NewsItemPage,
    TabsPage
  ],
  providers: [
      { provide: AuthHttp, 
        useFactory: getAuthHttp,
        deps: [Http]
      },
      AuthService,
      WindowRef,
      YoutubeService,
      YoutubeServiceLive
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
