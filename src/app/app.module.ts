import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import {TabsPage} from './pages/tabs/tabs';
import {HomePage} from './pages/home/home';
import {VideosPage} from './pages/videos/videos';
import {LivePage} from './pages/live/live';
import {ContactPage} from './pages/contact/contact';
import {MusicPage} from './pages/music/music';
import {AudioListPage} from './pages/audio-list/audio-list';
import {AboutPage} from './pages/about/about';
import {AdminPage} from './pages/admin/admin';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {Platform} from 'ionic-angular';
import {Ng2PaginationModule} from 'ng2-pagination';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { AuthService } from './providers/auth/auth.service';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

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


let storage: Storage = new Storage();

import { IonicAudioModule, AudioProvider, audioProviderfactory } from './ionic-audio/ionic-audio.module';
export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
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
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBzH2CivhtNDuhHBQfQCNihnQVqlfaeW9o'}),
    IonicAudioModule,
    Ng2PaginationModule
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
    TabsPage
  ],
  providers: [AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }, { provide: AudioProvider, useFactory: audioProviderfactory, deps: [Platform] }],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}

