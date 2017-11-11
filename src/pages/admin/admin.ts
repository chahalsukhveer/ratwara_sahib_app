import { Component } from '@angular/core';
import { NavController, MenuController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../app/providers/auth/auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GlobalVariable } from '../../app/globals';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})

export class AdminPage {
  url: string = 'https://onesignal.com/api/v1/notifications?app_id=300a91d7-fd7d-4325-b98c-d63e1aadb6c6&limit=5';
  urlPush: string = 'https://onesignal.com/api/v1/notifications';
  notifications: any = [];
  title: string = '';
  message: string = '';
  constructor(public navCtrl: NavController, 
              public menu: MenuController, 
              public auth: AuthService, 
              public http: Http,
              platform: Platform ) {
    platform.ready().then(() => {
      this.listNotifications();
    });
  }

  closeMenu() {
    this.menu.close();
    console.log("Close page event admin page");
    this.navCtrl.push("TabsPage");
  }

  ionViewWillEnter() {
    this.listNotifications();
  }

  listNotifications() {
    console.log("Notifications here");
    var token = GlobalVariable.ONE_SIGNAL;
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', `Basic ${token}`);
    let options = new RequestOptions({ headers: headers });
    this.http.get(this.url, options).map(res => res.json()).subscribe(data => {
      console.log("Notifications::  ", data);
      this.notifications = data;
    });
  }

  sendNotifications() {
    console.log(this.title);
    console.log(this.message);
    var token = GlobalVariable.ONE_SIGNAL;
    let notify = JSON.stringify(
    { 
      "app_id": "300a91d7-fd7d-4325-b98c-d63e1aadb6c6",
      "headings": {"en": this.title},
      "contents": {"en": this.message},
      "included_segments": ["All"]
    });
    
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append("Content-Type", 'application/json');
    headers.append('Authorization', `Basic ${token}`);
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.urlPush, notify, options).subscribe(
      data => {
        console.log('After push ', data);
        this.title='';
        this.message='';
      },
      err => (err.json().message),
      () => {
        console.log('Notification Send')
        this.listNotifications();
      }
    );
  }
}
