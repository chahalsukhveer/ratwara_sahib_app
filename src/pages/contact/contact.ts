import { Component } from '@angular/core';
import { NavController, Platform, IonicPage, MenuController } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarkerOptions, GoogleMapsMarker, GoogleAnalytics } from 'ionic-native';

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
              public platform: Platform) {
    platform.ready().then(() => {
    });
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        if (this.platform.is('cordova')) {
          this.loadMap();
        }
        GoogleAnalytics.trackView("Contact Page");
        console.log("Contact Page enter");
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
    let location = new GoogleMapsLatLng(this.lat, this.lng);

    this.map = new GoogleMap('map', {
      backgroundColor: 'white',
      fullscreenControl: true,
      zoomControl: true,
      controls: {
        compass: true,
        myLocationButton: true,
        indoorPicker: true,
        zoom: true
      },
      camera: {
        latLng: location,
        tilt: 30,
        zoom: 14,
        bearing: 50
      }
    });

    let markerOptions: GoogleMapsMarkerOptions = {
      title: 'Gurdwara Ratwara Sahib Mullanpur',
      position: location
    };

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
      this.map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
       });
    });
  }

  closeMenu() {
    this.menu.close();
    this.navCtrl.push("TabsPage");
  }

}