import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideosPage } from './videos';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    VideosPage,
  ],
  imports: [
    IonicPageModule.forChild(VideosPage),
    TranslateModule.forChild()
  ],
  exports: [
    VideosPage
  ]
})
export class VideosModule {}