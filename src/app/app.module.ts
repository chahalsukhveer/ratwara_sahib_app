import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from './pages/tabs/tabs';
import { HomePage } from './pages/home/home';
import { VideosPage } from './pages/videos/videos';
import { LivePage } from './pages/live/live';
import { ContactPage } from './pages/contact/contact';
import { MusicPage } from './pages/music/music';
import { AudioListPage } from './pages/audio-list/audio-list';
import { AboutPage } from './pages/about/about';
import { AdminPage } from './pages/admin/admin';
import { NewsPage } from './pages/news/news';
import { NewsItemPage } from './pages/news-item/news-item';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { Ng2PaginationModule } from 'ng2-pagination';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { AuthService } from './providers/auth/auth.service';
import { Http } from '@angular/http';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { OrderBy } from "./orderby";
import { IonicStorageModule } from '@ionic/storage';

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
    IonicModule.forRoot(MyApp),
    IonicAudioModule.forRoot({ provide: AudioProvider, useFactory: audioProviderFactory }), 
    CloudModule.forRoot(cloudSettings),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBzH2CivhtNDuhHBQfQCNihnQVqlfaeW9o' }),
    IonicAudioModule,
    Ng2PaginationModule,
    IonicStorageModule.forRoot()
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
      AuthService
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
