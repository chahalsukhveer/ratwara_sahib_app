import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {VideosPage} from '../videos/videos';
import {LivePage} from '../live/live';
import {ContactPage} from '../contact/contact';
import {MusicPage} from '../music/music';

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = VideosPage;
  tab3Root: any = LivePage;
  tab4Root: any = ContactPage;
  tab5Root: any = MusicPage;

  constructor() {
  }

}
