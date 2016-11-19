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

import { IonicAudioModule, AudioProvider, audioProviderfactory } from './ionic-audio/ionic-audio.module';

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
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBzH2CivhtNDuhHBQfQCNihnQVqlfaeW9o'}),
    IonicAudioModule
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
  providers: [ { provide: AudioProvider, useFactory: audioProviderfactory, deps: [Platform] }],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}

