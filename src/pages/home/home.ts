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

@IonicPage( { priority: 'high'} )
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
     { img: "assets/images/pic20.jpeg", 
      text: "HOME_TEXT_1",
      text_en: "VGRMC Trust was founded by Sant Waryam Singh Ji inspired by his mentor Sant Isher Singh Ji of Rara Sahib."
    },
    { img: "assets/images/pic21.jpeg", 
      text: "HOME_TEXT_2",
      text_en: "The Samparada is linked with Bhai Sahib Bhai Daya Singh Ji, Leading Piara of the Five, selected by Guru Gobind Singh Ji."
    },
    { img: "assets/images/pic22.jpeg", 
      text: "HOME_TEXT_3",
      text_en: "Sant Maharaj Ji founded Gurmat Parchar Centre, Gurudwara Isher Parkash at Ratwara Sahib in 1986 for spreading Gurmat (Sikh Teachings) in India and abroad"
    },
    { img: "assets/images/pic23.jpeg", 
      text: "HOME_TEXT_1",
      text_en: "VGRMC Trust was founded by Sant Waryam Singh Ji inspired by his mentor Sant Isher Singh Ji of Rara Sahib."
    },
    { img: "assets/images/pic24.jpeg", 
      text: "HOME_TEXT_2",
      text_en: "The Samparada is linked with Bhai Sahib Bhai Daya Singh Ji, Leading Piara of the Five, selected by Guru Gobind Singh Ji."
    },
    { img: "assets/images/pic25.jpeg", 
      text: "HOME_TEXT_3",
      text_en: "Sant Maharaj Ji founded Gurmat Parchar Centre, Gurudwara Isher Parkash at Ratwara Sahib in 1986 for spreading Gurmat (Sikh Teachings) in India and abroad"
    },
    { img: "assets/images/pic27.jpeg", 
      text: "HOME_TEXT_4",
      text_en: "Started publishing monthly magazine ATAM MARG in 1995"
    },
    { img: "assets/images/pic10.jpeg", 
      text: "HOME_TEXT_5",
      text_en: "published books and produced videos"
    },
    { img: "assets/images/pic11.jpeg", 
      text: "HOME_TEXT_3",
      text_en: "Sant Maharaj Ji founded Gurmat Parchar Centre, Gurudwara Isher Parkash at Ratwara Sahib in 1986 for spreading Gurmat (Sikh Teachings) in India and abroad"
    }
  ];
}
