import { NavController, IonicPage, Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { GoogleAnalytics } from 'ionic-native';

@IonicPage()
@Component({
    selector: 'page-news',
    templateUrl: 'news.html'
})

export class NewsPage {
    url: string = 'https://public-api.wordpress.com/rest/v1.1/sites/ratwarasahibblog.wordpress.com/posts/?number=10&pretty=true';
    items: any;

    constructor(public navCtrl: NavController,
                private http: Http,
                private storage: Storage, 
                public platform: Platform ) {

        platform.ready().then(() => {
        });

        this.storage.ready().then(() => {
            var news_items = this.storage.get('newsList');
            if (news_items) {
                news_items.then((val) => {
                    if (val != null) {
                        console.log('retrieved from cache');
                        console.log(val);
                        this.items = val;
                        this.refreshData();
                    } else {
                        this.refreshData();
                    }
                });
            } else {
                this.refreshData();
            }
        });
    }

    ionViewDidEnter() {
       this.platform.ready().then(() => {
         // Okay, so the platform is ready and our plugins are available.
         GoogleAnalytics.trackView("News Page");
       });
    }

    refreshData(){
      this.http.get(this.url)
        .map(res => res.json())
        .subscribe(data => {
            this.items = data.posts;
            console.log('set new cache');
            this.storage.set('newsList', this.items);
        });
    }

    itemTapped(event, item) {
        this.navCtrl.push("NewsItemPage", {
            item: item
        });
    }
}