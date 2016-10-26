import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LivePage} from '../live/live';

@Component({
    directives : [LivePage],

  templateUrl: 'build/pages/contact/contact.html'
})
export class ContactPage {
  constructor(private navCtrl: NavController) {
  }
}
