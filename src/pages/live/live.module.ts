import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LivePage } from './live';

@NgModule({
  declarations: [
    LivePage,
  ],
  imports: [
    IonicPageModule.forChild(LivePage)
  ],
  exports: [
    LivePage
  ]
})
export class LiveModule {}