import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import {TabsPage} from './pages/tabs/tabs';
import {HomePage} from './pages/home/home';
import {VideosPage} from './pages/videos/videos';
import {LivePage} from './pages/live/live';
import {ContactPage} from './pages/contact/contact';
import {MusicPage} from './pages/music/music';

// import {AudioProvider, WebAudioProvider} from 'ionic-audio/dist/ionic-audio';
// https://angular.io/docs/ts/latest/api/core/Type-interface.html
// import {Type, provide} from '@angular/core';

@NgModule({
  declarations: [
    MyApp,
    VideosPage,
    ContactPage,
    HomePage,
    LivePage,
    MusicPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VideosPage,
    ContactPage,
    HomePage,
    LivePage,
    MusicPage,
    TabsPage
  ],
  providers: []
})
export class AppModule {}

// ionicBootstrap(MyApp, [provide(AudioProvider,  { useFactory: AudioProvider.factory })]);
