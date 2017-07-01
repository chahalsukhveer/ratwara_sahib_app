import { Component } from '@angular/core';
import { NavController, MenuController, IonicPage } from 'ionic-angular';
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
  }

  closeMenu() {
    this.menu.close();
    this.navCtrl.push("TabsPage");
  }
}
