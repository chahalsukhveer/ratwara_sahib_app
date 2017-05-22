
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Push, PushToken } from '@ionic/cloud-angular';
import { GoogleAnalytics } from 'ionic-native';
import { TranslateService } from '@ngx-translate/core';
import { defaultLanguage } from './i18n.constants';
import { Storage } from '@ionic/storage';
import { Auth0Cordova } from '@auth0/cordova';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = "TabsPage";
  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, 
              public menu: MenuController, 
              public push: Push,
              public translate: TranslateService,
              private storage: Storage ){

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      GoogleAnalytics.startTrackerWithId('UA-2832203-9', 5 ).then(() => {
         console.log('Google analytics is ready now');
         // GoogleAnalytics.debugMode();
         GoogleAnalytics.setAllowIDFACollection(false);
         // Tracker is ready
         // You can now track pages or set additional information such as AppVersion or UserId
      }).catch(e => console.log('Error starting GoogleAnalytics', e));
      StatusBar.styleDefault();
      translate.setDefaultLang(defaultLanguage);
      // This function is part of "Set Up Auth0-Cordova"
      (<any>window).handleOpenURL = (url) => {
        Auth0Cordova.onRedirectUri(url);
      };
    });

    storage.ready().then(() => {
        var locale_item = storage.get('locale');
        if (locale_item) {
            locale_item.then((val) => {
                if (val != null) {
                    console.log('retrieved from cache');
                    console.log(val);
                    this.translate.use(val);
                } 
            });
        } 
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
      { title: 'ADMIN', component: "AdminPage" },
      { title: 'ABOUT', component: "AboutPage" },
    ];
  }

  changeLanguage(key) {
		this.translate.use(key);
    this.storage.set('locale', key);
	}

  openPage(page) {
    this.menu.close();
    this.nav.push(page);
  }
  closeMenu() {
    this.menu.close();
    this.nav.push("TabsPage");
  }
}
