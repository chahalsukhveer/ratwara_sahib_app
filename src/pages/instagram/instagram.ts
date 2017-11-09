import { IonicPage, Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Jsonp } from '@angular/http';
import { InAppBrowser, GoogleAnalytics } from 'ionic-native';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { HTTP } from '@ionic-native/http';

@IonicPage()
@Component({
    selector: 'page-instagram',
    templateUrl: 'instagram.html'
})
export class InstagramPage {
    // url: string = 'https://igpi.ga/ratwarasahib/media/?callback=JSONP_CALLBACK';
    url2: string = 'https://igpi.ga/ratwarasahib/?__a=1';
    
    photos: any = [];

    constructor(public platform: Platform, 
                private http: Http,
                private httpPlugin: HTTP,
                private jsonp: Jsonp) {
        platform.ready().then(() => {
            this.refreshData2();
        });
    }

    ionViewDidEnter() {
       this.platform.ready().then(() => {
         // Okay, so the platform is ready and our plugins are available.
         GoogleAnalytics.trackView("Instagram Page");
         console.log("Instagram Page enter");
       });
    }

    refreshData2(){
        this.httpPlugin.get(this.url2, {}, { "Referer": "https://github.com/whizzzkid/instagram-reverse-proxy/issues/15"})
        .then(data => {
          console.log(data.status);
          var jsonData = JSON.parse(data.data);
          this.photos = jsonData.user.media.nodes
        })
        .catch(error => {
      
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
      
        });
    }

    openpic(code): void {
        console.log(code);
        this.platform.ready().then(() => {
            let browser = new InAppBrowser("https://www.instagram.com/p/" + code, "_system", "location=true");
        });
    }

}