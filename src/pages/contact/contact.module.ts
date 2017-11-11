import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    ContactPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactPage),
    TranslateModule.forChild()
  ],
  exports: [
    ContactPage
  ],
  providers: [
    GoogleMaps
  ]
})
export class ContactModule {}