import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarkerOptions, GoogleMapsMarker } from 'ionic-native';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  map: GoogleMap;

  lat: number = 30.79519;
  lng: number = 76.7267223;

  constructor(public navCtrl: NavController, public platform: Platform) {
    platform.ready().then(() => {
      this.loadMap();
    });
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
}