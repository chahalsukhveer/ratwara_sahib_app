import { IonicPage, Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { GoogleAnalytics } from 'ionic-native';

@IonicPage()
@Component({
    selector: 'page-instagram',
    templateUrl: 'instagram.html'
})

export class InstagramPage {

    constructor(public platform: Platform ) {
        platform.ready().then(() => {
        });
    }

    ionViewDidEnter() {
       this.platform.ready().then(() => {
         // Okay, so the platform is ready and our plugins are available.
         GoogleAnalytics.trackView("Instagram Page");
         console.log("Instagram Page enter");
       });
    }
}