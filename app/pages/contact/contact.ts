import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

declare var google;
@Component({
  templateUrl: 'build/pages/contact/contact.html'
})
export class ContactPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
    constructor(public navCtrl: NavController, public platform: Platform) {

    }
ionViewLoaded(){
    this.loadMap();
  }
  loadMap(){
    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer();
    let latLng = new google.maps.LatLng(30.79105749999999, 76.72869539999999);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 this.addMarker();
  }
  addMarker(){
 let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  let content = "<h4>Gurudwara Ratwara Sahib!</h4>";          
 
  this.addInfoWindow(marker, content);
 
}
addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}
}
