import { IonicPage, Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GlobalVariable } from '../../app/globals';

@IonicPage()
@Component({
    selector: 'page-instagram',
    templateUrl: 'instagram.html'
})
export class InstagramPage {
    url: string = 'https://api.instagram.com/v1/users/self/media/recent/?access_token='+GlobalVariable.INSTAGRAM;
    
    photos: any = [];

    constructor(public platform: Platform, 
                private http: Http,
                private iab: InAppBrowser,
                private ga: GoogleAnalytics) {
        platform.ready().then(() => {
            this.refreshData2();
        });
    }

    ionViewDidEnter() {
       this.platform.ready().then(() => {
         // Okay, so the platform is ready and our plugins are available.
         this.ga.trackView("Instagram Page");
         console.log("Instagram Page enter");
       });
    }

    refreshData2(){
            this.http.get(this.url)
              .map(res => res.json())
              .subscribe(data => {
                  this.photos = data.data;
              });
    }

    openpic(link): void {
        console.log(link);
        this.platform.ready().then(() => {
            let browser = this.iab.create(link, "_system", "location=true");
        });
    }

}