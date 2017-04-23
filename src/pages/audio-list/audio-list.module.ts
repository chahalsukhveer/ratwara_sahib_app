import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AudioListPage } from './audio-list';

@NgModule({
  declarations: [
    AudioListPage,
  ],
  imports: [
    IonicPageModule.forChild(AudioListPage)
  ],
  exports: [
    AudioListPage
  ]
})
export class AudioListModule {}