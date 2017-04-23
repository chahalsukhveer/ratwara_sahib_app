
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { AdminPage } from '../pages/admin/admin';
import { AboutPage } from '../pages/about/about';
import { Push, PushToken } from '@ionic/cloud-angular';
import { GoogleAnalytics } from 'ionic-native';
import { TranslateService } from '@ngx-translate/core';
import { defaultLanguage } from './i18n.constants';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = TabsPage;
  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, 
              public menu: MenuController, 
              public push: Push,
              translate: TranslateService ){

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      GoogleAnalytics.startTrackerWithId('UA-2832203-9').then(() => {
         console.log('Google analytics is ready now');
         // Tracker is ready
         // You can now track pages or set additional information such as AppVersion or UserId
      }).catch(e => console.log('Error starting GoogleAnalytics', e));
      StatusBar.styleDefault();
      translate.setDefaultLang(defaultLanguage);
    });

    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });

    this.push.rx.notification()
      .subscribe((msg) => {
        alert(msg.title + ': ' + msg.text);
      });

    this.pages = [
      { title: 'ADMIN', component: AdminPage },
      { title: 'ABOUT', component: AboutPage },
    ];
  }

  openPage(page) {
    this.menu.close();
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  closeMenu() {
    this.menu.close();
    this.nav.setRoot(TabsPage);
  }
}
