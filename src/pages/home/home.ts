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
          console.log("Home Page enter");
    });
  }

  images = [
    { img: "assets/images/pic1.jpeg", 
      text: "HOME_TEXT_1" },
    { img: "assets/images/pic2.jpeg", 
      text: "HOME_TEXT_2"},
    { img: "assets/images/pic3.jpeg", 
      text: "HOME_TEXT_3" },
    { img: "assets/images/pic4.jpeg", 
      text: "HOME_TEXT_4" },
    { img: "assets/images/pic5.jpeg", 
      text: "HOME_TEXT_5" },
    { img: "assets/images/pic6.jpeg", 
      text: "HOME_TEXT_3" }
  ];
}
