import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NewsItemPage } from '../news-item/news-item';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-news',
    templateUrl: 'news.html'
})

export class NewsPage {
    url: string = 'https://public-api.wordpress.com/rest/v1.1/sites/ratwarasahibblog.wordpress.com/posts/?number=10&pretty=true';
    items: any;

	constructor(public navCtrl: NavController, private http: Http, private nav: NavController ) {
	}

    ionViewDidEnter() {
        this.http.get(this.url)
            .map(res => res.json())
            .subscribe(data => {
                this.items = data.posts;
            });
    }

	itemTapped(event, item) {
		this.nav.push(NewsItemPage, {
		  item: item
		});
	}

}