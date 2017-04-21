import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';
import { TranslateService } from 'ng2-translate';
import { defaultLanguage } from '../../i18n.constants';
import { Storage } from '@ionic/storage';

export class ImageKey {
  img: string;
  text: string;
  constructor(_img: string, _text: string) {
     // assign local variables to class members
     this.img = _img;
     this.text = _text;
  }
}

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
                    this.addImages();
                } else {
                   this.addImages();
                } 
            });
        } else {
           this.addImages();
        }
    });
  }

  changeLanguage(key) {
		this.translate.use(key);
    this.storage.set('locale', key);
    // this.addImages();
	}

  ionViewDidEnter() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          GoogleAnalytics.trackView("Home Page");
    });
  }

  addImages() {
    //  this.images = [];
    //  var entry1 = new ImageKey( "assets/images/samagam04.jpg", this.translate.instant("HOME_TEXT_1") );
    //  var entry2 = new ImageKey( "assets/images/samagam.jpg", this.translate.instant("HOME_TEXT_2") );
    //  var entry3 = new ImageKey( "assets/images/samagam02.jpg", this.translate.instant("HOME_TEXT_3") );
    //  var entry4 = new ImageKey( "assets/images/samagam03.jpg", this.translate.instant("HOME_TEXT_4") );
    //  var entry5 = new ImageKey( "assets/images/samagam01.jpg", this.translate.instant("HOME_TEXT_5") );
    //  this.images.push(entry1);
    //  this.images.push(entry2);
    //  this.images.push(entry3);
    //  this.images.push(entry4);
    //  this.images.push(entry5);
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
