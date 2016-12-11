import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(private navCtrl: NavController) {
  }

  images = [
    { img: "assets/images/samagam04.jpg", 
      text: "VGRMC Trust was founded by Sant Waryam Singh Ji inspired by his mentor Sant Isher Singh Ji of Rara Sahib." },
    { img: "assets/images/samagam.jpg", 
      text: "The Samparada is	linked with Bhai Sahib Bhai Daya Singh Ji, leading Piara (Beloved) of the Five, selected by Guru Gobind Singh Ji."},
    { img: "assets/images/samagam02.jpg", 
      text: "Sant Maharaj Ji founded Gurmat Parchar Centre, Gurudwara Isher Parkash at Ratwara Sahib in 1986 for spreading Gurmat (Sikh Teachings) in India and abroad" },
    { img: "assets/images/samagam03.jpg", 
      text: "Started publishing monthly magazine 'ATAM MARG' in 1995" },
    { img: "assets/images/samagam01.jpg", 
      text: "published books and brought out audio-videos" }
  ];

  mySlideOptions = {
    pagination: true,
    pager: true,
    autoplay: 5000,
    loop: true
  };
}
