import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideosPage } from './videos';

@NgModule({
  declarations: [
    VideosPage,
  ],
  imports: [
    IonicPageModule.forChild(VideosPage)
  ],
  exports: [
    VideosPage
  ]
})
export class VideosModule {}