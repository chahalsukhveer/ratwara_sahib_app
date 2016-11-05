import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import {TabsPage} from './pages/tabs/tabs';
import {HomePage} from './pages/home/home';
import {VideosPage} from './pages/videos/videos';
import {LivePage} from './pages/live/live';
import {ContactPage} from './pages/contact/contact';
import {MusicPage} from './pages/music/music';
import {AudioListPage} from './pages/audio-list/audio-list';
import {AgmCoreModule} from 'angular2-google-maps/core';
// import {AudioProvider, WebAudioProvider} from 'ionic-audio/dist/ionic-audio';

@NgModule({
  declarations: [
    MyApp,
    VideosPage,
    ContactPage,
    HomePage,
    LivePage,
    MusicPage,
    AudioListPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBzH2CivhtNDuhHBQfQCNihnQVqlfaeW9o'})
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
    TabsPage
  ],
  providers: []
})
export class AppModule {}

