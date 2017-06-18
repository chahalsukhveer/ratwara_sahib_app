import { IonicPage, Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Jsonp } from '@angular/http';
import { InAppBrowser, GoogleAnalytics } from 'ionic-native';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@IonicPage()
@Component({
    selector: 'page-instagram',
    templateUrl: 'instagram.html'
})
export class InstagramPage {
    url: string = 'https://igapi.ga/ratwarasahib/media/?callback=JSONP_CALLBACK';
    photos: any;

    constructor(public platform: Platform, 
                private http: Http,
                private jsonp: Jsonp) {
        platform.ready().then(() => {
        });
        this.refreshData();
    }

    ionViewDidEnter() {
       this.platform.ready().then(() => {
         // Okay, so the platform is ready and our plugins are available.
         GoogleAnalytics.trackView("Instagram Page");
         console.log("Instagram Page enter");
       });
    }

    refreshData(){
        this.getServer()
            .subscribe(
                res => { 
                    this.photos = res.items;
                    console.log(res); 
                },
                err => {
                    console.log(err);  // debug
                }
            );    
    }

    getServer() {
       return this.jsonp.get(this.url)
        .map(res => res.json() )
        .catch(error => Observable.throw(error)
       );
    }

  openpic(url): void {
    console.log(url);
    this.platform.ready().then(() => {
        let browser = new InAppBrowser(url, "_system", "location=true");
        browser.show();
    });
  }

}