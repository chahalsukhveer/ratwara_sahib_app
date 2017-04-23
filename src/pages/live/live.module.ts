import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LivePage } from './live';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LivePage,
  ],
  imports: [
    IonicPageModule.forChild(LivePage),
    TranslateModule.forChild()
  ],
  exports: [
    LivePage
  ]
})
export class LiveModule {}