import { Component } from '@angular/core';
import { NavController, Platform, IonicPage  } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVariable } from '../../app/globals';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { InAppBrowser } from '@ionic-native/in-app-browser';


declare var AndroidNativePdfViewer: any;

@IonicPage()
@Component({
  templateUrl: 'magazine.html'
})
export class MagazinePage {

  pageToken: string;
  eventType: string = 'live';
  title: string
  issuesCloud: any;

  constructor(public http: Http, 
              public nav: NavController, 
              public platform: Platform,
              private iab: InAppBrowser,
              private ga: GoogleAnalytics ) {
    platform.ready().then(() => {
    });
  
    this.http.get('assets/data/magazines.json').map(res => res.json()).subscribe(data => {
      this.issuesCloud = data.magazines;
      console.log("my list ", this.issuesCloud);
    });

   
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          this.ga.trackView("Magazine Page");
          console.log("Magazine Page enter");
    });
  }

  openPDF(url): void {
    console.log(url);
    this.platform.ready().then(() => {
      if ( this.platform.is('android') ) { 
        var options = { 
                headerColor:"#000000",
                showScroll:true, 
                swipeHorizontal:false 
              };
        AndroidNativePdfViewer.openPdfUrl(url, 'magazine', options,
                function(success){
                  console.log(url)
                }, function(error){
                  console.log("It didn't work!")
                });
      } else {
        let browser = this.iab.create(url, "_system", "location=true");
      }
    });
  }

}