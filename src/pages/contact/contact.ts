import { Component } from '@angular/core';
import { NavController, Platform, IonicPage, MenuController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
 import { GoogleAnalytics } from '@ionic-native/google-analytics';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  map: GoogleMap;

  lat: number = 30.7933726;
  lng: number = 76.73437360000003;

  constructor(public navCtrl: NavController,
              public menu: MenuController, 
              public platform: Platform,
              private ga: GoogleAnalytics,
              private googleMaps: GoogleMaps) {
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        this.ga.trackView("Contact Page");
        console.log("Contact Page enter");
        if (this.platform.is('cordova')) {
          this.loadMap();
        }
    });
  }

  ionViewDidLeave() {
    if (this.platform.is('cordova')) {
       this.map.remove()
    }
  }
  
  ionViewWillLeave() {
    if (this.platform.is('cordova')) {
       this.map.remove()
    }
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
        controls: {
          compass: true,
          myLocationButton: true,
          indoorPicker: true,
          zoom: true
        },
        camera: {
          target: {
            lat: this.lat,
            lng: this.lng
          },
          tilt: 30,
          zoom: 14,
          bearing: 50
        }
    };
    
    this.map = this.googleMaps.create('map', mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');

      // Now you can use all methods safely.
      this.map.addMarker({
        title: 'Gurdwara Ratwara Sahib Mullanpur',
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: this.lat,
          lng: this.lng
        }
      }).then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
            marker.showInfoWindow();
          });
      });
    });        
  }

  closeMenu() {
    this.menu.close();
    this.navCtrl.push("TabsPage");
  }
}