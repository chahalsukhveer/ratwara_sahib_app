
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { defaultLanguage } from './i18n.constants';
import { Storage } from '@ionic/storage';
import * as Auth0Cordova from '@auth0/cordova';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = "TabsPage";
  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, 
              public menu: MenuController, 
              public translate: TranslateService,
              private storage: Storage,
              private ga: GoogleAnalytics,
              private statusBar: StatusBar){

    platform.ready().then(() => {

      if (platform.is('cordova')) {
        // OneSignal Code start:
        // Enable to debug issues:
        // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

        var notificationOpenedCallback = function(jsonData) {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        window["plugins"].OneSignal
          .startInit("300a91d7-fd7d-4325-b98c-d63e1aadb6c6", "169616509593")
          .handleNotificationOpened(notificationOpenedCallback)
          .endInit();
      }
      console.log('Google analytics is starting now');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.ga.startTrackerWithId('UA-2832203-9', 5 ).then(() => {
         console.log('Google analytics is ready now');
         // GoogleAnalytics.debugMode();
         this.ga.setAllowIDFACollection(false);
         // Tracker is ready
         // You can now track pages or set additional information such as AppVersion or UserId
      }).catch(e => console.log('Error starting GoogleAnalytics', e));

      statusBar.styleDefault();
      translate.setDefaultLang(defaultLanguage);

      // This function is part of "Set Up Auth0-Cordova"
      (<any>window).handleOpenURL = (url) => {
        (<any>window).setTimeout(function () {
          Auth0Cordova.onRedirectUri(url);
        }, 100);
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

    this.pages = [
      { title: 'ADMIN', component: "AdminPage" },
      { title: 'CONTACT', component: "ContactPage" },
      { title: 'ABOUT', component: "AboutPage" }
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
