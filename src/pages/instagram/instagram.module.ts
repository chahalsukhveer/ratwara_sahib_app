import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstagramPage } from './instagram';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InstagramPage,
  ],
  imports: [
    IonicPageModule.forChild(InstagramPage),
    TranslateModule.forChild()
  ],
  exports: [
    InstagramPage
  ]
})
export class InstagramModule {}