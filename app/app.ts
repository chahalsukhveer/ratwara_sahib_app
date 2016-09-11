import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {HomePage} from './pages/home/home';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    this.rootPage = TabsPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     
      
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
// import {Component} from '@angular/core';
// import {Platform, ionicBootstrap} from 'ionic-angular';
// import {StatusBar} from 'ionic-native';
// import {TabsPage} from './pages/tabs/tabs';


// @Component({
//   template: '<ion-nav [root]="rootPage"></ion-nav>'
// })
// export class MyApp {

//   private rootPage: any;

//   constructor(private platform: Platform) {
//     this.rootPage = TabsPage;

//     platform.ready().then(() => {
//       // Okay, so the platform is ready and our plugins are available.
//       // Here you can do any higher level native things you might need.
//       StatusBar.styleDefault();
//     });
//   }
// }

// ionicBootstrap(MyApp);