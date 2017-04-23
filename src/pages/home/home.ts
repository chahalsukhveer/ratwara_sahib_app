import { Component } from '@angular/core';
import { NavController, Platform, IonicPage } from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';

export class ImageKey {
  img: string;
  text: string;
  constructor(_img: string, _text: string) {
     this.img = _img;
     this.text = _text;
  }
}

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(private navCtrl: NavController, 
              public platform: Platform) {
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
