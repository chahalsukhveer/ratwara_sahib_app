
import {Component,ViewChild } from '@angular/core';
import {Platform,Nav,MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {HomePage} from './pages/home/home';
import {AdminPage} from './pages/admin/admin';
import {AboutPage} from './pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
   @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform,public menu: MenuController) {
    this.rootPage = TabsPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      StatusBar.styleDefault();
    });
     this.pages = [
      { title: 'Admin Page', component: AdminPage },
      { title: 'About', component: AboutPage },
    ];
  }
  openPage(page) {
    this.menu.close();
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  closeMenu(){
    this.menu.close();
    console.log("Close page event")
    this.nav.setRoot(TabsPage);
  }
}
