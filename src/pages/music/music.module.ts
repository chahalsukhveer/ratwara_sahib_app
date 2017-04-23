import { IonicPageModule } from 'ionic-angular';
import { MusicPage } from './music';
import { TranslateModule } from '@ngx-translate/core';
import { OrderBy } from "../../app/orderby";
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    MusicPage,
    OrderBy
  ],
  imports: [
    IonicPageModule.forChild(MusicPage),
    TranslateModule.forChild()
  ],
  exports: [
    MusicPage
  ]
})
export class MusicModule {}