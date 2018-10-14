import { Component } from '@angular/core';
import { NavController, MenuController, IonicPage } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  versionNumber: string;

  constructor(public navCtrl: NavController, 
              public menu: MenuController,
              private platform: Platform,
              private iab: InAppBrowser,
              private app: AppVersion ) {
    platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.app.getVersionNumber().then(version => {
          this.versionNumber = version;
        });
      }
    });
  }

  getVersionNumber() {  
    return this.versionNumber;
  }  

  ionViewDidLoad() {
  }

  closeMenu() {
    this.menu.close();
    this.navCtrl.push("TabsPage");
  }
  openPolicyLink(): void {
    var url = 'https://ratwarasahibblog.wordpress.com/2018/10/02/privacy-policy/';
    this.platform.ready().then(() => {
        let browser = this.iab.create(url, "_system", "location=true");
    });
  }
}
