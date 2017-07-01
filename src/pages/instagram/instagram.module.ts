import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstagramPage } from './instagram';
import { TranslateModule } from '@ngx-translate/core';
import { HttpModule, JsonpModule } from '@angular/http';

@NgModule({
  declarations: [
    InstagramPage,
  ],
  imports: [
    IonicPageModule.forChild(InstagramPage),
    TranslateModule.forChild(),
    HttpModule,
    JsonpModule
  ],
  exports: [
    InstagramPage
  ]
})
export class InstagramModule {}