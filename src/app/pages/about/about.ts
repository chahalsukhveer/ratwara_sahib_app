import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { TranslateService } from 'ng2-translate';
import { Platform } from 'ionic-angular';
import { defaultLanguage } from '../../i18n.constants';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, 
              public menu: MenuController,
              platform: Platform,
              translate: TranslateService ) {
    platform.ready().then(() => {
        translate.setDefaultLang(defaultLanguage);
    });
  }

  ionViewDidLoad() {
    console.log('Hello About Page');
  }
  closeMenu() {
    this.menu.close();
    console.log("Close page event admin page")
    this.navCtrl.setRoot(TabsPage);
  }
}
