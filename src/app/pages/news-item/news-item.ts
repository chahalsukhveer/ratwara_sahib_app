import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'page-news-item',
    templateUrl: 'news-item.html'
})

export class NewsItemPage {

    selectedItem: any;

    constructor(private nav: NavController, navParams: NavParams) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
    }

}