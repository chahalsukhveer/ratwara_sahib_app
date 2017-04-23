import { Component } from '@angular/core';
import { NavController, MenuController, IonicPage } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, 
              public menu: MenuController,
              platform: Platform ) {
    platform.ready().then(() => {
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
