import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';
import { TranslateService } from 'ng2-translate';
import { defaultLanguage } from '../../i18n.constants';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(private navCtrl: NavController, 
              public platform: Platform,
              private translate: TranslateService,
              private storage: Storage ) {
    platform.ready().then(() => {
        translate.setDefaultLang(defaultLanguage);
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
  }

  changeLanguage(key) {
		this.translate.use(key);
    this.storage.set('locale', key);
	}

  ionViewDidEnter() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          GoogleAnalytics.trackView("Home Page");
    });
  }

  images = [
    { img: "assets/images/samagam04.jpg", 
      text: "HOME_TEXT_1" },
    { img: "assets/images/samagam.jpg", 
      text: "HOME_TEXT_2"},
    { img: "assets/images/samagam02.jpg", 
      text: "HOME_TEXT_3" },
    { img: "assets/images/samagam03.jpg", 
      text: "HOME_TEXT_4" },
    { img: "assets/images/samagam01.jpg", 
      text: "HOME_TEXT_5" }
  ];
}
