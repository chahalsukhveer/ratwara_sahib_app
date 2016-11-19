import { Component} from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';



/*
  Generated class for the AdminPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {

  constructor(public navCtrl: NavController,public menu: MenuController) {}

  ionViewDidLoad() {
    console.log('Hello AdminPage Page');
  }
closeMenu(){
        this.menu.close();
    console.log("Close page event admin page")
    this.navCtrl.setRoot(TabsPage);
  }
}
