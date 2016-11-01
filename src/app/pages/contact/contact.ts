import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

declare var google;
@Component({
  templateUrl: 'contact.html'
})
export class ContactPage {

  lat: number = 30.791057;
  lng: number = 76.728695;
  private _isAndroid: boolean;
  private _isiOS: boolean;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
    constructor(public navCtrl: NavController, public platform: Platform) {
    this._isAndroid = platform.is('android');
    this._isiOS = platform.is('ios');
    }

  loadMap(){
    console.log("I am called");

  var coords = this.lat + "," + this.lng;
   var place = "Gurdwara Ratwara Sahib Mullanpur"
    if(this._isiOS) {
      window.open("http://maps.apple.com/?q=" + coords, '_system');
      return;
    }

    if(this._isAndroid) {
      window.open("http://maps.google.com/?q=" +place, '_system')
      return;
    }

    window.open("http://maps.google.com/?q=" +place, '_system');
    return;
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