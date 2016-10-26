import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {VideosPage} from '../videos/videos';
import {LivePage} from '../live/live';
import {ContactPage} from '../contact/contact';
import {AudioPage} from '../audio/audio';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;
  private tab5Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
        this.tab1Root = HomePage;

    this.tab2Root = VideosPage;
    this.tab3Root = LivePage;
    this.tab4Root = ContactPage;
    this.tab5Root = AudioPage;
  }

}
